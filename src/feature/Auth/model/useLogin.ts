import { useMutation, useQueryClient } from "@tanstack/react-query"
import { login } from "../api/auth"

const useLogin = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (dto: Parameters<typeof login>[0]) => login(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] })
    },
  })
}

export { useLogin }
