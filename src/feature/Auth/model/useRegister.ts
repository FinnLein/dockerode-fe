import { useMutation, useQueryClient } from "@tanstack/react-query"
import { register } from "../api/auth"

const useRegister = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (dto: Parameters<typeof register>[0]) => register(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] })
    },
  })
}

export { useRegister }
