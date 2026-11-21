import { toast } from "@/src/shared/components/ui/toast"
import axios, { AxiosError } from "axios"
import { handleApiError } from "../../errors/handleApiError"
import { CustomAxiosRequestConfig } from "../types/CustomAxiosRequestConfig"
import { createGuestSession } from "../utils/createGuestSession"
import { shouldCreateGuestForRequest } from "../utils/shouldCreateGuestForRequest"

const baseURL = process.env.NEXT_PUBLIC_API_URL

const api = axios.create({
  baseURL,
  withCredentials: true,
})

api.interceptors.response.use(
  (response) => {
    const config = response.config as CustomAxiosRequestConfig
    const data = response.data

    if (
      !config.skipSuccessToast &&
      data &&
      typeof data === "object" &&
      "message" in data &&
      typeof data.message === "string" &&
      data.message.trim().length > 0
    ) {
      toast.add({
        type: "success",
        description: data.message,
      })
    }

    return response
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig | undefined

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      shouldCreateGuestForRequest(originalRequest)
    ) {
      originalRequest._retry = true

      try {
        await createGuestSession()

        return api(originalRequest)
      } catch (guestError) {
        handleApiError(guestError)
        return Promise.reject(guestError)
      }
    }

    handleApiError(error)
    return Promise.reject(error)
  }
)

export { api }
