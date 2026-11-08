import type {
  CreateTaskDto,
  TaskResponseDto,
  UpdateTaskDto,
} from "@/generated/types"
import { api } from "@/src/shared/lib/api"

const getTasks = async () => {
  return api.get<TaskResponseDto[]>("tasks").then((res) => res.data)
}

const getTask = async (id: string) => {
  return api.get<TaskResponseDto>(`tasks/${id}`).then((res) => res.data)
}

const createTask = async (dto: CreateTaskDto) => {
  return api.post<TaskResponseDto>("tasks", dto).then((res) => res.data)
}

const createBulk = async (dtos: CreateTaskDto[]) => {
  return api.post<{ count: number }>("tasks/bulk", dtos).then((res) => res.data)
}

const updateTask = async (id: string, dto: UpdateTaskDto) => {
  return api.patch<TaskResponseDto>(`tasks/${id}`, dto).then((res) => res.data)
}

const deleteTask = async (id: string) => {
  return api.delete<TaskResponseDto>(`tasks/${id}`).then((res) => res.data)
}

const deleteBulk = async () => {
  return api.delete<{ count: number }>("tasks").then((res) => res.data)
}

export { createBulk, createTask, deleteBulk, deleteTask, getTask, getTasks, updateTask }

