interface EvalStreamResult {
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

interface EvalStreamError {
  error: string
}

interface EvalStreamEvent {
  type: "run_started" | "run_finished" | "run_failed"
  jobId?: string
  result?: EvalStreamResult
  error?: string
}

export type { EvalStreamError, EvalStreamEvent, EvalStreamResult }
