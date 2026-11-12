import type { TestCaseDto } from "@/generated/types"
import { useCreateTask } from "@/src/entities/tasks/model/hooks/useCreateTask"
import { Language } from "@/src/entities/tasks/model/types/tasks"
import { TiptapEditor } from "@/src/shared/components/tiptap"
import { Button } from "@/src/shared/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/shared/components/ui/dialog"
import { Input } from "@/src/shared/components/ui/input"
import { Label } from "@/src/shared/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/shared/components/ui/select/select"
import { Text } from "@/src/shared/components/ui/text"
import { Textarea } from "@/src/shared/components/ui/textarea"
import { useState } from "react"
import { Controller, useForm, useWatch } from "react-hook-form"
import { parseTestCases } from "../model/lib/parseTestCases"
import { CreateTaskFormValues } from "../model/types/CreateTaskFormValues"

const LANGUAGES: Language[] = ["javascript", "golang", "python"]

const defaultValues: CreateTaskFormValues = {
  title: "",
  language: ["javascript", "golang"],
  initialCode: [
    { language: "javascript", template: "" },
    { language: "golang", template: "" },
  ],
  testCases: "",
  description: "",
}

const CreateTaskDialog = () => {
  const [open, setOpen] = useState(false)
  const [activeLang, setActiveLang] = useState<Language>("javascript")

  const {
    register,
    handleSubmit,
    reset,
    setError,
    control,
    setValue,
    formState: { errors },
  } = useForm<CreateTaskFormValues>({ defaultValues })

  const { mutate, isPending } = useCreateTask()

  const codes = useWatch({ control, name: "initialCode" }) || []
  const currentCode =
    codes.find((c) => c.language === activeLang)?.template || ""

  const onSubmit = handleSubmit((values) => {
    let parsedTestCases: TestCaseDto[]
    try {
      parsedTestCases = parseTestCases(values.testCases)
    } catch (error) {
      setError("testCases", {
        message: error instanceof Error ? error.message : "Ошибка парсинга",
      })
      return
    }

    mutate(
      {
        title: values.title,
        language: values.language,
        initialCode: values.initialCode,
        description: { html: values.description },
        testCases: parsedTestCases,
      },
      {
        onSuccess: () => {
          setOpen(false)
          reset()
          setActiveLang("javascript")
        },
      }
    )
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button />}>Создать задачу</DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Новая задача</DialogTitle>
        </DialogHeader>

        <form onSubmit={onSubmit} id="create-task-form" className="space-y-4">
          <div className="flex flex-col gap-2">
            <Label>Название задачи</Label>
            <Input
              {...register("title", { required: true })}
              placeholder="Например: Сумма двух чисел"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Описание</Label>
            <Controller
              control={control}
              name="description"
              rules={{ required: "Описание обязательно" }}
              render={({ field }) => (
                <TiptapEditor content={field.value} onChange={field.onChange} />
              )}
            />
            {errors.description && (
              <Text as="p" variant={"destructive"}>
                {errors.description.message}
              </Text>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label>Начальный код</Label>
            <Select
              value={activeLang}
              onValueChange={(val) => setActiveLang(val as Language)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Выберите язык" />
              </SelectTrigger>
              <SelectContent>
                {LANGUAGES.map((lang) => (
                  <SelectItem key={lang} value={lang}>
                    {lang}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Textarea
              value={currentCode}
              onChange={(e) => {
                const newCodes = [...codes]
                const index = newCodes.findIndex(
                  (c) => c.language === activeLang
                )

                if (index !== -1) {
                  newCodes[index] = {
                    ...newCodes[index],
                    template: e.target.value,
                  }
                } else {
                  newCodes.push({
                    language: activeLang,
                    template: e.target.value,
                  })
                }

                setValue("initialCode", newCodes, { shouldDirty: true })
              }}
              className="mt-2 font-mono"
              rows={6}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label>
              Тест-кейсы (каждый с новой строки, формат{" "}
              <code>вход =&gt; expected</code>)
            </Label>
            <Textarea
              {...register("testCases", { required: true })}
              rows={4}
              placeholder={"2 3 => 5\n10 20 => 30"}
            />
            {errors.testCases && (
              <Text as="span" variant={"destructive"}>
                {errors.testCases.message}
              </Text>
            )}
          </div>
        </form>

        <DialogFooter>
          <Button
            type="submit"
            form="create-task-form"
            disabled={isPending}
            className="w-full"
          >
            {isPending ? "Создание..." : "Создать"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export { CreateTaskDialog }
