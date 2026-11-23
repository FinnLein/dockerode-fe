import { RefObject, useEffect, useState } from "react"

const VISIBLE_THRESHOLD = 0.3

const useVisibleAvatarsCount = (
  containerRef: RefObject<HTMLElement | null>,
  totalUsers: number
) => {
  const [counts, setCounts] = useState({ left: 0, right: 0 })

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const update = () => {
      const { left, right } = container.getBoundingClientRect()
      let l = 0
      let r = 0

      for (const el of container.querySelectorAll<HTMLElement>(
        "[data-user-id]"
      )) {
        const rect = el.getBoundingClientRect()
        const margin = rect.width * VISIBLE_THRESHOLD

        if (rect.left + margin > right) r++
        else if (rect.right - margin < left) l++
      }

      setCounts((prev) =>
        prev.left === l && prev.right === r ? prev : { left: l, right: r }
      )
    }

    update()
    container.addEventListener("scroll", update, { passive: true })
    const ro = new ResizeObserver(update)
    ro.observe(container)

    return () => {
      container.removeEventListener("scroll", update)
      ro.disconnect()
    }
  }, [containerRef, totalUsers])

  return { hiddenLeftCount: counts.left, hiddenRightCount: counts.right }
}

export { useVisibleAvatarsCount }
