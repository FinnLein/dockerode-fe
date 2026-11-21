import { useMutation, useQueryClient } from "@tanstack/react-query"
import { loginAsGuest } from "./loginAsGuest"

const useGuestLogin = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: loginAsGuest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] })
    },
  })
}

export { useGuestLogin }
