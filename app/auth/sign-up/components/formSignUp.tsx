"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input, PasswordInput } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useSignUp from "@/app/auth/sign-up/hooks/useSignUp";

export default function FormSignUp() {
     const { register, handleSubmit, onSubmit, errors, isSubmitting } = useSignUp();

     return (
          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
               <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                         className={errors.name ? "border-destructive" : undefined}
                         id="name"
                         placeholder="John Doe"
                         type="text"
                         {...register("name")}
                    />
                    {errors.name ? (
                         <p className="text-sm text-destructive">{errors.name.message}</p>
                    ) : null}
               </div>

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

               <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <PasswordInput
                         className={errors.confirmPassword ? "border-destructive" : undefined}
                         id="confirmPassword"
                         placeholder="Confirm password"
                         {...register("confirmPassword")}
                    />
                    {errors.confirmPassword ? (
                         <p className="text-sm text-destructive">
                              {errors.confirmPassword.message}
                         </p>
                    ) : null}
               </div>

               <Button className="w-full" disabled={isSubmitting} type="submit">
                    {isSubmitting ? "Creating account..." : "Sign Up"}
               </Button>

               <p className="text-center text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link className="font-medium text-primary" href="/auth/sign-in">
                         Sign In
                    </Link>
               </p>
          </form>
     );
}
