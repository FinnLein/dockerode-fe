"use client"

import { Language } from "@/src/entities/tasks/model/types/tasks"
import { Button } from "@/src/shared/components/ui/button"
import { Play } from "lucide-react"
import { useMemo, useSyncExternalStore } from "react"
import { useCollabRoom } from "../model/hooks/useCollabRoom"
import { useEvalTask } from "../model/hooks/useEvalTask"
import { parseSavedCode } from "../model/lib/savedCode"
import { EvalTaskProps } from "../model/types/EvalTaskProps"
import { CollabRoomControls } from "./CollabRoomControls"
import { TaskEditor } from "./TaskEditor"

const emptySubscribe = () => () => {}

const EvalTaskLocal = (props: EvalTaskProps) => {
  const { taskId, language, initialCode, testCases, onRun, isPending } = props

  const rawSavedCode = useSyncExternalStore(
    emptySubscribe,
    () => localStorage.getItem(`code_${taskId}`),
    () => null
  )
  const savedCode = useMemo(() => parseSavedCode(rawSavedCode), [rawSavedCode])

  const { selectedLang, handleLanguageChange, code, setCode } = useEvalTask({
    language,
    initialCode: savedCode ?? initialCode,
  })

  const { createRoom, isCreatingRoom } = useCollabRoom(
    taskId,
    () => code,
    selectedLang
  )

  const handleRun = () => {
    onRun({ code, language: selectedLang, testCases })
  }

  return (
    <div className="flex w-full flex-col gap-2">
      <CollabRoomControls
        roomId={null}
        isPending={isCreatingRoom}
        onCreate={createRoom}
        onLeave={() => {}}
        onShare={() => {}}
      />

      <TaskEditor
        ytext={null}
        awareness={null}
        code={code}
        setCode={setCode}
        language={language}
        currentLang={selectedLang as Language}
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

export { EvalTaskLocal }
