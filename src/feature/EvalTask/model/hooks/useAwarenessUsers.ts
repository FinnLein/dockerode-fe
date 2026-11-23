import { useHocuspocusProvider } from "@hocuspocus/provider-react"
import { useEffect, useState } from "react"
import { useAuth } from "../../../Auth/model/useAuth"
import { getUserAwarenessColor } from "../lib/getUserAwarenessColor"
import { AwarenessUser } from "../types/awareness"

export const useAwarenessUsers = () => {
  const [users, setUsers] = useState<AwarenessUser[]>([])
  const { user } = useAuth()
  const provider = useHocuspocusProvider()

  useEffect(() => {
    if (!provider || !user) return

    const color = getUserAwarenessColor(user.id)

    provider.setAwarenessField("user", {
      id: user.id,
      name: user.name,
      avatarUrl: user.avatarUrl,
      color,
    })
  }, [provider, user?.id, user?.name, user?.avatarUrl])

  useEffect(() => {
    const awareness = provider?.awareness
    if (!awareness) return

    const handleAwarenessChange = () => {
      const states = Array.from(awareness.getStates().values())
      const uniqueUsers = new Map<string | number, AwarenessUser>()

      for (const state of states) {
        const participant = state.user as AwarenessUser | undefined
        if (participant?.id) {
          uniqueUsers.set(participant.id, participant)
        }
      }

      setUsers(Array.from(uniqueUsers.values()))
    }

    handleAwarenessChange()
    awareness.on("change", handleAwarenessChange)

    return () => {
      awareness.off("change", handleAwarenessChange)
    }
  }, [provider])

  return users
}
