import { Geist_Mono, Inter } from "next/font/google"

import { cn } from "@/src/shared/lib/utils"
import { Header } from "@/src/widgets/Header/Header"
import "./globals.css"
import { Providers } from "./providers/Providers"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        inter.variable
      )}
    >
      <body className="flex min-h-dvh flex-col bg-background text-foreground">
        <Providers>
          <Header />

          <main className="flex-1">
            <div className="container mx-auto w-full max-w-7xl p-4 sm:px-6 lg:p-8">
              {children}
            </div>
          </main>
        </Providers>
      </body>
    </html>
  )
}
