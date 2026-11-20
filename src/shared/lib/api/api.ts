import axios, { AxiosError, InternalAxiosRequestConfig } from "axios"
import { toast } from "../../components/ui/toast"
import { handleApiError } from "../errors/handleApiError"

const baseURL = process.env.NEXT_PUBLIC_API_URL

export interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean
  skipSuccessToast?: boolean
}

const api = axios.create({
  baseURL,
  withCredentials: true,
})

let onGuestAuthSuccess: (() => void) | null = null

export const setGuestAuthSuccessHandler = (handler: () => void) => {
  onGuestAuthSuccess = handler
}

let guestAuthPromise: Promise<void> | null = null

const createGuestSession = async () => {
  if (!guestAuthPromise) {
    guestAuthPromise = api
      .post("/auth/guest", undefined, {
        skipSuccessToast: true,
      } as CustomAxiosRequestConfig)
      .then(() => {
        onGuestAuthSuccess?.()
      })
      .finally(() => {
        guestAuthPromise = null
      })
  }
  return guestAuthPromise
}

const shouldCreateGuestForRequest = (
  config?: CustomAxiosRequestConfig
): boolean => {
  if (!config?.url) return false

  const cleanUrl = config.url.split("?")[0].replace(/^\/+/, "")
  const method = config.method?.toLowerCase()

  if (method !== "post") return false

  return (
    cleanUrl === "rooms" ||
    cleanUrl === "eval/collab" ||
    cleanUrl.startsWith("eval/tasks/")
  )
}

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
