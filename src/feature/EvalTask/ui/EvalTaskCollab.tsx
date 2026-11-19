"use client"

import { Code, Language } from "@/src/entities/tasks/model/types/tasks"
import { Button } from "@/src/shared/components/ui/button"
import { Text } from "@/src/shared/components/ui/text"
import {
  useHocuspocusProvider,
  useHocuspocusSyncStatus,
} from "@hocuspocus/provider-react"
import { Play } from "lucide-react"
import { useEffect, useState } from "react"
import { useEvalTask } from "../model/hooks/useEvalTask"
import { useLeaveRoom } from "../model/hooks/useLeaveRoom"
import { useShareRoom } from "../model/hooks/useShareRoom"
import { useTaskLanguage } from "../model/hooks/useTaskLanguage"
import { upsertSavedCode } from "../model/lib/savedCode"
import { EvalTaskCollabProps } from "../model/types/EvalTaskCollabProps"
import { CollabRoomControls } from "./CollabRoomControls"
import { TaskEditor } from "./TaskEditor"

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

  const [hasSynced, setHasSynced] = useState(false)

  const { selectedLang, handleLanguageChange, code, setCode } = useEvalTask({
    language,
    initialCode,
  })

  const provider = useHocuspocusProvider()
  const syncStatus = useHocuspocusSyncStatus()

  const ytext = provider.document.getText("code")
  const awareness = provider.awareness ?? null
  console.log(awareness)

  const leaveRoom = useLeaveRoom(() => setCode(ytext.toString()))
  const shareRoom = useShareRoom()

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>

    const sync = () => {
      const currentCode = ytext.toString()
      setCode(currentCode)

      if (!hasSynced) return

      clearTimeout(timeoutId)

      const code = {
        language: selectedLang,
        template: currentCode,
      } satisfies Code

      timeoutId = setTimeout(() => {
        upsertSavedCode(taskId, code)
      }, 200)
    }
    sync()
    ytext.observe(sync)

    return () => {
      ytext.unobserve(sync)
      clearTimeout(timeoutId)
    }
  }, [ytext, setCode, taskId, hasSynced, selectedLang])

  const { currentLang, handleLangChange } = useTaskLanguage({
    localLang: selectedLang,
    localSetLang: handleLanguageChange,
  })

  const isSyncing = syncStatus === "syncing"

  if (!hasSynced && isSyncing) {
    setHasSynced(true)
  }

  if (!hasSynced) {
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
