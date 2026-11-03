'use client'

import { useTasks } from '@/src/entities/tasks/model/hooks/use-tasks'
import { Skeleton } from '@/src/shared/components/ui/skeleton'
import { Text } from '@/src/shared/components/ui/text'
import { TaskCard } from './ui/TaskCard'

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
      <div className="flex justify-between items-center mb-8">
        <Text as="h1">Каталог задач</Text>
      </div>

      {isLoading ? (
        <div className="grid gap-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-32 w-full rounded-xl" />
          ))}
        </div>
      ) : tasks?.length === 0 ? (
        <Text as="span" variant="muted" className="text-center py-20">
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

