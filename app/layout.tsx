import { Geist_Mono, Inter } from 'next/font/google'

import { cn } from '@/lib/utils'
import './globals.css'
import { Providers } from './providers/Providers'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

const fontMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
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
      className={cn('antialiased', fontMono.variable, 'font-sans', inter.variable)}
    >
      <body className="min-h-dvh bg-background text-foreground">
        <Providers>
          <div className="mx-auto w-full max-w-7xl p-4 sm:px-6 lg:p-8">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  )
}