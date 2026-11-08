"use client"

import { Language } from '@/src/entities/tasks/model/types/tasks'
import { TiptapViewer } from '@/src/shared/components/tiptap-viewer'
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
  isPending: boolean
  messages: Array<{ success: boolean; stderr?: string }>
}

const TaskDetailsCard = ({
  title,
  language,
  description,
  isProcessing,
  isPending,
  messages,
}: TaskDetailsCardProps) => {
  const descriptionHtml = (description as { html?: string })?.html ?? ""

  return (
    <Card className="w-full overflow-y-auto md:w-1/2">
      <CardHeader className="flex flex-row flex-wrap items-center gap-2">
        <CardTitle className="text-lg font-semibold transition-colors group-hover:text-primary">
          Задача {title}
        </CardTitle>
        {language.map((lang) => (
          <Badge key={lang} variant="secondary">
            {lang}
          </Badge>
        ))}
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {descriptionHtml && <TiptapViewer content={descriptionHtml} />}
        {isProcessing && <TaskProcessing isPending={isPending} />}
        <TaskTestList messages={messages} />
      </CardContent>
    </Card>
  )
}

export { TaskDetailsCard }
