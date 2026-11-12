import type { CreateRoomDto, RoomResponseDto } from "@/generated/types"
import { api } from "@/src/shared/lib/api"

const createRoom = async (dto: CreateRoomDto) => {
  return api.post<RoomResponseDto>("rooms", dto).then((res) => res.data)
}

const getRoom = async (id: string) => {
  return api.get<RoomResponseDto>(`rooms/${id}`).then((res) => res.data)
}

export { createRoom, getRoom }
