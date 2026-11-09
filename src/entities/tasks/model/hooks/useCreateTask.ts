import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createTask } from "../../api/tasks"

const useCreateTask = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (dto: Parameters<typeof createTask>[0]) => createTask(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] })
    },
  })
}

export { useCreateTask }
