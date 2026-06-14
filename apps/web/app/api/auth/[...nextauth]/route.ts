import { handlers } from "@/lib/auth";

// next-auth v5 App Router route handler
// This creates:
//   GET  /api/auth/signin
//   GET  /api/auth/callback/twitter   <--- this is the URL you must register in the X Developer Portal
//   POST /api/auth/signout
//   etc.
export const { GET, POST } = handlers;
