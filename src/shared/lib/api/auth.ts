import { api, CustomAxiosRequestConfig } from "./api"

const loginAsGuest = async () => {
  return api
    .post("/auth/guest", undefined, {
      skipSuccessToast: true,
    } as CustomAxiosRequestConfig)
    .then((res) => res.data)
}

export { loginAsGuest }
