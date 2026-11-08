import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteTask } from "../../api/tasks"

const useDeleteTask = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] })
    },
  })
}

export { useDeleteTask }
