"use client"

import { useTask } from "@/src/entities/tasks/model/hooks/use-task"
import { useEvalTaskStream } from "@/src/feature/EvalTask/model/hooks/useEvalTaskStream"
import { EvalTask } from "@/src/feature/EvalTask/ui/EvalTask"
import { Text } from "@/src/shared/components/ui/text"

import { TaskDetailsCard } from "./ui/TaskDetailsCard/TaskDetailsCard"

interface TaskPageProps {
  id: string
}

const TaskPage = ({ id }: TaskPageProps) => {
  const { data: task, isLoading, isError } = useTask(id)
  const { mutation, messages, isConnected } = useEvalTaskStream()

  if (isLoading) return <Text>Загрузка...</Text>
  if (isError || !task)
    return <Text variant="destructive">Ошибка или задача не найдена</Text>

  const isProcessing =
    mutation.isPending || (isConnected && messages.length === 0)

  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <TaskDetailsCard
        title={task.title}
        language={task.language}
        isProcessing={isProcessing}
        isPending={mutation.isPending}
        messages={messages}
      />

      <div className="h-full w-full md:w-1/2">
        <EvalTask
          key={task.id}
          language={task.language}
          initialCode={task.initialCode}
          testCases={task.testCases}
          onRun={mutation.mutate}
          isPending={isProcessing}
        />
      </div>
    </div>
  )
}

export { TaskPage }
