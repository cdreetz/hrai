import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { headers, cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

// swap out next auth for supabase auth
// use supabase client component thing

export function Login() {
  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      <Input type="email" placeholder="Email" />
      <Input type="password" placeholder="Password" />
      <div className="flex flex-row gap-4 mt-6">
        <Button>Sign Up</Button>
        <Button>Login</Button>
      </div>

    </div>
  )
}


export default function Home({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const signIn = async (formData: FormData) => {
    "use server";
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      return redirect("/?message=Could not authenticate user");
    }
    return redirect("/dashboard");
  };

  const signUp = async (formData: FormData) => {
    "use server";
    const origin = headers().get("origin")
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      return redirect("/?message=Could not authenticate user");
    }
    return redirect("/?message=Check email to continue sign in process");
  };
  
  return (
    <main className="flex min-h-screen flex-col items-center pt-40">
      <Login />
    </main>
  );
}
