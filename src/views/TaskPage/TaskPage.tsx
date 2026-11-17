"use client"

import { useTask } from "@/src/entities/tasks/model/hooks/useTask"
import { useEvalCollabTaskStream } from "@/src/feature/EvalTask/model/hooks/useEvalCollabTaskStream"
import { useEvalTaskStream } from "@/src/feature/EvalTask/model/hooks/useEvalTaskStream"
import { EvalTask } from "@/src/feature/EvalTask/ui/EvalTask"
import { Text } from "@/src/shared/components/ui/text"
import { useSearchParams } from "next/navigation"
import { useCallback } from "react"
import { TaskDetailsCard } from "./ui/TaskDetailsCard/TaskDetailsCard"

interface TaskPageProps {
  id: string
}

const TaskPage = ({ id }: TaskPageProps) => {
  const searchParams = useSearchParams()
  const roomId = searchParams.get("roomId")

  const { data: task, isLoading, isError } = useTask(id)

  const {
    mutation: localMutation,
    isRunning: isLocalRunning,
    results: localResults,
  } = useEvalTaskStream()

  const {
    mutation: collabMutation,
    isRunning: isCollabRunning,
    results: collabResults,
  } = useEvalCollabTaskStream(roomId)

  const isCollab = !!roomId
  const taskId = task?.id

  const handleRun = useCallback(
    (dto: Parameters<typeof localMutation.mutate>[0]["dto"]) => {
      if (!taskId) return
      localMutation.mutate({ taskId, dto })
    },
    [taskId, localMutation.mutate]
  )

  if (isLoading) return <Text>Загрузка...</Text>
  if (isError || !task)
    return <Text variant="destructive">Ошибка или задача не найдена</Text>

  const isLocalProcessing = localMutation.isPending || isLocalRunning
  const isCollabProcessing = collabMutation.isPending || isCollabRunning
  const isProcessing = isCollab ? isCollabProcessing : isLocalProcessing
  const results = isCollab ? collabResults : localResults

  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <TaskDetailsCard
        title={task.title}
        description={task.description}
        language={task.language}
        isProcessing={isProcessing}
        isPending={isProcessing}
        messages={results}
      />

      <div className="h-full w-full md:w-1/2">
        <EvalTask
          key={task.id}
          taskId={task.id}
          language={task.language}
          initialCode={task.initialCode}
          testCases={task.testCases}
          onRun={handleRun}
          isPending={localMutation.isPending}
          onRunCollab={collabMutation.mutate}
          isCollabRunning={isCollabProcessing}
        />
      </div>
    </div>
  )
}

export { TaskPage }
