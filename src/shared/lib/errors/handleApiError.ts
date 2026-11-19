import { isAxiosError } from "axios"
import { toast } from "../../components/ui/toast"

const handleApiError = (
  error: unknown,
  fallbackMessage = "Произошла ошибка при запросе"
) => {
  let description = fallbackMessage

  if (isAxiosError(error)) {
    const data = error.response?.data

    if (typeof data === "string" && data.trim().length > 0) {
      description = data
    } else if (data && typeof data === "object") {
      const rawMessage = data.message ?? data.error ?? data.detail

      if (Array.isArray(rawMessage)) {
        description = rawMessage.join(", ")
      } else if (typeof rawMessage === "string") {
        description = rawMessage
      }
    } else if (error.message) {
      description = error.message
    }
  } else if (error instanceof Error) {
    description = error.message
  }

  toast.add({
    type: "error",
    description,
  })
}

export { handleApiError }
