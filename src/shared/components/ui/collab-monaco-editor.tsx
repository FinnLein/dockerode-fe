"use client"

import Editor, { BeforeMount, OnMount } from "@monaco-editor/react"
import type { editor as MonacoEditorType } from 'monaco-editor'
import { useTheme } from "next-themes"
import { useEffect, useRef, useState } from "react"
import { MonacoBinding } from 'y-monaco'
import { Awareness } from 'y-protocols/awareness'
import * as Y from 'yjs'
import { useMounted } from "../../hooks/useMounted"

interface CollabMonacoEditorProps {
  ytext: Y.Text
  awareness: Awareness
  language: string
  height?: string | number
  readOnly?: boolean
  className?: string
}

const CollabMonacoEditor = ({
  ytext,
  awareness,
  language,
  height = "400px",
  readOnly = false,
  className,
}: CollabMonacoEditorProps) => {
  const [isEditorReady, setIsEditorReady] = useState(false)
  const { resolvedTheme } = useTheme()
  const mounted = useMounted()

  const editorRef = useRef<MonacoEditorType.IStandaloneCodeEditor | null>(null)
  const modelRef = useRef<MonacoEditorType.ITextModel | null>(null)
  const bindingRef = useRef<MonacoBinding | null>(null)

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

  const handleOnMount: OnMount = (editor) => {
    editorRef.current = editor
    modelRef.current = editor.getModel()
    setIsEditorReady(true)
  }

  useEffect(() => {
    if (!isEditorReady || !modelRef.current || !editorRef.current) return

    bindingRef.current?.destroy()
    bindingRef.current = new MonacoBinding(
      ytext,
      modelRef.current,
      new Set([editorRef.current]),
      awareness,
    )

    return () => {
      bindingRef.current?.destroy()
      bindingRef.current = null
    }
  }, [ytext, awareness, isEditorReady])

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
          beforeMount={handleBeforeMount}
          onMount={handleOnMount}
          loading={<div />}
          height={height}
          width="100%"
          options={{
            minimap: { enabled: false },
            readOnly,
            fontSize: 14,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2
          }}
        />
      </div>
    </div>
  )
}

export { CollabMonacoEditor }

