import { useSse } from "@/src/shared/hooks/useSse"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { evalTask } from "../api/eval"

type EvalTaskDto = Parameters<typeof evalTask>[0]

export interface EvalStreamResult {
  success: boolean
  passed: number
  failed: number
  total: number
  results: Array<{
    index: number
    passed: boolean
    actual: string
    expected: string
    error?: string
  }>
  stderr: string
  statusCode: number
  outputExceeded: boolean
  timedOut: boolean
}

const useEvalTaskStream = () => {
  const [jobId, setJobId] = useState<string | null>(null)

  const mutation = useMutation({
    mutationFn: (dto: EvalTaskDto) => evalTask(dto),
    onMutate: () => setJobId(null),
    onSuccess: (data) => setJobId(data.jobId),
  })

  const url = jobId
    ? `${process.env.NEXT_PUBLIC_API_URL}/eval/${jobId}/stream`
    : null

  const { messages: rawMessages, isConnected } = useSse<EvalStreamResult>({
    url,
    parse: (raw) => {
      try {
        const parsed = JSON.parse(raw)

        if (Array.isArray(parsed)) return parsed[0]
        return parsed
      } catch (e) {
        console.error("Ошибка парсинга SSE:", e)
        return {} as EvalStreamResult
      }
    },
  })

  const messages = rawMessages.flatMap((msg) => {
    if (!msg.results) return []
    return msg.results.map((r) => ({
      success: r.passed,
      stderr: r.error,
    }))
  })

  return { mutation, messages, isConnected }
}

export { useEvalTaskStream }
