/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // loader: 'custom',
    // loaderFile: "./loader.js",
    domains: ["storage.yandexcloud.net"],
    deviceSizes: [800, 1000, 1500, 2000, 2500, 4000],
  }
};

export default nextConfig;
