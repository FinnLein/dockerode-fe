import type { TaskResponseDto } from "@/generated/types"
import { TaskCard } from "@/src/entities/tasks/ui/TaskCard"
import { DeleteTaskDialog } from "./DeleteTaskDialog"
import { EditTaskDialog } from "./EditTaskDialog"

const AdminTaskCard = ({ task }: { task: TaskResponseDto }) => {
  return (
    <TaskCard
      task={task}
      action={
        <div className="flex items-center gap-1">
          <EditTaskDialog task={task} />
          <DeleteTaskDialog task={task} />
        </div>
      }
    />
  )
}

export { AdminTaskCard }
