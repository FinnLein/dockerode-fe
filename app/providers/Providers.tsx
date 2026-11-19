"use client"

import { ThemeProvider } from "@/src/shared/components/theme-provider"
import { Toaster } from "@/src/shared/components/ui/toast"
import { HocuspocusProviderWebsocket } from "@hocuspocus/provider"
import { HocuspocusProviderWebsocketComponent } from "@hocuspocus/provider-react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { PropsWithChildren, useMemo } from "react"

const Providers = ({ children }: PropsWithChildren) => {
  const queryClient = new QueryClient()
  const websocketProvider = useMemo(
    () =>
      new HocuspocusProviderWebsocket({
        url:
          process.env.NEXT_PUBLIC_HOCUSPOCUS_URL ??
          "ws://localhost:5000/collab",
        maxAttempts: 5,
        onMaxAttemptsFailed: ({ error }) => {
          console.error("Could not connect to the server:", error)
        },
      }),
    []
  )

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <HocuspocusProviderWebsocketComponent
        websocketProvider={websocketProvider}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </HocuspocusProviderWebsocketComponent>
      <Toaster />
    </QueryClientProvider>
  )
}

export { Providers }
