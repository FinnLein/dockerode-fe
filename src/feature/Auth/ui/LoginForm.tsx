"use client"

import type { AuthorizeDto } from "@/generated/types"
import { Button } from "@/src/shared/components/ui/button"
import { Input } from "@/src/shared/components/ui/input"
import { Text } from "@/src/shared/components/ui/text"
import { useForm } from "react-hook-form"
import { useLogin } from "../model/useLogin"

interface LoginFormProps {
  onSuccess?: () => void
}

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthorizeDto>()
  const { mutate, isPending } = useLogin()

  const onSubmit = (data: AuthorizeDto) => {
    mutate(data, {
      onSuccess: () => {
        onSuccess?.()
      },
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Text as="label" htmlFor="login-email">
          Email
        </Text>
        <Input
          id="login-email"
          type="email"
          {...register("email", { required: "Email обязателен" })}
        />
        {errors.email && (
          <Text as="p" variant="destructive" className="mt-1">
            {errors.email.message}
          </Text>
        )}
      </div>

      <div>
        <Text as="label" htmlFor="login-password">
          Пароль
        </Text>
        <Input
          id="login-password"
          type="password"
          {...register("password", { required: "Пароль обязателен" })}
        />
        {errors.password && (
          <Text as="p" variant="destructive" className="mt-1">
            {errors.password.message}
          </Text>
        )}
      </div>

      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? "Вход..." : "Войти"}
      </Button>
    </form>
  )
}
