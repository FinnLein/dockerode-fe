"use client"

import { Text } from "@/src/shared/components/ui/text"
import { Loader2 } from "lucide-react"

interface TaskProcessingProps {
  isPending: boolean
}

const TaskProcessing = ({ isPending }: TaskProcessingProps) => {
  return (
    <div className="flex items-center gap-2 rounded-md border border-dashed bg-muted/20 p-4 text-muted-foreground">
      <Loader2 className="h-4 w-4 animate-spin" />
      <Text as="span">
        {isPending ? "Отправка на проверку..." : "Компиляция контейнера..."}
      </Text>
    </div>
  )
}

export { TaskProcessing }
