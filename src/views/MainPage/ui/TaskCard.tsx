import { TaskResponseDto } from "@/generated/types"
import { Badge } from "@/src/shared/components/ui/badge"
import { Card, CardHeader, CardTitle } from "@/src/shared/components/ui/card"
import Link from "next/link"

const TaskCard = ({ task }: { task: TaskResponseDto }) => {
  return (
    <Link
      href={`/tasks/${task.id}`}
      className="group transition-transform duration-200 hover:-translate-y-1"
    >
      <Card className="h-full cursor-pointer transition-colors group-hover:shadow-md hover:border-primary/50">
        <CardHeader className="flex flex-row justify-between pb-2">
          <CardTitle className="text-lg font-semibold transition-colors group-hover:text-primary">
            Задача {task.title}
          </CardTitle>
          <Badge variant="secondary">{task.language}</Badge>
        </CardHeader>
      </Card>
    </Link>
  )
}

export { TaskCard }
