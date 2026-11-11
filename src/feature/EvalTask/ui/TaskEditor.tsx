import { Language } from "@/src/entities/tasks/model/types/tasks"
import { CollabMonacoEditor } from '@/src/shared/components/ui/collab-monaco-editor'
import { MonacoEditor } from '@/src/shared/components/ui/monaco-editor'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/shared/components/ui/select/select"
import { Session } from "../model/hooks/useCollabSession"

interface TaskEditorProps {
  session: Session | null
  code: string
  setCode: (code: string) => void
  language: Language[]
  currentLang: Language
  onLangChange: (lang: Language) => void
}

export const TaskEditor = ({
  session,
  code,
  setCode,
  language,
  currentLang,
  onLangChange,
}: TaskEditorProps) => {
  return (
    <>
      <Select
        value={currentLang}
        onValueChange={(val) => onLangChange(val as Language)}
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

      {session ? (
        <CollabMonacoEditor
          ytext={session.ytext}
          awareness={session.awareness}
          language={currentLang}
          height="60vh"
        />
      ) : (
        <MonacoEditor
          value={code}
          onChange={setCode}
          language={currentLang}
          height="60vh"
        />
      )}
    </>
  )
}