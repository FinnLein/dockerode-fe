import type { TaskResponseDto, TestCaseDto } from "@/generated/types"
import { useUpdateTask } from "@/src/entities/tasks/model/hooks/useUpdateTask"
import { TiptapEditor } from "@/src/shared/components/tiptap"
import { Button } from "@/src/shared/components/ui/button"
import {
    Dialog,
    DialogContent,
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
import { Edit } from "lucide-react"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { parseTestCases } from "../../../views/AdminTaskPage/model/lib/parseTestCases"
import { EditTaskFormValues } from "../model/types/EditTaskFormValues"
import { Language } from "../model/types/tasks"

const EditTaskDialog = ({ task }: { task: TaskResponseDto }) => {
  const [open, setOpen] = useState(false)
  const [activeLang, setActiveLang] = useState<Language>(task.language[0])

  const descriptionHtml = (task.description as { html?: string })?.html ?? ""

  const defaultValues: EditTaskFormValues = {
    title: task.title,
    description: descriptionHtml,
    language: task.language,
    initialCode: task.initialCode,
    testCases: task.testCases
      .map((testCase) => `${testCase.input} => ${testCase.expected}`)
      .join("\n"),
  }

  const {
    register,
    handleSubmit,
    reset,
    setError,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<EditTaskFormValues>({ defaultValues })

  const { mutate, isPending } = useUpdateTask()

  const codes = watch("initialCode") || []
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
        id: task.id,
        dto: {
          title: values.title,
          description: { html: values.description },
          language: values.language,
          initialCode: values.initialCode,
          testCases: parsedTestCases,
        },
      },
      {
        onSuccess: () => setOpen(false),
      }
    )
  })

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen)
        if (!nextOpen) {
          reset()
        }
      }}
    >
      <DialogTrigger render={<Button variant="ghost" size="icon-lg" />}>
        <Edit />
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Редактировать задачу</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="flex flex-col gap-2">
            <Label>Название задачи</Label>
            <Input {...register("title", { required: true })} />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Описание</Label>
            <Controller
              control={control}
              name="description"
              rules={{ required: "Описание обязательно" }}
              render={({ field }) => (
                <TiptapEditor
                  key={task.id}
                  content={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            {errors.description && (
              <Text as="span" variant={"destructive"}>
                {errors.description.message}
              </Text>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label>Языки (через запятую)</Label>
            <Controller
              control={control}
              name="language"
              render={({ field }) => (
                <Input
                  value={field.value.join(", ")}
                  onChange={(e) =>
                    field.onChange(
                      e.target.value.split(",").map((s) => s.trim())
                    )
                  }
                />
              )}
            />
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
                {watch("language")?.map((lang) => (
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
            <Label>Тест-кейсы (каждый с новой строки)</Label>
            <Textarea {...register("testCases", { required: true })} rows={4} />
            {errors.testCases && (
              <p className="text-sm text-destructive">
                {errors.testCases.message}
              </p>
            )}
          </div>

          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? "Сохранение..." : "Сохранить"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export { EditTaskDialog }

