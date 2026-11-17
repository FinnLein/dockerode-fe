import { useSse } from "@/src/shared/hooks/sse/useSse"
import { useMutation } from "@tanstack/react-query"
import { useMemo, useState } from "react"
import { evalTask } from "../api/eval"
import { EvalStreamEvent } from "../types/EvalStreamResult"

type EvalTaskDto = Parameters<typeof evalTask>[1]

const parseEvent = (raw: string): EvalStreamEvent => JSON.parse(raw)

const useEvalTaskStream = () => {
  const [jobId, setJobId] = useState<string | null>(null)

  const mutation = useMutation({
    mutationFn: ({ taskId, dto }: { taskId: string; dto: EvalTaskDto }) =>
      evalTask(taskId, dto),
    onMutate: () => setJobId(null),
    onSuccess: (data) => setJobId(data.jobId),
  })

  const url = jobId
    ? `${process.env.NEXT_PUBLIC_API_URL}/eval/${jobId}/stream`
    : null

  const { messages } = useSse<EvalStreamEvent>({
    url,
    parse: parseEvent,
  })

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

export { useEvalTaskStream }
