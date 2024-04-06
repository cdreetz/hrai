import ChatComponent from "@/components/newchat";
import { Message } from "ai/react";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

interface Params {
  id: number;
}

const initialMessages = (jobTitle: string, requirements: string, description: string): Message[] => [
  { id: 'system-0', role: "system", content: `You are a helpful assistant tasked with screening job candidates for a ${jobTitle} role. It is an entry level role and candidates should be familiar with these requirements:${requirements}, and this job description: ${description}. We need to assess for technical skills, coding skills, behavioral skills, and problem solving skills. Questions should begin with 'Tell me about a time..' or 'Walk me through how you would...' and you should only ask one question at a time.` },
  { id: 'assistant-0', role: "assistant", content: "In this prescreening step, we are just looking to get an idea of your familiarity with the role and relevant skills. You can treat it more as a casual conversation than an exam. Are you ready?" },
];


export default async function PrescreeningChat({ params }: { params: Params }) {
  const { id } = params;
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const response = await supabase
    .from('jobs_table')
    .select('title, requirements, description')
    .eq('id', id)
    .single();

  if (response.error) {
    console.error('Error fetching job details:', response.error.message);
    return <div>Error fetching job details: {response.error.message}</div>
  }

  if (response.data) {
    const { title, requirements, description } = response.data;
    return (
      <>
        <div>
          <ChatComponent initialMessages={initialMessages(title, requirements, description)} />
        </div>
      </>
    )
    }
}