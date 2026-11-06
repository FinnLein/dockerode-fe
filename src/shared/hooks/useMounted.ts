import { useSyncExternalStore } from "react"

const subscribe = () => () => {}

const useMounted = () => {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  )
}

export { useMounted }
