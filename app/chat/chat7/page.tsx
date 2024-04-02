'use client'

import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Message, useChat } from "ai/react";

// Hardcoded initial messages
const initialMessages: Message[] = [
  { id: 'system-0', role: "system", content: "You are a helpful assistant tasked with screening job candidates for a machine learning engineer role. It is an entry level role and candidates should be familiar with both model training and model deployment. We need to assess for technical skills, coding skills, behavioral skills, and problem solving skills. Questions should begin with 'Tell me about a time..' or 'Walk me through how you would...' and you should only ask one question at a time." },
  { id: 'assistant-0', role: "assistant", content: "In this prescreening step, we are just looking to get an idea of your familiarity with the role and relevant skills. You can treat it more as a casual conversation than an exam. Are you ready?" },
];

export default function ChatPage() {
  const { messages, input, handleInputChange, handleSubmit, setMessages } = useChat();

  // Set initial messages when the component mounts
  React.useEffect(() => {
    setMessages(initialMessages);
  }, [setMessages]);

  // Adapted handleSubmit to work with KeyboardEvent
  const handleKeyboardSubmit = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevent default to stop from adding a new line
      // Use the original handleSubmit, simulate the form submission event
      handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
    }
  };
  return  (
    <div className="flex flex-col h-screen items-center mx-auto w-4/5 pb-16">
      <ScrollArea className="flex-1 w-full rounded-md border overflow-y-auto" >
        <div className="p-4">
          <h4 className="self-start mb-4 text-sm font-medium leading-none">Hrai Chat</h4>
          <Separator className="my-2 border-b" />
          <div className="flex gap-2 flex-col">
            {messages.filter(m => m.role !== 'system').map(m => (
              <React.Fragment key={m.id}>
                <div className="text-sm">
                  <div className="font-bold">{m.role === 'user' ? 'You' : 'Assistant'}:</div>
                  <div className="m-2">{m.content}</div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </ScrollArea>
      <div className='flex flex-col w-full mt-4'>
        <Textarea
          placeholder="Type message here.."
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyboardSubmit}
        />
        <Button onClick={() => handleSubmit()}>Send Message</Button>
      </div>
    </div>
  )

}
