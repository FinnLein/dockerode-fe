"use client"

import Editor, { BeforeMount, OnChange } from "@monaco-editor/react"
import { useTheme } from "next-themes"
import { useState } from "react"
import { useMounted } from "../../hooks/useMounted"

interface MonacoEditorProps {
  language: string
  value: string
  onChange: (value: string) => void
  height?: string | number
  readOnly?: boolean
  className?: string
}

const MonacoEditor = ({
  language,
  value,
  onChange,
  height = "400px",
  readOnly = false,
  className,
}: MonacoEditorProps) => {
  const [isEditorReady, setIsEditorReady] = useState(false)
  const { resolvedTheme } = useTheme()
  const mounted = useMounted()

  const handleEditorChange: OnChange = (newValue) => {
    onChange(newValue ?? "")
  }

  const handleBeforeMount: BeforeMount = (monaco) => {
    monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: true,
      noSyntaxValidation: true,
    })
    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: true,
      noSyntaxValidation: true,
    })

    if (
      !monaco.languages
        .getLanguages()
        .some((lang: { id: string }) => lang.id === "golang")
    ) {
      monaco.languages.register({ id: "golang", aliases: ["go"] })
    }
  }

  const editorLanguage = language === "golang" ? "go" : language

  return (
    <div className={className}>
      <div className="relative overflow-hidden rounded-md border">
        {!isEditorReady && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/50">
            Загрузка редактора...
          </div>
        )}
        <Editor
          theme={mounted && resolvedTheme === "light" ? "light" : "vs-dark"}
          language={editorLanguage}
          value={value}
          onChange={handleEditorChange}
          beforeMount={handleBeforeMount}
          onMount={() => setIsEditorReady(true)}
          loading={<div />}
          height={height}
          width="100%"
          options={{
            minimap: { enabled: false },
            readOnly,
            fontSize: 14,
            scrollBeyondLastLine: false,
            automaticLayout: true,
          }}
        />
      </div>
    </div>
  )
}

export { MonacoEditor }
