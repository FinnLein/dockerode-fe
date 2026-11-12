import { WebsocketProvider } from "y-websocket"
import * as Y from "yjs"

interface CreateCollabProviderArgs {
  roomId: string
  ydoc: Y.Doc
  token?: string
}

const wsUrl = process.env.NEXT_PUBLIC_WS_URL ?? "ws://localhost:5001"

const createCollabProvider = (args: CreateCollabProviderArgs) => {
  const { roomId, ydoc, token } = args

  const provider = new WebsocketProvider(wsUrl, "", ydoc, {
    params: { roomId, ...(token && { token }) },
  })
  return provider
}

export { createCollabProvider }
