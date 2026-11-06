import type {
  CreateTaskDto,
  TaskResponseDto,
  UpdateTaskDto,
} from "@/generated/types"
import { api } from "@/src/shared/lib/api"

const getTasks = () => {
  return api.get<TaskResponseDto[]>("tasks").then((res) => res.data)
}

const getTask = (id: string) => {
  return api.get<TaskResponseDto>(`tasks/${id}`).then((res) => res.data)
}

const createTask = (dto: CreateTaskDto) => {
  return api.post<TaskResponseDto>("tasks", dto).then((res) => res.data)
}

const updateTask = (id: string, dto: UpdateTaskDto) => {
  return api.patch<TaskResponseDto>(`tasks/${id}`, dto).then((res) => res.data)
}

const deleteTask = (id: string) => {
  return api.delete<TaskResponseDto>(`tasks/${id}`).then((res) => res.data)
}

export { createTask, deleteTask, getTask, getTasks, updateTask }
