import type { Language } from "@/src/entities/tasks/model/types/tasks"
import type { Awareness } from "y-protocols/awareness.js"
import type { Text } from "yjs"

interface TaskEditorProps {
  ytext: Text | null
  awareness: Awareness | null
  code: string
  setCode: (code: string) => void
  language: Language[]
  currentLang: Language
  onLangChange: (lang: Language) => void
}

export type { TaskEditorProps }
