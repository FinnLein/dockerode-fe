import { Code } from "@/src/entities/tasks/model/types/tasks"

const key = (taskId: string) => `code_${taskId}`

const readSavedCode = (taskId: string): Code[] | null => {
  try {
    const raw = localStorage.getItem(key(taskId))
    return parseSavedCode(raw)
  } catch {
    return null
  }
}

const parseSavedCode = (raw: string | null): Code[] | null => {
  try {
    if (!raw) return null

    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : null
  } catch {
    return null
  }
}

const upsertSavedCode = (taskId: string, entry: Code) => {
  try {
    const list = readSavedCode(taskId) ?? []
    const next = [...list.filter((i) => i.language !== entry.language), entry]
    localStorage.setItem(key(taskId), JSON.stringify(next))
  } catch (e) {
    console.error("Не удалось сохранить код", e)
  }
}

export { parseSavedCode, readSavedCode, upsertSavedCode }
