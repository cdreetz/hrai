// app/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { redirect } from 'next/navigation'

function WelcomeComponent({ email }: { email: string }) {
  return (
    <div className='flex items-center justify-center min-h-screen bg-background'>
      <Card className='w-[350px]'>
        <CardHeader>
          <CardTitle>Welcome</CardTitle>
          <CardDescription>{email}</CardDescription>
        </CardHeader>
        <CardContent className='grid gap-4'>
          <Button asChild variant="outline">
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/notifications">View Notifications</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

function AuthPrompt() {
  return (
    <div className='flex items-center justify-center min-h-screen bg-background'>
      <Card className='w-[350px]'>
        <CardHeader>
          <CardTitle>Welcome to Hrai</CardTitle>
          <CardDescription>Please log in or sign up to continue.</CardDescription>
        </CardHeader>
        <CardContent className='flex justify-between'>
          <Button asChild variant="outline">
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/signup">Sign Up</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default function RootPage() {
  const [session, setSession] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function fetchSession() {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setLoading(false);
    }

    fetchSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  if (loading) {
    return <div className='flex items-center justify-center min-h-screen'>Loading...</div>
  }

  return session ? (
    <WelcomeComponent email={session.user.email} />
  ): (
    <AuthPrompt />
  )
}