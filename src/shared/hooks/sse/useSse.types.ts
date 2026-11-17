interface UseSseArgs<T> {
  url: string | null
  parse?: (raw: string) => T
  closeOnFinish?: boolean
}

interface SseState<T> {
  isConnected: boolean
  messages: T[]
  url: string | null
}

type UseSseResult<T> = Omit<SseState<T>, "url">

export type { SseState, UseSseArgs, UseSseResult }
