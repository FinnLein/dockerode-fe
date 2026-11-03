'use client'

import { Text } from '@/src/shared/components/ui/text'

interface TaskTestResultProps {
  index: number
  success: boolean
  stderr?: string
}

const TaskTestResult = ({ index, success, stderr }: TaskTestResultProps) => {
  return (
    <div className="rounded-md p-4 bg-muted/50">
      <div className="flex justify-between items-center mb-2">
        <Text as="span" weight="semibold">
          Тест {index + 1}
        </Text>
        <Text as="span" variant={success ? 'success' : 'destructive'}>
          {success ? 'Успешно' : 'Провалено'}
        </Text>
      </div>
      {stderr && (
        <pre className="text-xs bg-black text-red-400 p-2 rounded overflow-x-auto whitespace-pre-wrap font-mono mt-2 max-h-75 overflow-y-auto">
          {stderr}
        </pre>
      )}
    </div>
  )
}

export { TaskTestResult }