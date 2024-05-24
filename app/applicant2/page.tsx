import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers'
import React from 'react';


async function fetchConversationData() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase
    .from('conversations_table')
    .select('messages')
    .eq('conversation_id', '6761f91d-d313-48c7-af43-c97107940bf9')
    .single();

  if (error) {
    console.error('Error', error)
    return null;
  } else {
    console.log(data)
    return data;
  }
}

const ApplicantPage2: React.FC<{messages: any}> = ({messages}) => {
  return (
    <div className="flex gap-2 flex-col m-10">
      {messages ? JSON.parse(messages).filter(m => m.role !== 'system').map(m => (
        <React.Fragment key={m.id}>
          <div className="text-sm">
            <div className="font-bold">{m.role === 'user' ? 'You' : 'Assistant'}:</div>
            <div className="m-2">{m.content}</div>
          </div>
        </React.Fragment>
      )) : 'No data available'}
    </div>
  )
}

export default async function ApplicantPage2Container() {
  const data = await fetchConversationData();
  return <ApplicantPage2 messages={data ? data.messages : null} />
}