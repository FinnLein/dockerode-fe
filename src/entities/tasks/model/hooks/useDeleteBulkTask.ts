import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteBulk } from "../../api/tasks"

const useDeleteBulkTask = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => deleteBulk(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] })
    },
  })
}

export { useDeleteBulkTask }
