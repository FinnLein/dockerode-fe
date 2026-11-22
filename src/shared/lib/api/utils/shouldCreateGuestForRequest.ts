import { CustomAxiosRequestConfig } from "../types/CustomAxiosRequestConfig"

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

export { shouldCreateGuestForRequest }
