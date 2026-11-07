"use client"

import { Button } from "@/src/shared/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/src/shared/components/ui/dialog"
import { Text } from "@/src/shared/components/ui/text"
import { useState } from "react"
import { match } from "ts-pattern"
import { LoginForm } from "./LoginForm"
import { RegisterForm } from "./RegisterForm"

type AuthMode = "login" | "register"

interface AuthModalProps {
  defaultMode?: AuthMode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export const AuthModal = ({
  defaultMode = "login",
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
}: AuthModalProps) => {
  const [internalOpen, setInternalOpen] = useState(false)
  const [mode, setMode] = useState<AuthMode>(defaultMode)

  const open = controlledOpen ?? internalOpen
  const setOpen = controlledOnOpenChange ?? setInternalOpen

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{mode === "login" ? "Вход" : "Регистрация"}</DialogTitle>
        </DialogHeader>

        {match(mode)
          .with("login", () => <LoginForm onSuccess={() => setOpen(false)} />)
          .with("register", () => (
            <RegisterForm onSuccess={() => setOpen(false)} />
          ))
          .exhaustive()}

        <div className="text-center">
          <Text variant="muted" as="span">
            {mode === "login" ? (
              <>
                Нет аккаунта?{" "}
                <Button
                  type="button"
                  variant="link"
                  className="h-auto p-0"
                  onClick={() => setMode("register")}
                >
                  Зарегистрироваться
                </Button>
              </>
            ) : (
              <>
                Уже есть аккаунт?{" "}
                <Button
                  type="button"
                  variant="link"
                  className="h-auto p-0"
                  onClick={() => setMode("login")}
                >
                  Войти
                </Button>
              </>
            )}
          </Text>
        </div>
      </DialogContent>
    </Dialog>
  )
}
