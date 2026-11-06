"use client"

import { LogIn, LogOut, Shield, User } from "lucide-react"
import Link from "next/link"

import { Button } from "@/src/shared/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/src/shared/components/ui/dropdown-menu"
import { Text } from "@/src/shared/components/ui/text"
import { useMounted } from "@/src/shared/hooks/useMounted"

const UserMenu = () => {
  const isAuth = false
  const isAdmin = false

  const mounted = useMounted()

  if (!mounted) {
    return <Button size="xl" variant="ghost" disabled aria-hidden />
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="xl"
            title="Меню профиля"
            aria-label="Открыть меню профиля"
          >
            <User />
          </Button>
        }
      />
      <DropdownMenuContent className="min-w-50" align="end" sideOffset={8}>
        <DropdownMenuGroup>
          <DropdownMenuLabel className="flex items-center gap-2">
            <div className="flex size-7 items-center justify-center rounded-full bg-primary/10 text-primary">
              <User />
            </div>
            <div className="flex flex-col">
              <Text weight="medium">{isAuth ? "Пользователь" : "Гость"}</Text>
              <Text variant="muted">
                {isAuth ? "авторизован" : "не авторизован"}
              </Text>
            </div>
          </DropdownMenuLabel>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        {isAuth ? (
          <DropdownMenuItem render={<Link href="/profile" />}>
            <User />
            Профиль
            <DropdownMenuShortcut>P</DropdownMenuShortcut>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem render={<Link href="/login" />}>
            <LogIn />
            Войти
            <DropdownMenuShortcut>L</DropdownMenuShortcut>
          </DropdownMenuItem>
        )}

        {isAdmin && (
          <DropdownMenuItem render={<Link href="/admin" />}>
            <Shield />
            Админ
            <DropdownMenuShortcut>A</DropdownMenuShortcut>
          </DropdownMenuItem>
        )}

        {isAuth && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              onClick={() => {
                // логика выхода
                console.log("logout")
              }}
            >
              <LogOut />
              Выйти
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { UserMenu }
