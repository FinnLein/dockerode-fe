"use client"

import { Language } from '@/src/entities/tasks/model/types/tasks'
import { Button } from "@/src/shared/components/ui/button"
import { Play } from 'lucide-react'
import { useRef } from 'react'
import { useCollabRoom } from '../model/hooks/useCollabRoom'
import { Session, useCollabSession } from '../model/hooks/useCollabSession'
import { useEvalTask } from '../model/hooks/useEvalTask'
import { useTaskLanguage } from '../model/hooks/useTaskLanguage'
import { EvalTaskProps } from "../model/types/EvalTaskProps"
import { CollabRoomControls } from './CollabRoomControls'
import { TaskEditor } from './TaskEditor'

export const EvalTask = ({
  language,
  initialCode,
  testCases,
  onRun,
  isPending,
}: EvalTaskProps) => {
  const { selectedLang, handleLanguageChange, code, setCode } = useEvalTask({
    language,
    initialCode,
  })

  const sessionRef = useRef<Session | null>(null)

  const { roomId, createRoom, leaveRoom, shareRoom } = useCollabRoom(() => code, () => {
    if (sessionRef.current) setCode(sessionRef.current.ytext.toString())
  })

  const session = useCollabSession(roomId)
  sessionRef.current = session

  const { currentLang, handleLangChange } = useTaskLanguage({
    session,
    localLang: selectedLang,
    localSetLang: handleLanguageChange
  })

  if (roomId && !session) {
    return <div className="p-4 text-center">Подключение к комнате...</div>
  }

  const handleRun = () => {
    const codeToRun = session ? session.ytext.toString() : code
    onRun({ code: codeToRun, language: currentLang, testCases })
  }

  return (
    <div className="flex w-full flex-col gap-2">
      <CollabRoomControls
        roomId={roomId}
        onCreate={createRoom}
        onLeave={leaveRoom}
        onShare={shareRoom}
      />

      <TaskEditor
        session={session}
        code={code}
        setCode={setCode}
        language={language}
        currentLang={currentLang as Language}
        onLangChange={handleLangChange}
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