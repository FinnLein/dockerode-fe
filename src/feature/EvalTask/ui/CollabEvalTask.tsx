"use client"

import { InitialCodeResponseDto, TestCaseDto } from "@/generated/types"
import { Language } from "@/src/entities/tasks/model/types/tasks"
import { Button } from "@/src/shared/components/ui/button"
import { Play } from "lucide-react"
import { useEffect } from "react"
import { useCollabSession } from "../model/hooks/useCollabSession"
import { useEvalCollabTaskStream } from "../model/hooks/useEvalCollabTaskStream"
import { useEvalTask } from "../model/hooks/useEvalTask"
import { useTaskLanguage } from "../model/hooks/useTaskLanguage"
import { CollabRoomControls } from "./CollabRoomControls"
import { TaskEditor } from "./TaskEditor"

interface CollabEvalTaskProps {
  roomId: string
  language: Language[]
  initialCode: InitialCodeResponseDto[]
  testCases: TestCaseDto[]
  onLeaveRoom: () => void
  onShareRoom: () => void
}

export const CollabEvalTask = ({
  roomId,
  language,
  initialCode,
  testCases,
  onLeaveRoom,
  onShareRoom,
}: CollabEvalTaskProps) => {
  const session = useCollabSession(roomId)

  const { selectedLang, handleLanguageChange, code, setCode } = useEvalTask({
    language,
    initialCode,
  })

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
    localSetLang: handleLanguageChange,
  })

  const { mutation, isRunning, results, error } =
    useEvalCollabTaskStream(roomId)

  if (!session) {
    return <div className="p-4 text-center">Подключение к комнате...</div>
  }

  const handleRun = () => {
    mutation.mutate({ roomId, testCases })
  }

  return (
    <div className="flex w-full flex-col gap-2">
      <CollabRoomControls
        roomId={roomId}
        isPending={false}
        onCreate={() => {}}
        onLeave={onLeaveRoom}
        onShare={onShareRoom}
      />

      <TaskEditor
        key="collab"
        session={session}
        code={code}
        setCode={setCode}
        language={language}
        currentLang={currentLang as Language}
        onLangChange={handleLangChange}
      />

      {results.length > 0 && (
        <div className="rounded-md border p-4">
          <h3>Результаты:</h3>
          <pre>{JSON.stringify(results, null, 2)}</pre>
        </div>
      )}

      {error && <div className="text-red-500">{error}</div>}

      <Button
        leftIcon={<Play />}
        disabled={isRunning || mutation.isPending}
        className="w-full"
        onClick={handleRun}
      >
        {isRunning ? "Идет прогон..." : "Запустить решение"}
      </Button>
    </div>
  )
}
