/** @type {import('next').NextConfig} */
const nextConfig = {
  // We handle linting separately; don't fail the production build on lint.
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
