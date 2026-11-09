"use client"

import { Text } from "@/src/shared/components/ui/text"

interface TaskTestResultProps {
  index: number
  success: boolean
  stderr?: string
  actual?: string
  expected?: string
}

const TaskTestResult = ({
  index,
  success,
  stderr,
  actual,
  expected,
}: TaskTestResultProps) => {
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

      {!success && (actual !== undefined || expected !== undefined) && (
        <div className="mt-2 flex flex-col gap-1 font-mono text-xs">
          {expected !== undefined && (
            <div className="text-muted-foreground">
              Ожидалось: <span className="text-green-500">{expected}</span>
            </div>
          )}
          {actual !== undefined && (
            <div className="text-muted-foreground">
              Получено: <span className="text-red-500">{actual}</span>
            </div>
          )}
        </div>
      )}

      {stderr && (
        <pre className="mt-2 max-h-75 overflow-x-auto overflow-y-auto rounded bg-black p-2 font-mono text-xs whitespace-pre-wrap text-red-400">
          {stderr}
        </pre>
      )}
    </div>
  )
}

export { TaskTestResult }
