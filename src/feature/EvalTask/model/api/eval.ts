import { EvalDto, EvalResponseDto } from "@/generated/types"
import { api } from "@/src/shared/lib/api"

const evalTask = async (dto: EvalDto) => {
  return api.post<EvalResponseDto>("eval", dto).then((res) => res.data)
}

export { evalTask }
