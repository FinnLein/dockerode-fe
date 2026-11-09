"use client"

import { TaskTestResult } from "../TaskTestResult/TaskTestResult"

interface TaskTestListProps {
  messages: Array<{
    success: boolean
    stderr?: string
    actual?: string
    expected?: string
  }>
}

const TaskTestList = ({ messages }: TaskTestListProps) => {
  if (!messages.length) return null

  return (
    <div className="flex flex-col gap-4">
      {messages.map((msg, index) => (
        <TaskTestResult
          key={index}
          index={index}
          success={msg.success}
          stderr={msg.stderr}
          actual={msg.actual}
          expected={msg.expected}
        />
      ))}
    </div>
  )
}

export { TaskTestList }
