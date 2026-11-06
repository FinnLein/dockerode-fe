import type { TaskResponseDto, TestCaseDto } from "@/generated/types"
import { useUpdateTask } from "@/src/entities/tasks/model/hooks/use-update-task"
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
import { Textarea } from "@/src/shared/components/ui/textarea"
import { useState } from "react"
import { parseTestCases } from "../model/lib/parseTestCases"

const EditTaskDialog = ({ task }: { task: TaskResponseDto }) => {
  const [open, setOpen] = useState(false)
  const [language, setLanguage] = useState(task.language)
  const [initialCode, setInitialCode] = useState(task.initialCode)
  const [testCases, setTestCases] = useState(task.testCases.join("\n"))

  const { mutate, isPending } = useUpdateTask()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    let parsedTestCases: TestCaseDto[]
    try {
      parsedTestCases = parseTestCases(testCases)
    } catch {
      return
    }

    mutate(
      {
        id: task.id,
        dto: {
          language,
          initialCode,
          testCases: parsedTestCases,
        },
      },
      {
        onSuccess: () => setOpen(false),
      }
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button />}>Редактировать</DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Редактировать задачу</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Язык</Label>
            <Input
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              required
            />
          </div>
          <div>
            <Label>Начальный код</Label>
            <Textarea
              value={initialCode}
              onChange={(e) => setInitialCode(e.target.value)}
              className="font-mono"
              rows={6}
              required
            />
          </div>
          <div>
            <Label>Тест-кейсы (каждый с новой строки)</Label>
            <Textarea
              value={testCases}
              onChange={(e) => setTestCases(e.target.value)}
              rows={4}
              required
            />
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
