import type { TaskResponseDto } from "@/generated/types"
import { Badge } from "@/src/shared/components/ui/badge"
import {
  Card,
  CardAction,
  CardHeader,
  CardTitle,
} from "@/src/shared/components/ui/card"
import Link from "next/link"

interface TaskCardProps {
  task: TaskResponseDto
  action?: React.ReactNode
}

const TaskCard = (props: TaskCardProps) => {
  const { task, action } = props

  return (
    <Card className="h-full transition-colors hover:border-primary/50 hover:shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">
          <Link
            href={`/tasks/${task.id}`}
            className="transition-colors hover:text-primary"
          >
            Задача {task.title}
          </Link>
        </CardTitle>
        <div className="flex flex-wrap items-center gap-1">
          {task.language.map((lang) => (
            <Badge key={lang} variant="secondary">
              {lang}
            </Badge>
          ))}
        </div>
        {action && <CardAction>{action}</CardAction>}
      </CardHeader>
    </Card>
  )
}

export { TaskCard }
