'use client'

import { TestCaseDto } from '@/generated/types'
import { Button } from '@/src/shared/components/ui/button'
import { MonacoEditor } from '@/src/shared/components/ui/monaco-editor'
import { useEffect, useState } from 'react'

interface EvalTaskProps {
	language: string
	initialCode: string
	testCases: TestCaseDto[]
	onRun: (dto: { code: string; language: string; testCases: TestCaseDto[] }) => void
	isPending: boolean
}

const EvalTask = ({ language, initialCode, testCases, onRun, isPending }: EvalTaskProps) => {
	const [code, setCode] = useState(initialCode)

	useEffect(() => {
		setCode(initialCode)
	}, [initialCode])

	return (
		<div className="flex flex-col gap-2 w-full">
			<MonacoEditor
				language={language}
				value={code}
				onChange={setCode}
				height="60vh"
			/>
			<Button 
				disabled={isPending} 
				className="w-full" 
				onClick={() => onRun({ code, language, testCases })}
			>
				{isPending ? 'Загрузка...' : 'Запустить решение'}
			</Button>
		</div>
	)
}

export { EvalTask }
