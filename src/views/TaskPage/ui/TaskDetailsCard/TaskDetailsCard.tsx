"use client"

import { Language } from "@/src/entities/tasks/model/types/tasks"
import { TiptapViewer } from "@/src/shared/components/tiptap-viewer"
import { Badge } from "@/src/shared/components/ui/badge"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/shared/components/ui/card"
import { TaskProcessing } from "../TaskProcessing/TaskProcessing"
import { TaskTestList } from "../TaskTestList/TaskTestList"

interface TaskDetailsCardProps {
  title: string
  language: Language[]
  description: { html?: string } | unknown
  isProcessing: boolean
  messages: Array<{
    success: boolean
    stderr?: string
    actual?: string
    expected?: string
  }>
}

const TaskDetailsCard = ({
  title,
  language,
  description,
  isProcessing,
  messages,
}: TaskDetailsCardProps) => {
  const descriptionHtml = (description as { html?: string })?.html ?? ""

  return (
    <Card className="p relative w-full md:w-1/2">
      <div className="flex flex-col py-2 pl-2 md:absolute md:inset-0">
        <CardHeader className="flex shrink-0 flex-row flex-wrap items-center gap-2">
          <CardTitle className="text-lg font-semibold transition-colors group-hover:text-primary">
            Задача {title}
          </CardTitle>
          {language.map((lang) => (
            <Badge key={lang} variant="secondary">
              {lang}
            </Badge>
          ))}
        </CardHeader>
        <CardContent className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto">
          {descriptionHtml && <TiptapViewer content={descriptionHtml} />}
          {isProcessing && <TaskProcessing isPending={isProcessing} />}
          <TaskTestList messages={messages} />
        </CardContent>
      </div>
    </Card>
  )
}

export { TaskDetailsCard }
