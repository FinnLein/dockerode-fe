import { useCreateRoom } from "@/src/entities/rooms/model/hooks/useCreateRoom"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

export const useCollabRoom = (
  taskId: string,
  getCurrentCode: () => string,
  onLeave?: () => void
) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const { mutateAsync, isPending: isCreatingRoom } = useCreateRoom()

  const roomId = searchParams.get("roomId")

  const createRoom = async () => {
    try {
      const room = await mutateAsync({
        taskId,
        initialCode: getCurrentCode(),
      })

      const params = new URLSearchParams(searchParams.toString())
      params.set("roomId", room.id)
      router.push(`${pathname}?${params.toString()}`)
    } catch (error) {
      console.error("Ошибка при создании комнаты:", error)
    }
  }

  const leaveRoom = () => {
    onLeave?.()

    const params = new URLSearchParams(searchParams.toString())
    params.delete("roomId")
    router.push(`${pathname}?${params.toString()}`)
  }

  const shareRoom = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)

      alert("Ссылка скопирована в буфер обмена!")
    } catch (err) {
      console.error("Не удалось скопировать ссылку", err)
    }
  }

  return {
    roomId,
    createRoom,
    leaveRoom,
    shareRoom,
    isCreatingRoom,
  }
}
