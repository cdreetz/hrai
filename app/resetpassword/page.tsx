"use client";
import Image from "next/image"
import Link from "next/link"
import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Form } from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { createClient } from '@/utils/supabase/client';

export default function ResetPasswordPage() {
  const router = useRouter();
  const methods = useForm();
  const { register, handleSubmit, formState: { errors } } = methods;
  const supabase = createClient();

  const onSubmit = async (data: any) => {
    const email = data.email;
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'https://my-hrai.vercel.app/update-password',
    });
    if (error) {
      console.error('Password reset failed', error);
    } else {
      router.push('/login');
      console.log('Password reset successful');
    }
  };

  return (
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-full max-w-[540px] gap-14 border-gray-300 shadow-2xl rounded-lg p-20 sm:p-16 items-center">
          <div className="grid gap-4 text-center">
            <h1 className="text-3xl font-bold">Reset your Hrai account password</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email to reset your password 
            </p>
          </div>
          <Form {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-6">
                <div className="grid gap-4">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    {...register("email", { required: true })}
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                  />
                  {errors.email && <span>This field is required</span>}
                </div>
                <Button type="submit" name="reset" className="w-full">
                  Reset Password
                </Button>
              </div>
            </form>
          </Form>
          <div className="mt-6 text-center text-sm">
            Remember your password?{" "}
            <Link href="/login" className="underline">
              Login
            </Link>
          </div>
        </div>
      </div>
  )
}

