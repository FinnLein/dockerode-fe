import { useSse } from "@/src/shared/hooks/sse/useSse"
import { useMutation } from "@tanstack/react-query"
import { useMemo } from "react"
import { evalCollabTask } from "../api/eval"
import { EvalStreamEvent } from "../types/EvalStreamResult"

const parseEvent = (raw: string): EvalStreamEvent => JSON.parse(raw)

export const useEvalCollabTaskStream = (roomId: string | null) => {
  const mutation = useMutation({ mutationFn: evalCollabTask })

  const url = roomId
    ? `${process.env.NEXT_PUBLIC_API_URL}/eval/collab/rooms/${roomId}/stream`
    : null

  const { messages } = useSse<EvalStreamEvent>({ url, parse: parseEvent })

  const lastEvent = messages[messages.length - 1]
  const lastFinished = [...messages]
    .reverse()
    .find((m) => m.type === "run_finished")

  const isRunning = lastEvent?.type === "run_started"
  const error =
    lastEvent?.type === "run_failed"
      ? lastEvent.error || "Неизвестная ошибка"
      : mutation.error?.message || null

  const results = useMemo(
    () =>
      lastFinished?.result?.results.map((r) => ({
        success: r.passed,
        stderr: r.error,
        actual: r.actual,
        expected: r.expected,
      })) ?? [],
    [lastFinished]
  )

  return { mutation, isRunning, results, error }
}
