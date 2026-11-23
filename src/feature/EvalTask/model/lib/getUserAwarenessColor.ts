import { AWARENESS_COLORS } from "../constants/const"

const getUserAwarenessColor = (userId: string | number): string => {
  const str = String(userId)
  let hash = 0

  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }

  const index = Math.abs(hash) % AWARENESS_COLORS.length
  return AWARENESS_COLORS[index]
}

export { getUserAwarenessColor }
