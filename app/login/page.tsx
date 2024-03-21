/**
 * v0 by Vercel.
 * @see https://v0.dev/t/g4HAIARlN7r
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { createClient } from "@/utils/supabase/client"




async function signInWithEmail() {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: 'example@email.com',
    password: 'example-password',
  })
}



export default function Component() {
  return (
    <div>
      <div>
        <div className="flex justify-center">Login</div>
        <div className="flex justify-center">Enter your email below to login to your account.</div>
      </div>
      <div className="flex items-center py-10">
        <div className="mx-auto space-y-6 w-[400px]">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder="m@example.com" required type="email" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" required type="password" />
            </div>
            <Button className="w-full" type="submit">
              Login
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

