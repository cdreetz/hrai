// app/signup/page.tsx
"use client";
import Image from "next/image"
import Link from "next/link"
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { login } from "./loginaction";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Form } from "@/components/ui/form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const methods = useForm();
  const { register, handleSubmit, formState: { errors } } = methods;

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    setError("");
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    try {
      await login(formData);
      console.log('Login successful');
      router.push('/dashboard');
    } catch (error) {
      console.error('Login failed', error);
      setError("Login failed. Please check your credentials and try again.")
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-full max-w-[540px] gap-14 border-gray-300 shadow-2xl rounded-lg p-20 sm:p-16 items-center">
          <div className="grid gap-4 text-center">
            <h1 className="text-3xl font-bold">Login to your Hrai account</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email and password to login 
            </p>
          </div>
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
                <div className="grid gap-4">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    {...register("email", { required: true })}
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    disabled={isLoading}
                  />
                  {errors.email && <span className="text-red-500 text-sm">{errors.email.message as string}</span>}
                </div>
                <div className="grid gap-4">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      href="/resetpassword"
                      className="ml-auto inline-block text-sm underline"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                  <Input
                    {...register("password", { required: true })}
                    id="password"
                    type="password"
                    disabled={isLoading}
                  />
                  {errors.password && <span className="text-red-500 text-sm">{errors.password.message as string}</span>}
                </div>
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <Button type="submit" name="login" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Logging in..
                    </>
                  ) : (
                    "Login"
                  )}
                </Button>
            </form>
          <div className="mt-6 text-center text-sm">
            Do not have an account?{" "}
            <Link href="/signup" className="underline">
              Signup
            </Link>
          </div>
        </div>
      </div>
  )
}
  