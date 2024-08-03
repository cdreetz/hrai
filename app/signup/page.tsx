// app/signup/page.tsx
"use client";
import React, { useState } from "react";
import Link from "next/link"
import { useRouter } from "next/navigation";
import { signup } from "@/app/loginaction";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

export default function SignUpPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const form = new FormData(e.target as HTMLFormElement);

    try {
      await signup(form);
      console.log("Signup successful");
      router.push("/dashboard");
    } catch (error) {
      console.error("Signup failed", error);
      setError("Signup failed. Please try again.")
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full lg:w-auto mx-4 lg:mx-16 2xl:mx-12 lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-full max-w-[540px] gap-14 border-gray-300 shadow-2xl rounded-lg p-20 sm:p-16 items-center">
          <div className="grid gap-4 text-center">
            <h1 className="text-3xl font-bold">Create your Hrai account</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to create to your account
            </p>
          </div>
          <form onSubmit={handleSubmit} className="grid gap-6">
            <div className="grid gap-4">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
                disabled={isLoading}
              />
            </div>
            <div className="grid gap-4">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input 
                id="password" 
                name="password"
                type="password" 
                required 
                disabled={isLoading}
              />
            </div>
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account..
                </>
              ): (
                "Create account"
              )}
            </Button>
          </form>
          <div className="mt-6 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Login
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-white lg:block">
        <div className="flex h-full items-center justify-center">
          <div className="w-[600px] rounded-lg bg-white p-8 shadow-lg">
            <div className="space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">Hrai</h2>
              </div>
              <div className="space-y-2">
                <div className="flex items-start gap-4">
                  <div className="mt-1 p-2 text-black">
                    - 
                  </div>
                  <div>
                    <h3 className="font-medium">Get started quickly</h3>
                    <p className="text-muted-foreground">
                      Post your first job and it is immediately ready for applicants.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="mt-1 p-2 text-black">
                    - 
                  </div>
                  <div>
                    <h3 className="font-medium">Simple integrations</h3>
                    <p className="text-muted-foreground">
                      Manage and track applicants in your Hrai dashboard, or integrate our AI 
                      screening service while continueing with your ATS of choice.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="mt-1 p-2 text-black">
                    -
                  </div>
                  <div>
                    <h3 className="font-medium">Direct support</h3>
                    <p className="text-muted-foreground">
                      Our team is open to assisting with helping tailor our platform 
                      if you require custom solutions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
  