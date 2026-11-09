import type { CreateTaskDto } from "@/generated/types"
import { useCreateBulkTask } from "@/src/entities/tasks/model/hooks/useCreateBulkTask"
import { Button } from "@/src/shared/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/shared/components/ui/dialog"
import { Label } from "@/src/shared/components/ui/label"
import { Text } from "@/src/shared/components/ui/text"
import { Textarea } from "@/src/shared/components/ui/textarea"
import { useState } from "react"
import { useForm } from "react-hook-form"

interface CreateBulkTaskFormValues {
  json: string
}

const defaultValues: CreateBulkTaskFormValues = {
  json: '[\n  {\n    "title": "Задача 1",\n    "language": "typescript",\n    "initialCode": "",\n    "description": { "html": "<p>Описание</p>" },\n    "testCases": [{ "input": "1", "expected": "1" }]\n  }\n]',
}

const CreateBulkTaskDialog = () => {
  const [open, setOpen] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<CreateBulkTaskFormValues>({ defaultValues })

  const { mutate, isPending } = useCreateBulkTask()

  const onSubmit = handleSubmit((values) => {
    let parsedData: CreateTaskDto[]
    try {
      const raw = JSON.parse(values.json)
      if (!Array.isArray(raw)) {
        throw new Error("Ожидается массив JSON-объектов")
      }
      parsedData = raw as CreateTaskDto[]
    } catch (error) {
      setError("json", {
        message:
          error instanceof Error ? error.message : "Ошибка парсинга JSON",
      })
      return
    }

    mutate(parsedData, {
      onSuccess: () => {
        setOpen(false)
        reset()
      },
    })
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button variant="outline" />}>
        Создать массово
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Массовое создание задач</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="flex flex-col gap-2">
            <Label>JSON-массив задач</Label>
            <Textarea
              {...register("json", { required: "Вставьте JSON" })}
              className="min-h-75 font-mono"
              placeholder="Вставьте массив объектов..."
            />
            {errors.json && (
              <Text variant={"destructive"} as="span">
                {errors.json.message}
              </Text>
            )}
          </div>

          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? "Создание..." : "Создать пачку"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export { CreateBulkTaskDialog }
