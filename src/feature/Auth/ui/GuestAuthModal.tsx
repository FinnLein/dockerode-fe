"use client"

import { Button } from "@/src/shared/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/src/shared/components/ui/dialog"
import { Input } from "@/src/shared/components/ui/input"
import { createGuestSession } from "@/src/shared/lib/api"
import { useMutation } from "@tanstack/react-query"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"

interface GuestAuthModalProps {
  open: boolean
}

export const GuestAuthModal = ({ open }: GuestAuthModalProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [guestName, setGuestName] = useState(
    () => `Гость #${Math.floor(1000 + Math.random() * 9000)}`
  )

  const { mutate: loginAsGuest, isPending } = useMutation({
    mutationFn: (name: string) => createGuestSession(name),
  })

  const handleGuestSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = guestName.trim()
    if (!trimmed) return
    loginAsGuest(trimmed)
  }

  const handleGoToLogin = () => {
    const currentUrl = `${pathname}?${searchParams.toString()}`
    router.push(`/login?returnUrl=${encodeURIComponent(currentUrl)}`)
  }

  return (
    <Dialog open={open} disablePointerDismissal onOpenChange={() => {}}>
      <DialogContent showCloseButton={false} className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Вход в совместную комнату</DialogTitle>
          <DialogDescription>
            Вас пригласили для совместного решения задачи. Войдите в аккаунт или
            продолжите как гость.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleGuestSubmit} className="flex flex-col gap-4">
          <Input
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            placeholder="Ваше имя в комнате"
            disabled={isPending}
            maxLength={32}
          />

          <DialogFooter className="flex flex-col gap-2 sm:flex-row">
            <Button
              type="button"
              variant="outline"
              onClick={handleGoToLogin}
              disabled={isPending}
            >
              Войти в аккаунт
            </Button>
            <Button type="submit" disabled={isPending || !guestName.trim()}>
              {isPending ? "Создание..." : "Войти как гость"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
