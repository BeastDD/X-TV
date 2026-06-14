"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

interface SignInButtonProps {
  className?: string;
  children?: React.ReactNode;
  size?: "default" | "sm" | "lg" | "icon";
}

export function SignInButton({ className, children = "Sign in with X", size = "default" }: SignInButtonProps) {
  return (
    <Button
      size={size}
      className={className}
      onClick={() => signIn("twitter", { callbackUrl: "/tv" })}
    >
      {children}
    </Button>
  );
}
