import { InitialCodeResponseDto } from "@/generated/types"
import { Language } from "./tasks"

interface EditTaskFormValues {
  title: string
  description: string
  language: Language[]
  initialCode: InitialCodeResponseDto[]
  testCases: string
}

export type { EditTaskFormValues }
