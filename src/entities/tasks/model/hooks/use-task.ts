import { useQuery } from '@tanstack/react-query'
import { getTask } from '../../api/tasks'

const useTask = (id: string) => {
	return useQuery({
		queryKey: ['tasks', id],
		queryFn: () => getTask(id),
		enabled: !!id,
	})
}

export { useTask }

