import type { AuthorizeDto } from "@/generated/types"
import { api } from "@/src/shared/lib/api"

const register = async (dto: AuthorizeDto) => {
  return api.post<void>("auth/register", dto).then((res) => res.data)
}

const login = async (dto: AuthorizeDto) => {
  return api.post<void>("auth/login", dto).then((res) => res.data)
}

const logout = async (): Promise<{ message: string }> => {
  return api.post<{ message: string }>("auth/logout").then((res) => res.data)
}

export { login, logout, register }
