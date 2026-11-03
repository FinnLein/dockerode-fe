'use client'

import { useEffect, useState } from 'react'

interface UseSseArgs<T> {
	url: string | null
	parse?: (raw: string) => T
}

const useSse = <T = string>(args: UseSseArgs<T>) => {
	const { url, parse } = args

	const [messages, setMessages] = useState<T[]>([])
	const [isConnected, setIsConnected] = useState(false)

	useEffect(() => {
		if (!url) return

		setMessages([])
		setIsConnected(false)

		const eventSource = new EventSource(url)

		eventSource.onopen = () => setIsConnected(true)

		eventSource.onmessage = (event) => {
			const value = parse ? parse(event.data) : (event.data as unknown as T)
			setMessages(prev => [...prev, value])
		}

		eventSource.addEventListener('ping', (event) => {
			console.log('Ping received:', JSON.parse(event.data));
		})

		eventSource.onerror = (err) => {
			console.error('SSE Error:', err);
			setIsConnected(false)
		};

		return () => {
			eventSource.close()
		}
	}, [url])

	return { messages, isConnected }
}

export { useSse }

