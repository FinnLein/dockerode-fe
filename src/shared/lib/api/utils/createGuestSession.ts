import { api } from "../core/api"
import { CustomAxiosRequestConfig } from "../types/CustomAxiosRequestConfig"

let onGuestAuthSuccess: (() => void) | null = null

const setGuestAuthSuccessHandler = (handler: () => void) => {
  onGuestAuthSuccess = handler
}

let guestAuthPromise: Promise<void> | null = null

const createGuestSession = async (name?: string) => {
  if (!guestAuthPromise) {
    guestAuthPromise = api
      .post("/auth/guest", name ? { name } : undefined, {
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

export { createGuestSession, setGuestAuthSuccessHandler }
