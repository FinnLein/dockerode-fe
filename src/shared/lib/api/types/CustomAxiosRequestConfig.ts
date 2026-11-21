import { InternalAxiosRequestConfig } from "axios"

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean
  skipSuccessToast?: boolean
}

export type { CustomAxiosRequestConfig }
