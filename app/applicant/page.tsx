import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers'
import React from 'react';
import ReadOnlyChat from '@/components/readonlychat';

interface Params {
  id: string;
}


export default async function applicantChatData() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const response = await supabase
    .from('conversations_table')
    .select('messages')
    .eq('conversation_id', '6761f91d-d313-48c7-af43-c97107940bf9')
    .single();

  if (response.error) {
    console.error('Error', response.error.message)
    return <div>Error fetching job details</div>;
  }
  
  if (response.data) {
    const { messages } = response.data;
    return (
      <>
        <div className='mt-20 mb-5 h-full'>
          <ReadOnlyChat messages={messages} />
        </div>
      </>
    )
  } 
}