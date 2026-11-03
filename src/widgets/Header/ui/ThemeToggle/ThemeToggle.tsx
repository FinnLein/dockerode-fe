'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

import { Button } from '@/src/shared/components/ui/button'
import { Text } from '@/src/shared/components/ui/text'

const ThemeToggle = () => {
	const { resolvedTheme, setTheme } = useTheme()
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) {
		return <Button size="icon" variant="ghost" disabled aria-hidden />
	}

	return (
		<Button
			size="xl"
			variant="ghost"
			onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
			title="Переключить тему (хоткей: D)"
		>
			{resolvedTheme === 'dark' ? <Sun /> : <Moon />}
			<Text as="span" className="sr-only">
				Переключить тему
			</Text>
		</Button>
	)
}

export { ThemeToggle }

