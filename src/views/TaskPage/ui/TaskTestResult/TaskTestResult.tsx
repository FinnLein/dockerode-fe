"use client"

import { Text } from "@/src/shared/components/ui/text"

interface TaskTestResultProps {
  index: number
  success: boolean
  stderr?: string
}

const TaskTestResult = ({ index, success, stderr }: TaskTestResultProps) => {
  return (
    <div className="rounded-md bg-muted/50 p-4">
      <div className="mb-2 flex items-center justify-between">
        <Text as="span" weight="semibold">
          Тест {index + 1}
        </Text>
        <Text as="span" variant={success ? "success" : "destructive"}>
          {success ? "Успешно" : "Провалено"}
        </Text>
      </div>
      {stderr && (
        <pre className="mt-2 max-h-75 overflow-x-auto overflow-y-auto rounded bg-black p-2 font-mono text-xs whitespace-pre-wrap text-red-400">
          {stderr}
        </pre>
      )}
    </div>
  )
}

export { TaskTestResult }
