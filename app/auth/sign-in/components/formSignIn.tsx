"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input, PasswordInput } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useSignIn from "@/app/auth/sign-in/hooks/useSignIn";

export default function FormSignIn() {
  const { register, handleSubmit, onSubmit, errors, isSubmitting } =
    useSignIn();

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          className={errors.email ? "border-destructive" : undefined}
          id="email"
          placeholder="john@example.com"
          type="email"
          {...register("email")}
        />
        {errors.email ? (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        ) : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <PasswordInput
          className={errors.password ? "border-destructive" : undefined}
          id="password"
          placeholder="Password"
          {...register("password")}
        />
        {errors.password ? (
          <p className="text-sm text-destructive">{errors.password.message}</p>
        ) : null}
      </div>

      <Button className="w-full" disabled={isSubmitting} type="submit">
        {isSubmitting ? "Signing in..." : "Sign In"}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link className="font-medium text-primary" href="/auth/sign-up">
          Sign Up
        </Link>
      </p>
    </form>
  );
}
