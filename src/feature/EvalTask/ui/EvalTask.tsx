"use client"

import { TestCaseDto } from "@/generated/types"
import { Button } from "@/src/shared/components/ui/button"
import { MonacoEditor } from "@/src/shared/components/ui/monaco-editor"
import { useState } from "react"

interface EvalTaskProps {
  key: string
  language: string
  initialCode: string
  testCases: TestCaseDto[]
  onRun: (dto: {
    code: string
    language: string
    testCases: TestCaseDto[]
  }) => void
  isPending: boolean
}

const EvalTask = ({
  language,
  initialCode,
  testCases,
  onRun,
  isPending,
}: EvalTaskProps) => {
  const [code, setCode] = useState(initialCode)

  return (
    <div className="flex w-full flex-col gap-2">
      <MonacoEditor
        language={language}
        value={code}
        onChange={setCode}
        height="60vh"
      />
      <Button
        disabled={isPending}
        className="w-full"
        onClick={() => onRun({ code, language, testCases })}
      >
        {isPending ? "Загрузка..." : "Запустить решение"}
      </Button>
    </div>
  )
}

export { EvalTask }
