"use client"

import { Card } from "@/src/shared/components/ui/card"
import { Text } from "@/src/shared/components/ui/text"
import Image from "next/image"
import { useRef } from "react"
import { MOCK_USERS, USE_MOCK_USERS } from "../model/constants/mock"
import { useAwarenessUsers } from "../model/hooks/useAwarenessUsers"
import { useVisibleAvatarsCount } from "../model/hooks/useVisibleAvatarsCount"

const AwarenessBar = () => {
  const users = useAwarenessUsers()
  const containerRef = useRef<HTMLDivElement>(null)
  const displayUsers = USE_MOCK_USERS ? [...users, ...MOCK_USERS] : users

  const { hiddenLeftCount, hiddenRightCount } = useVisibleAvatarsCount(
    containerRef,
    displayUsers.length
  )

  if (displayUsers.length === 0) return null

  const hiddenLeftTitle = displayUsers
    .slice(0, hiddenLeftCount)
    .map((u) => u.name ?? "Участник")
    .join(", ")

  const hiddenRightTitle = displayUsers
    .slice(displayUsers.length - hiddenRightCount)
    .map((u) => u.name ?? "Участник")
    .join(", ")

  const handleScrollToStart = () => {
    containerRef.current?.scrollTo({
      left: 0,
      behavior: "smooth",
    })
  }

  const handleScrollToEnd = () => {
    const container = containerRef.current
    if (!container) return
    container.scrollTo({
      left: container.scrollWidth,
      behavior: "smooth",
    })
  }

  return (
    <Card
      onWheel={(e) => {
        if (e.deltaY !== 0) {
          e.currentTarget.scrollLeft += e.deltaY
        }
      }}
      ref={containerRef}
      className="relative flex w-full min-w-0 scrollbar-none flex-row items-center gap-2 overflow-x-auto px-3 py-2 md:gap-4"
    >
      {hiddenLeftCount > 0 && (
        <button
          type="button"
          onClick={handleScrollToStart}
          title={hiddenLeftTitle}
          className="sticky left-0 z-10 flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full border-2 border-border bg-card text-xs font-medium text-muted-foreground shadow-sm ring-2 ring-background transition-colors hover:bg-muted"
        >
          <Text as="span">+{hiddenLeftCount}</Text>
        </button>
      )}

      {displayUsers.map((participant) => (
        <div
          data-user-id={participant.id}
          key={participant.id}
          title={participant.name}
          style={{
            borderColor: participant.color ?? "transparent",
          }}
          className="relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 bg-muted text-xs font-medium ring-2 ring-background"
        >
          {participant.avatarUrl ? (
            <Image
              src={participant.avatarUrl}
              alt={participant.name ?? "User avatar"}
              width={32}
              height={32}
              unoptimized
              className="h-full w-full object-cover"
            />
          ) : (
            <Text as="span">{participant.name?.[0]?.toUpperCase() ?? "?"}</Text>
          )}
        </div>
      ))}

      {hiddenRightCount > 0 && (
        <button
          type="button"
          onClick={handleScrollToEnd}
          title={hiddenRightTitle}
          className="sticky right-0 z-10 flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full border-2 border-border bg-card text-xs font-medium text-muted-foreground shadow-sm ring-2 ring-background transition-colors hover:bg-muted"
        >
          <Text as="span">+{hiddenRightCount}</Text>
        </button>
      )}
    </Card>
  )
}

export { AwarenessBar }
