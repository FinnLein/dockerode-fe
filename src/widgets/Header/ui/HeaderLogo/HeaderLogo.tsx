import { Home } from "lucide-react"
import Link from "next/link"

import { Text } from "@/src/shared/components/ui/text"

const HeaderLogo = () => {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 transition-opacity hover:opacity-80"
    >
      <div className="rounded-lg bg-primary/10 p-2 text-primary">
        <Home />
      </div>
      <Text as="span" weight="bold" className="hidden text-lg sm:inline-block">
        Dockerode Tasks
      </Text>
    </Link>
  )
}

export { HeaderLogo }
