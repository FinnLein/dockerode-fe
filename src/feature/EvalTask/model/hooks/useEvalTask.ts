import { useMutation } from '@tanstack/react-query'
import { evalTask } from '../api/eval'

const useEvalTask = () => {
	return useMutation({
		mutationKey: ['eval-task'],
		mutationFn: (dto: Parameters<typeof evalTask>[0]) => evalTask(dto),
	})
}

export { useEvalTask }

