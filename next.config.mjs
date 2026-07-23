/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  // TypeScript errors still fail the production build. ESLint runs separately
  // in CI so stale repository-level ESLint files cannot block Vercel deploys.
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
