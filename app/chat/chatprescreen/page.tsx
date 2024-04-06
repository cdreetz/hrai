import ChatComponent from "@/components/newchat";
import { Message } from "ai/react";

const initialMessages: Message[] = [
  { id: 'system-0', role: "system", content: "You are a helpful assistant tasked with screening job candidates for a machine learning engineer role. It is an entry level role and candidates should be familiar with both model training and model deployment. We need to assess for technical skills, coding skills, behavioral skills, and problem solving skills. Questions should begin with 'Tell me about a time..' or 'Walk me through how you would...' and you should only ask one question at a time." },
  { id: 'assistant-0', role: "assistant", content: "In this prescreening step, we are just looking to get an idea of your familiarity with the role and relevant skills. You can treat it more as a casual conversation than an exam. Are you ready?" },
];

export default function PrescreeningChat() {
  return (
    <div>
      <ChatComponent initialMessages={initialMessages} />
    </div>
  )
}