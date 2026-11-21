import { api } from "../core/api"
import { CustomAxiosRequestConfig } from "../types/CustomAxiosRequestConfig"

const loginAsGuest = async () => {
  return api
    .post("/auth/guest", undefined, {
      skipSuccessToast: true,
    } as CustomAxiosRequestConfig)
    .then((res) => res.data)
}

export { loginAsGuest }
