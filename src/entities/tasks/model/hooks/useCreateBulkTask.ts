import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createBulk } from "../../api/tasks"

const useCreateBulkTask = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (dtos: Parameters<typeof createBulk>[0]) => createBulk(dtos),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] })
    },
  })
}

export { useCreateBulkTask }
