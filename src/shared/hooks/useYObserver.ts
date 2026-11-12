import { useCallback, useSyncExternalStore } from "react"
import * as Y from "yjs"

const noopUnsubscribe = () => {}

const useYObserver = <T>(
  ymeta: Y.Map<T> | null,
  key: string,
  defaultValue: T
) => {
  const subscribe = useCallback(
    (onChange: () => void) => {
      if (!ymeta) return noopUnsubscribe
      ymeta.observe(onChange)

      return () => ymeta?.unobserve(onChange)
    },
    [ymeta]
  )

  const getSnapshot = () => ymeta?.get(key) ?? defaultValue

  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
}

export { useYObserver }
