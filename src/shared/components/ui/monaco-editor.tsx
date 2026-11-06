"use client"

import Editor, { OnChange, OnMount } from "@monaco-editor/react"
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

  const handleEditorDidMount: OnMount = () => {
    setIsEditorReady(true)
  }

  const editorTheme = mounted && resolvedTheme === "light" ? "light" : "vs-dark"

  return (
    <div className={className}>
      <div className="relative overflow-hidden rounded-md border">
        {!isEditorReady && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/50">
            Загрузка редактора...
          </div>
        )}
        <Editor
          theme={editorTheme}
          defaultLanguage={language}
          value={value}
          onChange={handleEditorChange}
          onMount={handleEditorDidMount}
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
