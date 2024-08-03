// app/page.tsx
'use client'

import { createClient } from '@/utils/supabase/client'
import { redirect } from 'next/navigation'

export default async function RootPage() {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getSession()

  if (data) {
    redirect('/dashboard')
  } else {
    redirect('/signup')
  }

  return null
}