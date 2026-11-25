/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export: `npm run build` creates an `out/` folder you can drop on Netlify.
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};
export default nextConfig;
