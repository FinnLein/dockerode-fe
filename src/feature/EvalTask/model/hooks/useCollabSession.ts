import { createCollabProvider } from "@/src/shared/lib/collab/createCollabProvider"
import { useCallback, useSyncExternalStore } from "react"
import { Awareness } from "y-protocols/awareness"
import * as Y from "yjs"

export interface Session {
  ytext: Y.Text
  ymeta: Y.Map<string>
  awareness: Awareness
}

interface Entry {
  session: Session
  refs: number
  destroy: () => void
}

const entries = new Map<string, Entry>()

const acquire = (roomId: string) => {
  let entry = entries.get(roomId)

  if (!entry) {
    const ydoc = new Y.Doc()
    const provider = createCollabProvider({ roomId, ydoc })

    entry = {
      session: {
        ytext: ydoc.getText("code"),
        ymeta: ydoc.getMap("meta"),
        awareness: provider.awareness,
      },
      refs: 0,
      destroy: () => {
        provider.destroy()
        ydoc.destroy()
      },
    }

    entries.set(roomId, entry)
  }

  entry.refs++
}

const release = (roomId: string) => {
  const entry = entries.get(roomId)

  if (entry && --entry.refs === 0) {
    entries.delete(roomId)
    entry.destroy()
  }
}

export const useCollabSession = (roomId: string | null) => {
  const subscribe = useCallback(
    (onChange: () => void) => {
      if (!roomId) return () => {}

      acquire(roomId)
      onChange()

      return () => release(roomId)
    },
    [roomId]
  )

  const getSnapshot = () =>
    roomId ? (entries.get(roomId)?.session ?? null) : null

  return useSyncExternalStore(subscribe, getSnapshot, () => null)
}
