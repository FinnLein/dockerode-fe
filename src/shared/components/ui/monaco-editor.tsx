'use client'

import Editor, { OnChange, OnMount } from '@monaco-editor/react'
import { useState } from 'react'

interface MonacoEditorProps {
	language: string
	value: string
	onChange: (value: string) => void
	height?: string | number
	readOnly?: boolean
	className?: string
}

const MonacoEditor = ({
	language,
	value,
	onChange,
	height = '400px',
	readOnly = false,
	className,
}: MonacoEditorProps) => {
	const [isEditorReady, setIsEditorReady] = useState(false)

	const handleEditorChange: OnChange = (newValue) => {
		onChange(newValue ?? '')
	}

	const handleEditorDidMount: OnMount = () => {
		setIsEditorReady(true)
	}

	return (
		<div className={className}>
			<div className="overflow-hidden rounded-md border relative">
				{!isEditorReady && (
					<div className="absolute inset-0 flex items-center justify-center bg-background/50 z-10">
						Загрузка редактора...
					</div>
				)}
				<Editor
					theme="vs-dark"
					defaultLanguage={language}
					value={value}
					onChange={handleEditorChange}
					onMount={handleEditorDidMount}
					loading={<div />} 
					height={height}
					width="100%"
					options={{
						minimap: { enabled: false },
						readOnly,
						fontSize: 14,
						scrollBeyondLastLine: false,
						automaticLayout: true,
					}}
				/>
			</div>
		</div>
	)
}

export { MonacoEditor }
