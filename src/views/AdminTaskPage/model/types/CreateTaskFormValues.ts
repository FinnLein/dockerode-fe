import { InitialCodeResponseDto } from "@/generated/types"
import { Language } from "@/src/entities/tasks/model/types/tasks"

interface CreateTaskFormValues {
  title: string
  language: Language[]
  initialCode: InitialCodeResponseDto[]
  testCases: string
  description: string
}

export type { CreateTaskFormValues }
