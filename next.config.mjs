/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  experimental: {},
  async redirects() {
    return [
      // LayerOne became Kalaa (2026-11)
      { source: "/projects/layerone-design-system", destination: "/projects/kalaa-design-system", permanent: true }
    ];
  }
};

export default nextConfig;
