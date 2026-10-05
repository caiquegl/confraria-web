import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/events/[eventId]/preview.jpg": [
      "./node_modules/@img/**/*",
      "./node_modules/sharp/**/*",
    ],
  },
  serverExternalPackages: ["sharp"],
};

export default nextConfig;
