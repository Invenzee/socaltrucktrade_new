"use client";

import { useState } from "react";
import Link from "next/link";
import {
  AuthShell,
  AuthField,
  AuthSubmitButton,
} from "@/components/auth/auth-shell";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <AuthShell
      title="Login"
      backgroundSrc="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=2000&q=80"
      backgroundAlt="Car background"
      footer={
        <>
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-semibold text-brand hover:underline"
          >
            Register
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} className="space-y-5">
        <AuthField
          id="login-email"
          label="Email Address"
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={setEmail}
          autoComplete="email"
        />
        <div>
          <AuthField
            id="login-password"
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChange={setPassword}
            autoComplete="current-password"
            showPasswordToggle
          />
          <div className="mt-2 text-right">
            <Link
              href="/forgot-password"
              className="text-sm font-medium text-brand hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
        </div>
        <AuthSubmitButton>Login</AuthSubmitButton>
      </form>
    </AuthShell>
  );
}
