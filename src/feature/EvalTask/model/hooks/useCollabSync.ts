import { Code, Language } from "@/src/entities/tasks/model/types/tasks"
import {
  useHocuspocusProvider,
  useHocuspocusSyncStatus,
} from "@hocuspocus/provider-react"
import { useEffect, useState } from "react"
import { upsertSavedCode } from "../lib/savedCode"

interface UseCollabSyncParams {
  taskId: string
  selectedLang: Language
  setCode: (code: string) => void
}

export const useCollabSync = ({
  taskId,
  selectedLang,
  setCode,
}: UseCollabSyncParams) => {
  const [hasSynced, setHasSynced] = useState(false)

  const provider = useHocuspocusProvider()
  const syncStatus = useHocuspocusSyncStatus()

  if (syncStatus === "syncing" && !hasSynced) {
    setHasSynced(true)
  }

  const isReady = hasSynced

  const ytext = provider.document.getText("code")
  const awareness = provider.awareness ?? null

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>

    const sync = () => {
      const currentCode = ytext.toString()
      setCode(currentCode)

      if (!hasSynced) return

      clearTimeout(timeoutId)
      const code: Code = {
        language: selectedLang,
        template: currentCode,
      }

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
  }, [ytext, setCode, taskId, selectedLang])

  return {
    ytext,
    awareness,
    isReady,
  }
}
