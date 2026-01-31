import { basePath } from "@/lib/basePath";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  basePath,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;