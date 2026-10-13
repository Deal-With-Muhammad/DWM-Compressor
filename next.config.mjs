/** @type {import('next').NextConfig} */
const nextConfig = {
  // We handle linting separately; don't fail the production build on lint.
  eslint: { ignoreDuringBuilds: true },
  webpack: (config) => {
    // pdfjs-dist optionally requires the native `canvas` package for Node.
    // We only render PDFs in the browser, so stub it out — otherwise the
    // build fails wherever `canvas` isn't installed (e.g. Vercel).
    config.resolve.alias.canvas = false;
    return config;
  },
};

export default nextConfig;
