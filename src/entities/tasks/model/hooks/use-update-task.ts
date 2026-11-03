import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateTask } from '../../api/tasks'


const useUpdateTask = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: ({
			id,
			dto,
		}: {
			id: string
			dto: Parameters<typeof updateTask>[1]
		}) => updateTask(id, dto),
		onSuccess: (_, { id }) => {
			queryClient.invalidateQueries({ queryKey: ['tasks'] })
			queryClient.invalidateQueries({ queryKey: ['tasks', id] })
		},
	})
}

export { useUpdateTask }
