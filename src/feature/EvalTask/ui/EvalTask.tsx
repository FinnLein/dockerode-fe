"use client"

import { Language } from '@/src/entities/tasks/model/types/tasks'
import { Button } from "@/src/shared/components/ui/button"
import { MonacoEditor } from "@/src/shared/components/ui/monaco-editor"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/shared/components/ui/select"
import { useState } from "react"
import { EvalTaskProps } from '../model/types/EvalTaskProps'

const EvalTask = ({
  language,
  initialCode,
  testCases,
  onRun,
  isPending,
}: EvalTaskProps) => {
  const [selectedLang, setSelectedLang] = useState<Language>(language[0])

  const defaultCode = initialCode.find((ic) => ic.language === selectedLang)?.template ?? ""
  const [code, setCode] = useState(defaultCode)

  const handleLanguageChange = (newLang: Language) => {
    setSelectedLang(newLang)
    const newDefaultCode = initialCode.find((ic) => ic.language === newLang)?.template ?? ""
    setCode(newDefaultCode)
  }

  return (
    <div className="flex w-full flex-col gap-2">
      <Select value={selectedLang} onValueChange={(val) => handleLanguageChange(val as Language)}>
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

      <MonacoEditor
        language={selectedLang}
        value={code}
        onChange={setCode}
        height="60vh"
      />

      <Button
        disabled={isPending}
        className="w-full"
        onClick={() => onRun({ code, language: selectedLang, testCases })}
      >
        {isPending ? "Загрузка..." : "Запустить решение"}
      </Button>
    </div>
  )
}

export { EvalTask }
