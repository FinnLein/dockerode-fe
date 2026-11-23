import { type editor as MonacoEditorType } from "monaco-editor"
import { RefObject, useEffect } from "react"
import { Awareness } from "y-protocols/awareness.js"

const useHideCursorOnLeave = (
  editorRef: RefObject<MonacoEditorType.IStandaloneCodeEditor | null>,
  awareness: Awareness | null
) => {
  useEffect(() => {
    const editor = editorRef.current

    if (!awareness || !editor) return

    const hideCursor = () => {
      awareness.setLocalStateField("selection", null)
    }

    const handleTouchStart = (e: TouchEvent) => {
      const editorDomNode = editor.getDomNode()

      if (editorDomNode && !editorDomNode.contains(e.target as Node)) {
        hideCursor()
      }
    }

    const sub = editor.onDidBlurEditorText(hideCursor)
    document.addEventListener("touchstart", handleTouchStart, { passive: true })

    return () => {
      sub.dispose()
      document.removeEventListener("touchstart", handleTouchStart)
    }
  }, [awareness, editorRef])
}

export { useHideCursorOnLeave }
