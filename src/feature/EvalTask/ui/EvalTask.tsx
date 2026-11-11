"use client"

import { Language } from '@/src/entities/tasks/model/types/tasks'
import { Button } from "@/src/shared/components/ui/button"
import { Play } from 'lucide-react'
import { useEffect } from 'react'
import { useCollabRoom } from '../model/hooks/useCollabRoom'
import { useCollabSession } from '../model/hooks/useCollabSession'
import { useEvalTask } from '../model/hooks/useEvalTask'
import { useTaskLanguage } from '../model/hooks/useTaskLanguage'
import { EvalTaskProps } from "../model/types/EvalTaskProps"
import { CollabRoomControls } from './CollabRoomControls'
import { TaskEditor } from './TaskEditor'

export const EvalTask = ({
  taskId,
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

  const { roomId, createRoom, leaveRoom, shareRoom, isCreatingRoom } = useCollabRoom(
    taskId,
    () => code
  )

  const session = useCollabSession(roomId)

  useEffect(() => {
    if (!session) return
    const { ytext } = session

    const sync = () => setCode(ytext.toString())

    ytext.observe(sync)

    return () => ytext.unobserve(sync)
  }, [session, setCode])

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
        isPending={isCreatingRoom}
        onCreate={createRoom}
        onLeave={leaveRoom}
        onShare={shareRoom}
      />

      <TaskEditor
        key={session ? 'collab' : 'local'}
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