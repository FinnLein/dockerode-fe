"use client"

import { Language } from "@/src/entities/tasks/model/types/tasks"
import { Button } from "@/src/shared/components/ui/button"
import { CollabMonacoEditor } from '@/src/shared/components/ui/collab-monaco-editor'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/shared/components/ui/select"
import { useSearchParams } from 'next/navigation'
import { useCollabSession } from '../model/hooks/useCollabSession'
import { useEvalTask } from '../model/hooks/useEvalTask'
import { EvalTaskProps } from "../model/types/EvalTaskProps"

const EvalTask = ({
  language,
  initialCode,
  testCases,
  onRun,
  isPending,
}: EvalTaskProps) => {
  const searchParams = useSearchParams()
  const roomId = searchParams.get('roomId')

  const { selectedLang, handleLanguageChange } = useEvalTask({
    language,
    initialCode,
  })

  const session = useCollabSession(roomId)

  if (!roomId) {
    return <div>Комната не найдена</div>
  }

  if (!session) {
    return <div>Загрузка...</div>
  }

  return (
    <div className="flex w-full flex-col gap-2">
      <Select
        value={selectedLang}
        onValueChange={(val) => handleLanguageChange(val as Language)}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Выберите язык" />
        </SelectTrigger>
        <SelectContent>
          {language.map((lang) => (
            <SelectItem key={lang} value={lang}>
              {lang}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <CollabMonacoEditor
        ytext={session.ytext}
        awareness={session.awareness}
        language={selectedLang}
        height="60vh"
      />

      <Button
        disabled={isPending}
        className="w-full"
        onClick={() => onRun({ code: session.ytext.toString(), language: selectedLang, testCases })}
      >
        {isPending ? "Загрузка..." : "Запустить решение"}
      </Button>
    </div>
  )
}

export { EvalTask }

