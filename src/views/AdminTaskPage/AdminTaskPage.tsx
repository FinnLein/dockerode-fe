"use client"

import { useTasks } from "@/src/entities/tasks/model/hooks/useTasks"
import { AdminTaskCard } from "@/src/entities/tasks/ui/AdminTaskCard"
import { Skeleton } from "@/src/shared/components/ui/skeleton"
import { Text } from "@/src/shared/components/ui/text"
import { CreateBulkTaskDialog } from './ui/CreateBulkTaskDialog'
import { CreateTaskDialog } from './ui/CreateTaskDialog'
import { DeleteBulkTaskDialog } from './ui/DeleteBulkTaskDialog'

const AdminTaskPage = () => {
  const { data: tasks, isLoading, isError } = useTasks()

  if (isError) {
    return (
      <Text as="div" variant="destructive">
        Ошибка при загрузке задач
      </Text>
    )
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <Text as="h1">Каталог задач</Text>
        <div className="flex gap-2">
          <CreateTaskDialog />
          <CreateBulkTaskDialog />
          <DeleteBulkTaskDialog />
        </div>
      </div>

      {isLoading ? (
        <div className="grid gap-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-32 w-full rounded-xl" />
          ))}
        </div>
      ) : tasks?.length === 0 ? (
        <Text as="span" variant="muted" className="py-20 text-center">
          Задач пока нет. Создайте первую!
        </Text>
      ) : (
        <div className="grid gap-4">
          {tasks?.map((task) => (
            <AdminTaskCard key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  )
}

export { AdminTaskPage }
