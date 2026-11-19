import { usePathname, useRouter, useSearchParams } from "next/navigation"

const useLeaveRoom = (onLeave?: () => void) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  return () => {
    onLeave?.()
    const params = new URLSearchParams(searchParams.toString())
    params.delete("roomId")
    router.push(`${pathname}?${params.toString()}`)
  }
}

export { useLeaveRoom }
