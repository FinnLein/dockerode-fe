"use client"

import Editor, { BeforeMount, OnMount } from "@monaco-editor/react"
import type { editor as MonacoEditorType } from 'monaco-editor'
import { useTheme } from "next-themes"
import dynamic from "next/dynamic"
import { useEffect, useRef, useState } from "react"
import type { MonacoBinding } from 'y-monaco'
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

const EditorCore = ({
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

    let cancelled = false
    const model = modelRef.current
    const editor = editorRef.current

    import('y-monaco').then(({ MonacoBinding }) => {
      if (cancelled) return
      bindingRef.current?.destroy()
      bindingRef.current = new MonacoBinding(ytext, model, new Set([editor]), awareness)
    })

    return () => {
      cancelled = true
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
          path="collab-model"
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

const CollabMonacoEditor = dynamic(
  () => Promise.resolve(EditorCore),
  {
    ssr: false,
    loading: () => <div className="h-100 flex items-center justify-center bg-background/50">Загрузка редактора...</div>
  }
)

export { CollabMonacoEditor }

