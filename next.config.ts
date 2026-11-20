import type { NextConfig } from "next"

const isProd = process.env.NODE_ENV === "production"

const nextConfig: NextConfig = {
  output: isProd ? "standalone" : undefined,
  allowedDevOrigins: ["expertly-shipshape-chickadee.cloudpub.ru"],
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: isProd
      ? []
      : [
          {
            protocol: "http",
            hostname: "localhost",
            port: "9000",
            pathname: "/images/**",
          },
          {
            hostname: "*.cloudpub.ru",
            protocol: "https",
          },
        ],
  },
}

export default nextConfig
