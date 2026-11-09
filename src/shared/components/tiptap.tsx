"use client"

import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"

interface TiptapProps {
  content: string
  onChange: (html: string) => void
}

const TiptapEditor = (props: TiptapProps) => {
  const { content, onChange } = props

  const editor = useEditor({
    extensions: [StarterKit],
    content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      if (editor.isEmpty) {
        onChange("")
      } else {
        onChange(editor.getHTML())
      }
    },
    editorProps: {
      attributes: {
        class:
          "min-h-[80px] w-full text-sm md:text-xs/relaxed focus:outline-none prose prose-sm dark:prose-invert",
      },
    },
  })

  return (
    <div className="flex w-full rounded-md border border-input bg-input/20 px-2 py-2 text-sm transition-colors focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/30 dark:bg-input/30">
      <EditorContent editor={editor} className="w-full" />
    </div>
  )
}

export { TiptapEditor }
