/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Бүх домэйн зөвшөөрөх
      },
    ],
  },
};

export default nextConfig;
