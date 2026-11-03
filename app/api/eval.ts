import { EvalDto } from '@/generated/types'
import { api } from '@/src/shared/lib/api/api'

const evalCode = (dto: EvalDto) => {
	return api.post('eval', dto)
}

export { evalCode }

