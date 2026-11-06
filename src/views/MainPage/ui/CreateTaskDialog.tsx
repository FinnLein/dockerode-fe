import type { TestCaseDto } from "@/generated/types"
import { useCreateTask } from "@/src/entities/tasks/model/hooks/use-create-task"
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
import { parseTestCases } from '../model/lib/parseTestCases'



const CreateTaskDialog = () => {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [language, setLanguage] = useState("typescript")
  const [initialCode, setInitialCode] = useState("")
  const [testCases, setTestCases] = useState("")
  const [description, setDescription] = useState("")
  const [parseError, setParseError] = useState<string | null>(null)

  const { mutate, isPending } = useCreateTask()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    let parsedTestCases: TestCaseDto[]
    try {
      parsedTestCases = parseTestCases(testCases)
    } catch (error) {
      setParseError(error instanceof Error ? error.message : "Ошибка парсинга")
      return
    }
    setParseError(null)

    mutate(
      {
        title,
        language,
        initialCode,
        description: { markdown: description },
        testCases: parsedTestCases,
      },
      {
        onSuccess: () => {
          setOpen(false)
          setTitle("")
          setInitialCode("")
          setTestCases("")
          setDescription("")
        },
      }
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button />}>Создать задачу</DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Новая задача</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Название задачи</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Например: Сумма двух чисел"
              required
            />
          </div>

          <div>
            <Label>Описание</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              required
            />
          </div>

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
            <Label>
              Тест-кейсы (каждый с новой строки, формат{" "}
              <code>вход =&gt; ожидание</code>)
            </Label>
            <Textarea
              value={testCases}
              onChange={(e) => setTestCases(e.target.value)}
              rows={4}
              placeholder={"2 3 => 5\n10 20 => 30"}
              required
            />
            {parseError && (
              <p className="text-sm text-destructive mt-1">{parseError}</p>
            )}
          </div>

          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? "Создание..." : "Создать"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export { CreateTaskDialog }
