import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers'
import React from 'react';

interface Params {
  id: string;
}

const ReadOnlyChat: React.FC<{messages: any}> = ({messages}) => {
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

export default async function applicantChatData({ params }: { params: Params }) {
  const { id } = params;
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const response = await supabase
    .from('conversations_table')
    .select('messages')
    .eq('conversation_id', id)
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
