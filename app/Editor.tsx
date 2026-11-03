'use client'

import Editor, { OnChange, OnMount } from '@monaco-editor/react'
import { useState } from 'react'
import { Button } from '../components/ui/button'

const MonacoEditor = () => {
	const [code, setCode] = useState('// some comment')
	const [isEditorReady, setIsEditorReady] = useState(false)

	const handleEditorChange: OnChange = (value) => {
		setCode(value ?? '')
	}

	const handleEditorDidMount: OnMount = () => {
		setIsEditorReady(true)
	}

	const handleRun = () => {
		console.log('Код для запуска:', code)
	}

	return (
		<div className="flex md:w-[50vw] flex-col gap-2">
			<div className="md:h-[70vh] overflow-hidden rounded-md">
				<Editor
					theme="vs-dark"
					defaultLanguage="javascript"
					defaultValue={code}
					onChange={handleEditorChange}
					onMount={handleEditorDidMount}
					loading={<div>Загрузка...</div>}
					height="100%"
					width="100%"
					options={{
						minimap: { enabled: false },
					}}
				/>
			</div>
			<Button onClick={handleRun} disabled={!isEditorReady}>
				{isEditorReady ? 'Запустить' : 'Загрузка...'}
			</Button>
		</div>
	)
}

export { MonacoEditor }

