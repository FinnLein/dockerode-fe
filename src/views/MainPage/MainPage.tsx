"use client"

import { useTasks } from "@/src/entities/tasks/model/hooks/useTasks"
import { TaskCard } from "@/src/entities/tasks/ui/TaskCard"
import { Skeleton } from "@/src/shared/components/ui/skeleton"
import { Text } from "@/src/shared/components/ui/text"

const MainPage = () => {
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
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  )
}

export { MainPage }
