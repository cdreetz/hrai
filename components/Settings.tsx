import React from 'react';
import { Button } from "@/components/ui/button"
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { cookies } from 'next/headers';
// import { createClient } from '@/utils/supabase/server';

interface AccountSettingsProp {
  email: string,
}

function AccountSettings({ email }: AccountSettingsProp) {
  return (
    <Card>
    <CardHeader>
      <CardTitle>Account Settings</CardTitle>
      <CardDescription>Manage your account settings.</CardDescription>
    </CardHeader>
    <CardContent>
      <form className="flex flex-col gap-4">
        <div className="space-y-2 w-3/2">
          <Label htmlFor="username">Username</Label>
          <Input id="username" placeholder={email ? email : "Enter your email"} type="email" />
        </div>
        <div className="space-y-2 w-3/2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" placeholder="Enter your password" type="password" />
        </div>
      </form>
    </CardContent>
    <CardFooter className="border-t p-6">
      <Button>Save</Button>
    </CardFooter>
  </Card>
  )
}

export default async function Settings() {
  // const cookieStore = cookies();
  // const supabase = createClient(cookieStore);
  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();
  return (
    <div className="grid gap-6 w-1/2">
      <AccountSettings email='Your email'/>
    </div>
  )
}

// <AccountSettings email={user?.email || ""}/>