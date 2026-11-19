import { useCreateRoom } from "@/src/entities/rooms/model/hooks/useCreateRoom"
import { Language } from "@/src/entities/tasks/model/types/tasks"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

const useCollabRoom = (
  taskId: string,
  getCurrentCode: () => string,
  currentLang: Language
) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const { mutateAsync, isPending: isCreatingRoom } = useCreateRoom()

  const createRoom = async () => {
    try {
      const room = await mutateAsync({
        taskId,
        initialCode: getCurrentCode(),
        language: currentLang,
      })
      const params = new URLSearchParams(searchParams.toString())
      params.set("roomId", room.id)
      router.push(`${pathname}?${params.toString()}`)
    } catch (error) {
      console.error("Ошибка при создании комнаты:", error)
    }
  }

  return { createRoom, isCreatingRoom }
}

export { useCollabRoom }
