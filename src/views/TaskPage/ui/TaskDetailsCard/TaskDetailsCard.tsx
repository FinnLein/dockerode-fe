"use client"

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
  language: string
  isProcessing: boolean
  isPending: boolean
  messages: Array<{ success: boolean; stderr?: string }>
}

const TaskDetailsCard = ({
  title,
  language,
  isProcessing,
  isPending,
  messages,
}: TaskDetailsCardProps) => {
  return (
    <Card className="w-full overflow-y-auto md:w-1/2">
      <CardHeader className="flex gap-2">
        <CardTitle className="text-lg font-semibold transition-colors group-hover:text-primary">
          Задача {title}
        </CardTitle>
        <Badge variant="secondary">{language}</Badge>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {isProcessing && <TaskProcessing isPending={isPending} />}
        <TaskTestList messages={messages} />
      </CardContent>
    </Card>
  )
}

export { TaskDetailsCard }
