import { cookies } from "next/headers"
import { notFound } from "next/navigation"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const token = cookieStore.get("accessToken")?.value

  if (!token) {
    notFound()
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/profile`, {
    headers: { cookie: `accessToken=${token}` },
    cache: "no-store",
  })

  if (!res.ok) {
    notFound()
  }

  const user = await res.json()
  if (user.role !== "admin") {
    notFound()
  }

  return children
}