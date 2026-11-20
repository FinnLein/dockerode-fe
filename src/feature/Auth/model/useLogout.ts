import { useMutation, useQueryClient } from "@tanstack/react-query"
import { logout } from "../api/auth"

const useLogout = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] })
    },
  })
}

export { useLogout }
