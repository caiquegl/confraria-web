import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/events/**/*": [
      "./node_modules/@img/**/*",
      "./node_modules/sharp/**/*",
    ],
  },
  serverExternalPackages: ["sharp"],
};

export default nextConfig;
