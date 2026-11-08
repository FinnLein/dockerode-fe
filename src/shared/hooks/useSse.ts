"use client"

import { useEffect, useRef, useState } from "react"

interface UseSseArgs<T> {
  url: string | null
  parse?: (raw: string) => T
}

interface SseState<T> {
  isConnected: boolean
  messages: T[]
  url: string | null
}

type UseSseResult<T> = Omit<SseState<T>, "url">

const empty = <T>(url: string | null): SseState<T> => ({
  url,
  messages: [],
  isConnected: false,
})

const useSse = <T = string>(args: UseSseArgs<T>): UseSseResult<T> => {
  const { url, parse } = args

  const [state, setState] = useState<SseState<T>>(() => empty<T>(null))

  const parseRef = useRef(parse)
  useEffect(() => {
    parseRef.current = parse
  })

  useEffect(() => {
    if (!url) return

    const base = (prev: SseState<T>) =>
      prev.url === url ? prev : empty<T>(url)

    const eventSource = new EventSource(url)

    eventSource.onopen = () =>
      setState((prev) => ({ ...base(prev), isConnected: true }))

    eventSource.onmessage = (event) => {
      const fn = parseRef.current
      const value = fn ? fn(event.data) : (event.data as unknown as T)
      setState((prev) => {
        const b = base(prev)
        return { ...b, messages: [...b.messages, value] }
      })
    }

    eventSource.addEventListener("done", () => {
      eventSource.close()
      setState((prev) => ({ ...base(prev), isConnected: false }))
    })

    eventSource.addEventListener("ping", (event) => {
      console.log("Ping received:", JSON.parse(event.data))
    })

    eventSource.onerror = (err) => {
      console.error("SSE Error:", err)
      setState((prev) => ({ ...base(prev), isConnected: false }))

      eventSource.close()
    }

    return () => {
      eventSource.close()
    }
  }, [url])

  return state.url === url
    ? { messages: state.messages, isConnected: state.isConnected }
    : { messages: [] as T[], isConnected: false }
}

export { useSse }
