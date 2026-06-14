/** @type {import('next').NextConfig} */
import withPWAInit from "next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  register: true,
  skipWaiting: true,
  // disable: process.env.NODE_ENV === "development",
});

const nextConfig = {
  // Add any custom Next config here (images, etc.)
  turbopack: {}, // Helps with Next 16 + next-pwa (webpack-based) compatibility during dev
};

// Only apply next-pwa (which uses webpack plugins) for production builds.
// This avoids turbopack + webpack config conflicts in Next 16+ while still giving us
// the service worker + installable PWA experience for the final app.
const isDev = process.env.NODE_ENV === "development";
export default isDev ? nextConfig : withPWA(nextConfig);
