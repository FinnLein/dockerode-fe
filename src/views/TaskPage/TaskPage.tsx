'use client'

import { useTask } from '@/src/entities/tasks/model/hooks/use-task'
import { useEvalTaskStream } from '@/src/feature/EvalTask/model/hooks/useEvalTaskStream'
import { EvalTask } from '@/src/feature/EvalTask/ui/EvalTask'
import { Card, CardContent, CardHeader, CardTitle } from '@/src/shared/components/ui/card'
import { Text } from '@/src/shared/components/ui/text'
import { Loader2 } from 'lucide-react'

interface TaskPageProps {
	id: string
}

const TaskPage = ({ id }: TaskPageProps) => {
	const { data: task, isLoading, isError } = useTask(id)

	const { mutation, messages, isConnected } = useEvalTaskStream()

	if (isLoading) return <div>Загрузка...</div>
	if (isError || !task) return <div>Ошибка или задача не найдена</div>

	const isProcessing = mutation.isPending || (isConnected && messages.length === 0)

	return (
		<div className="flex flex-col md:flex-row gap-4">
			<Card className="w-full md:w-1/2">
				<CardHeader>
					<CardTitle>{task.title}</CardTitle>
				</CardHeader>
				<CardContent className="flex flex-col gap-4">
					{isProcessing && (
						<div className="flex items-center gap-2 p-4 text-muted-foreground bg-muted/20 rounded-md border border-dashed">
							<Loader2 className="h-4 w-4 animate-spin" />
							<Text as="span" className="text-sm">
								{mutation.isPending ? 'Отправка на проверку...' : 'Компиляция контейнера...'}
							</Text>
						</div>
					)}

					{messages && messages.length > 0 && (
						<div className="flex flex-col gap-4">
							{messages.map((msg, index) => (
								<div key={index} className="rounded-md p-4 bg-muted/50">
									<div className="flex justify-between items-center mb-2">
										<Text as='span' className="font-semibold">Тест {index + 1}</Text>
										<Text as='span' className={`${msg.success ? 'text-green-500' : 'text-red-500'}`}>
											{msg.success ? 'Успешно' : 'Провалено'}
										</Text>
									</div>
									{msg.stderr && (
										<pre className="text-xs bg-black text-red-400 p-2 rounded overflow-x-auto whitespace-pre-wrap font-mono mt-2 max-h-75 overflow-y-auto">
											{msg.stderr}
										</pre>
									)}
								</div>
							))}
						</div>
					)}
				</CardContent>
			</Card>

			<div className="w-full h-full md:w-1/2">
				<EvalTask
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

