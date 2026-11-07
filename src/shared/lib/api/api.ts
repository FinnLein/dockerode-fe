import { create } from "axios"

const baseURL = process.env.NEXT_PUBLIC_API_URL

const api = create({
  baseURL,
  withCredentials: true,
})

export { api }
