"use client"

import { Language } from "@/src/entities/tasks/model/types/tasks"
import { CollabMonacoEditor } from "@/src/shared/components/ui/collab-monaco-editor"
import { MonacoEditor } from "@/src/shared/components/ui/monaco-editor"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/shared/components/ui/select/select"
import { TaskEditorProps } from "../model/types/TaskEditorProps"

const TaskEditor = (props: TaskEditorProps) => {
  const {
    ytext,
    awareness,
    code,
    setCode,
    language,
    currentLang,
    onLangChange,
  } = props

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

      {ytext ? (
        <CollabMonacoEditor
          ytext={ytext}
          awareness={awareness}
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

export { TaskEditor }
