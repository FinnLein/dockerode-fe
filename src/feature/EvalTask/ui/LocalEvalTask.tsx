"use client"

import { Language } from "@/src/entities/tasks/model/types/tasks"
import { Button } from "@/src/shared/components/ui/button"
import { Play } from "lucide-react"
import { useEvalTask } from "../model/hooks/useEvalTask"
import { TaskEditor } from "./TaskEditor"
import { EvalTaskProps } from "../model/types/EvalTaskProps"

interface LocalEvalTaskProps extends EvalTaskProps {
  onCreateRoom: () => void
  isCreatingRoom: boolean
}

export const LocalEvalTask = ({
  language,
  initialCode,
  testCases,
  onRun,
  isPending,
  onCreateRoom,
  isCreatingRoom,
}: LocalEvalTaskProps) => {
  const { selectedLang, handleLanguageChange, code, setCode } = useEvalTask({
    language,
    initialCode,
  })

  const handleRun = () => {
    onRun({ code, language: selectedLang, testCases })
  }

  return (
    <div className="flex w-full flex-col gap-2">
      <Button
        type="button"
        variant="secondary"
        onClick={onCreateRoom}
        disabled={isCreatingRoom}
      >
        {isCreatingRoom ? "Создание комнаты..." : "Совместное редактирование"}
      </Button>

      <TaskEditor
        key="local"
        session={null}
        code={code}
        setCode={setCode}
        language={language}
        currentLang={selectedLang}
        onLangChange={handleLanguageChange}
      />

      <Button
        leftIcon={<Play />}
        disabled={isPending}
        className="w-full"
        onClick={handleRun}
      >
        {isPending ? "Загрузка..." : "Запустить решение"}
      </Button>
    </div>
  )
}
