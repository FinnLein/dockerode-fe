'use client'

import { Home, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { Button } from '@/src/shared/components/ui/button'
import { Text } from '@/src/shared/components/ui/text'

const Header = () => {
	const { resolvedTheme, setTheme } = useTheme()
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
			<div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">

				<Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
					<div className="bg-primary/10 p-2 rounded-lg text-primary">
						<Home className="h-5 w-5" />
					</div>
					<Text as="span" className="font-bold text-lg hidden sm:inline-block">
						Dockerode Tasks
					</Text>
				</Link>

				<div className="flex items-center gap-2">
					{mounted && (
						<Button
							variant="ghost"
							size="icon"
							onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
							title="Переключить тему (хоткей: D)"
						>
							{resolvedTheme === 'dark' ? (
								<Sun className="h-5 w-5" />
							) : (
								<Moon className="h-5 w-5" />
							)}
							<span className="sr-only">Переключить тему</span>
						</Button>
					)}
				</div>

			</div>
		</header>
	)
}

export { Header }

