"use client"

import { Language } from "@/src/entities/tasks/model/types/tasks"
import { Button } from "@/src/shared/components/ui/button"
import { Text } from "@/src/shared/components/ui/text"
import { Play } from "lucide-react"
import { useCollabSync } from "../model/hooks/useCollabSync"
import { useEvalTask } from "../model/hooks/useEvalTask"
import { useLeaveRoom } from "../model/hooks/useLeaveRoom"
import { useShareRoom } from "../model/hooks/useShareRoom"
import { useTaskLanguage } from "../model/hooks/useTaskLanguage"
import { EvalTaskCollabProps } from "../model/types/EvalTaskCollabProps"
import { CollabRoomControls } from "./CollabRoomControls"
import { TaskEditor } from "./TaskEditor"
import { AwarenessBar } from "./AwarenessBar"

const EvalTaskCollab = (props: EvalTaskCollabProps) => {
  const {
    roomId,
    taskId,
    language,
    initialCode,
    testCases,
    onRunCollab,
    isCollabRunning,
  } = props

  const { selectedLang, handleLanguageChange, code, setCode } = useEvalTask({
    language,
    initialCode,
  })

  const { ytext, awareness, isReady } = useCollabSync({
    taskId,
    selectedLang,
    setCode,
  })

  const { currentLang, handleLangChange } = useTaskLanguage({
    localLang: selectedLang,
    localSetLang: handleLanguageChange,
  })

  const leaveRoom = useLeaveRoom(() => setCode(ytext.toString()))
  const shareRoom = useShareRoom()

  if (!isReady) {
    return (
      <Text className="flex items-center justify-center md:h-[75vh]">
        Подключение к комнате...
      </Text>
    )
  }

  const handleRun = () => {
    onRunCollab({ roomId, testCases })
  }

  return (
    <div className="flex w-full flex-col gap-2">
      <AwarenessBar />
      <CollabRoomControls
        roomId={roomId}
        isPending={false}
        onCreate={() => {}}
        onLeave={leaveRoom}
        onShare={shareRoom}
      />
      <TaskEditor
        ytext={ytext}
        awareness={awareness}
        code={code}
        setCode={setCode}
        language={language}
        currentLang={currentLang as Language}
        onLangChange={handleLangChange}
      />
      <Button
        leftIcon={<Play />}
        disabled={isCollabRunning}
        className="w-full"
        onClick={handleRun}
      >
        {isCollabRunning ? "Загрузка..." : "Запустить решение"}
      </Button>
    </div>
  )
}

export { EvalTaskCollab }
