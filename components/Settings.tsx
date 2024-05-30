import React from 'react';
import { redirect} from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button"
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Separator } from '@/components/ui/separator';
import { Input } from "@/components/ui/input"
import { cookies } from 'next/headers';
// import { createClient } from '@/utils/supabase/server';

interface AccountSettingsProp {
  email: string,
}

function AccountSettings() {
  return (
    <Card>
    <CardHeader>
      <CardTitle>Account Settings</CardTitle>
      <CardDescription>Manage your account settings.</CardDescription>
    </CardHeader>
    <div className="mx-4">
      <Separator />
    </div>
    <CardContent className="flex justify-between items-center mt-4">
        <Label>Reset Password:</Label>
        <Button>
          <Link href={`/resetpassword`}>Reset</Link>
        </Button>
    </CardContent>
    {/* <CardFooter className="border-t p-6">
      <Button>Save</Button>
    </CardFooter> */}
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
      <AccountSettings />
    </div>
  )
}

// <AccountSettings email={user?.email || ""}/>