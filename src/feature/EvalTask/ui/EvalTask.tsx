"use client"

import { HocuspocusRoom } from "@hocuspocus/provider-react"
import { useSearchParams } from "next/navigation"
import { EvalTaskProps } from "../model/types/EvalTaskProps"
import { EvalTaskCollab } from "./EvalTaskCollab"
import { EvalTaskLocal } from "./EvalTaskLocal"

const EvalTask = (props: EvalTaskProps) => {
  const searchParams = useSearchParams()
  const roomId = searchParams.get("roomId")

  if (!roomId) {
    return <EvalTaskLocal {...props} />
  }

  return (
    <HocuspocusRoom name={roomId}>
      <EvalTaskCollab roomId={roomId} {...props} />
    </HocuspocusRoom>
  )
}

export { EvalTask }
