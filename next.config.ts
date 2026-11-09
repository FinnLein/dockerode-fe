import type { NextConfig } from "next"

const isProd = process.env.NODE_ENV === "production"

const nextConfig: NextConfig = {
  output: isProd ? "standalone" : undefined,
  allowedDevOrigins: ["expertly-shipshape-chickadee.cloudpub.ru"],
}

export default nextConfig
