import { UserResponseDto } from "@/generated/types"
import { api } from "@/src/shared/lib/api"

const getProfile = async () => {
  return api.get<UserResponseDto>("users/profile").then((res) => res.data)
}

export { getProfile }
