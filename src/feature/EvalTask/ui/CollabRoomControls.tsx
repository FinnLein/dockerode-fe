import { Button } from "@/src/shared/components/ui/button"
import { Share, SquareArrowRightExit } from 'lucide-react'

interface CollabRoomControlsProps {
  roomId: string | null
  isPending: boolean
  onCreate: () => void
  onLeave: () => void
  onShare: () => void
}

export const CollabRoomControls = ({
  roomId,
  isPending,
  onCreate,
  onLeave,
  onShare,
}: CollabRoomControlsProps) => {
  if (!roomId) {
    return (
      <Button
        type='button'
        variant={'secondary'}
        onClick={onCreate}
        disabled={isPending}
      >
        {isPending ? 'Создание комнаты...' : 'Совместное редактирование'}
      </Button>
    )
  }

  return (
    <div className="flex gap-2">
      <Button
        leftIcon={<Share />}
        type='button'
        variant={'outline'}
        onClick={onShare}
        className="flex-1"
      >
        Поделиться
      </Button>
      <Button
        leftIcon={<SquareArrowRightExit />}
        type='button'
        variant={'destructive'}
        onClick={onLeave}
        className="flex-1"
      >
        Выйти
      </Button>
    </div>
  )
}