import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createRoom } from "../../api/rooms"

const useCreateRoom = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (dto: Parameters<typeof createRoom>[0]) => createRoom(dto),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["rooms"] })
      queryClient.invalidateQueries({ queryKey: ["room", data.id] })
    },
  })
}

export { useCreateRoom }
