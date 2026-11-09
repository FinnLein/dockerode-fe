"use client"

import { Language } from "@/src/entities/tasks/model/types/tasks"
import { Button } from "@/src/shared/components/ui/button"
import { MonacoEditor } from "@/src/shared/components/ui/monaco-editor"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/shared/components/ui/select"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { EvalTaskProps } from "../model/types/EvalTaskProps"

const EvalTask = ({
  language,
  initialCode,
  testCases,
  onRun,
  isPending,
}: EvalTaskProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const queryLang = searchParams.get("lang") as Language | null

  const initialLang =
    queryLang && language.includes(queryLang) ? queryLang : language[0]

  const [selectedLang, setSelectedLang] = useState<Language>(initialLang)

  const defaultCode =
    initialCode.find((ic) => ic.language === selectedLang)?.template ?? ""
  const [code, setCode] = useState(defaultCode)

  useEffect(() => {
    if (queryLang !== selectedLang) {
      const params = new URLSearchParams(searchParams.toString())
      params.set("lang", selectedLang)
      router.replace(`${pathname}?${params.toString()}`, { scroll: false })
    }
  }, [selectedLang, queryLang, pathname, router, searchParams])

  const handleLanguageChange = (newLang: Language) => {
    setSelectedLang(newLang)
    const newDefaultCode =
      initialCode.find((ic) => ic.language === newLang)?.template ?? ""
    setCode(newDefaultCode)
  }

  return (
    <div className="flex w-full flex-col gap-2">
      <Select
        value={selectedLang}
        onValueChange={(val) => handleLanguageChange(val as Language)}
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
