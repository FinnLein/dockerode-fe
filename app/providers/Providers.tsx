"use client"

import { ThemeProvider } from "@/src/shared/components/theme-provider"
import { Toaster } from "@/src/shared/components/ui/toast"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { PropsWithChildren } from "react"

const Providers = ({ children }: PropsWithChildren) => {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <ThemeProvider>{children}</ThemeProvider>
      <Toaster />
    </QueryClientProvider>
  )
}

export { Providers }
