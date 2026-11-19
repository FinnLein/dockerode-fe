interface CollabRoomControlsProps {
  roomId: string | null
  isPending: boolean
  onCreate: () => void
  onLeave: () => void
  onShare: () => void
}

export type { CollabRoomControlsProps }
