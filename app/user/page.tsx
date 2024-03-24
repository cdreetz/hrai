import { cookies } from 'next/headers'
import { createClient } from "@/utils/supabase/server";

async function mysession() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const { data, error } = await supabase.auth.getSession()
  return (
    <div>
      <pre>{data ? `User ID: ${data.session.user.id}` : 'No user data'}</pre>
    </div>
  )
}


async function mysessionuserid() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const data = await supabase.auth.getSession()
  return (
    <div>
      <pre>{data ? JSON.stringify(data, null, 2) : 'No user data'}</pre>
    </div>
  )
}

async function myuser() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const { data: { user } = {} } = await supabase.auth.getUser()
  return user && user.id ? user.id : null
}

export default myuser;
