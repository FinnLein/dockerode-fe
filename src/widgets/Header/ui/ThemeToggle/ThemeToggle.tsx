"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/src/shared/components/ui/button"
import { Text } from "@/src/shared/components/ui/text"
import { useMounted } from "@/src/shared/hooks/useMounted"

const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme()
  const mounted = useMounted()

  if (!mounted) {
    return <Button size="icon" variant="ghost" disabled aria-hidden />
  }

  return (
    <Button
      size="xl"
      variant="ghost"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      title="Переключить тему (хоткей: D)"
    >
      {resolvedTheme === "dark" ? <Sun /> : <Moon />}
      <Text as="span" className="sr-only">
        Переключить тему
      </Text>
    </Button>
  )
}

export { ThemeToggle }
