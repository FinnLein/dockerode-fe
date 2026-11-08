import type { TaskResponseDto } from "@/generated/types"
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/src/shared/components/ui/alert-dialog"
import { Button } from "@/src/shared/components/ui/button"
import { Trash2 } from "lucide-react"
import { useDeleteTask } from '../model/hooks/useDeleteTask'

const DeleteTaskDialog = ({ task }: { task: TaskResponseDto }) => {
  const { mutate, isPending } = useDeleteTask()

  const handleDelete = () => {
    mutate(task.id)
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={
          <Button
            variant="ghost"
            size="icon-lg"
            className="text-muted-foreground hover:text-destructive"
            title="Удалить задачу"
            aria-label="Удалить задачу"
          />
        }
      >
        <Trash2 />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Удалить задачу?</AlertDialogTitle>
          <AlertDialogDescription>
            Это действие нельзя отменить. Задача «{task.title}» будет удалена
            навсегда.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel render={<Button variant="outline" />}>
            Отмена
          </AlertDialogCancel>
          <AlertDialogAction
            render={
              <Button
                variant="destructive"
                disabled={isPending}
                onClick={handleDelete}
              />
            }
          >
            {isPending ? "Удаление..." : "Удалить"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export { DeleteTaskDialog }
