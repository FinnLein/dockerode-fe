"use client"

import { useEffect, useRef, useState } from "react"
import { SseState, UseSseArgs, UseSseResult } from "./useSse.types"

const empty = <T>(url: string | null): SseState<T> => ({
  url,
  messages: [],
  isConnected: false,
})

const useSse = <T = string>(args: UseSseArgs<T>): UseSseResult<T> => {
  const { url, parse, closeOnFinish = false } = args

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

    eventSource.onopen = () => {
      setState((prev) => ({ ...base(prev), isConnected: true }))
    }

    eventSource.onmessage = (event) => {
      const fn = parseRef.current
      const value = fn ? fn(event.data) : (event.data as unknown as T)
      setState((prev) => {
        const b = base(prev)
        return { ...b, messages: [...b.messages, value] }
      })

      const type = (value as { type?: string } | null)?.type
      const isFinished = type === "run_finished"
      const isFailed = type === "run_failed"

      if (closeOnFinish && (isFinished || isFailed)) {
        eventSource.close()
        setState((prev) => ({ ...base(prev), isConnected: false }))
      }
    }

    eventSource.addEventListener("ping", (event) => {
      JSON.parse(event.data)
    })

    eventSource.onerror = (err) => {
      console.error("❌ SSE Error:", err)
    }

    return () => {
      eventSource.close()
    }
  }, [url, closeOnFinish])

  const isMatching = state.url === url

  return isMatching
    ? { messages: state.messages, isConnected: state.isConnected }
    : { messages: [] as T[], isConnected: false }
}

export { useSse }
