'use client'

import { useTask } from '@/src/entities/tasks/model/hooks/use-task'
import { Button } from '@/src/shared/components/ui/button'
import { Card, CardHeader, CardTitle } from '@/src/shared/components/ui/card'
import { MonacoEditor } from '@/src/shared/components/ui/monaco-editor'
import { useEffect, useState } from 'react'

interface TaskPageProps {
	id: string
}

const TaskPage = ({ id }: TaskPageProps) => {
	const { data: task, isLoading, isError } = useTask(id)

	const [code, setCode] = useState('')

	useEffect(() => {
		if (task?.initialCode) {
			setCode(task.initialCode)
		}
	}, [task?.initialCode])

	if (isLoading) return <div>Загрузка...</div>
	if (isError || !task) return <div>Ошибка или задача не найдена</div>

	const handleRun = () => {
		console.log('Запуск кода для задачи:', task.id)
		console.log(code)
	}

	return (
		<div className="flex gap-4">
			<Card className="w-[50vw]">
				<CardHeader>
					<CardTitle>{task.title}</CardTitle>
				</CardHeader>
			</Card>

			<div className="w-[50vw] flex flex-col gap-2"
			>
				<MonacoEditor
					language={task.language}
					value={code}
					onChange={setCode}
					height="60vh"
				/>
				<Button className="w-full" onClick={handleRun}>Запустить решение</Button>
			</div>


		</div>
	)
}

export { TaskPage }

