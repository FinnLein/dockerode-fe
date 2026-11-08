import { useDeleteBulkTask } from "@/src/entities/tasks/model/hooks/useDeleteBulkTask"
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
import { useState } from "react"

const DeleteBulkTaskDialog = () => {
	const [open, setOpen] = useState(false)
	const { mutate, isPending } = useDeleteBulkTask()

	const handleDelete = (e: React.MouseEvent) => {
		e.preventDefault()
		mutate(undefined, {
			onSuccess: () => setOpen(false)
		})
	}

	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogTrigger
				render={
					<Button
						variant="destructive"
						className="gap-2"
						title="Удалить все задачи"
					/>
				}
			>
				<Trash2 className="size-4" />
				Очистить всё
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Удалить все задачи?</AlertDialogTitle>
					<AlertDialogDescription>
						Это действие нельзя отменить. Все задачи будут удалены навсегда.
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
						{isPending ? "Удаление..." : "Удалить всё"}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}

export { DeleteBulkTaskDialog }
