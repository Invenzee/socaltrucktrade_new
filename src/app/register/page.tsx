"use client";

import { useState } from "react";
import Link from "next/link";
import {
  AuthShell,
  AuthField,
  AuthSubmitButton,
} from "@/components/auth/auth-shell";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <AuthShell
      title="Create an account"
      backgroundSrc="/auth-ram-pickup.webp"
      footer={
        <>
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-brand hover:underline"
          >
            Login
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} className="space-y-5">
        <AuthField
          id="register-email"
          label="Email Address"
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={setEmail}
          autoComplete="email"
        />
        <AuthField
          id="register-name"
          label="Full Name"
          placeholder="Enter your full name"
          value={fullName}
          onChange={setFullName}
          autoComplete="name"
        />
        <AuthField
          id="register-password"
          label="Password"
          placeholder="Create your password"
          value={password}
          onChange={setPassword}
          autoComplete="new-password"
          showPasswordToggle
        />
        <AuthSubmitButton>Create an account</AuthSubmitButton>
      </form>
    </AuthShell>
  );
}
