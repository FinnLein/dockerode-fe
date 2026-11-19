import axios from "axios"
import { handleApiError } from "../errors/handleApiError"

const baseURL = process.env.NEXT_PUBLIC_API_URL

const api = axios.create({
  baseURL,
  withCredentials: true,
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    handleApiError(error)
    return Promise.reject(error)
  }
)

export { api }
