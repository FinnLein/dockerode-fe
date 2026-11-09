"use client"

import { getProfile } from "@/src/entities/users/api/users"
import { useQuery } from "@tanstack/react-query"
import { isAxiosError } from "axios"

const useAuth = () => {
  const { data: user, isLoading } = useQuery({
    queryKey: ["auth", "me"],
    queryFn: async () => {
      try {
        return await getProfile()
      } catch (error) {
        if (isAxiosError(error) && error.response?.status === 401) {
          return null
        }
        throw error
      }
    },
    staleTime: 60_000,
    retry: false,
  })

  return {
    user,
    isLoading,
    isAuth: !!user,
    isAdmin: user?.role === "admin",
  }
}

export { useAuth }
