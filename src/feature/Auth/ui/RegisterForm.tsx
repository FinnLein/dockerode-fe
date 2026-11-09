"use client"

import type { AuthorizeDto } from "@/generated/types"
import { Button } from "@/src/shared/components/ui/button"
import { Input } from "@/src/shared/components/ui/input"
import { Text } from "@/src/shared/components/ui/text"
import { useForm } from "react-hook-form"
import { useRegister } from "../model/useRegister"

interface RegisterFormProps {
  onSuccess?: () => void
}

export const RegisterForm = ({ onSuccess }: RegisterFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthorizeDto>()
  const { mutate, isPending } = useRegister()

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
        <Text as="label" htmlFor="register-email">
          Email
        </Text>
        <Input
          id="register-email"
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
        <Text as="label" htmlFor="register-password">
          Пароль
        </Text>
        <Input
          id="register-password"
          type="password"
          {...register("password", {
            required: "Пароль обязателен",
            minLength: { value: 6, message: "Минимум 6 символов" },
          })}
        />
        {errors.password && (
          <Text as="p" variant="destructive" className="mt-1">
            {errors.password.message}
          </Text>
        )}
      </div>

      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? "Регистрация..." : "Зарегистрироваться"}
      </Button>
    </form>
  )
}
