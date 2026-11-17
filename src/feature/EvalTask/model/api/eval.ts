import {
  EvalCollabDto,
  EvalCollabResponseDto,
  EvalDto,
  EvalResponseDto,
} from "@/generated/types"
import { api } from "@/src/shared/lib/api"

const evalTask = async (taskId: string, dto: EvalDto) => {
  return api
    .post<EvalResponseDto>(`eval/tasks/${taskId}`, dto)
    .then((res) => res.data)
}

const evalCollabTask = async (dto: EvalCollabDto) => {
  return api
    .post<EvalCollabResponseDto>("eval/collab", dto)
    .then((res) => res.data)
}

export { evalCollabTask, evalTask }
