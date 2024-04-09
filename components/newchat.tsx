'use client'
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Message, useChat } from "ai/react";
import { ChatRequestOptions } from "ai";
import { createClient } from "@/utils/supabase/client";
import { v4 as uuidv4 } from "uuid";

interface ChatComponentProps {
  initialMessages: Message[];
}

const ChatComponent: React.FC<ChatComponentProps> = ({ initialMessages }) => {
  const supabase = createClient();
  const { messages, input, handleInputChange, handleSubmit: originalHandleSubmit, setMessages } = useChat();
  const [conversationId, setConversationId] = useState(() => uuidv4());

  useEffect(() => {
    setMessages(initialMessages);
  }, [setMessages, initialMessages]);

  const handleSubmit = async (event?: React.SyntheticEvent) => {
    event?.preventDefault();

    originalHandleSubmit(event);

    const { error } = await supabase
      .from('conversations_table')
      .upsert({
        conversation_id: conversationId,
        messages: JSON.stringify(messages),
      }, {
        onConflict: 'conversation_id'
      });
    
    if (error) {
      console.error("Error updating conversation:", error.message);
    } else {
      console.log("Conversation updated")
    }
  }

  const handleKeyboardSubmit = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
    }
  };

  return (
    <div className="flex flex-col h-full items-center mx-auto w-5/6">
      <ScrollArea className="flex-1 h-4/5 w-full rounded-md border overflow-y-auto">
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
      <div className="mt-4" />
        <Textarea
          placeholder="Type message here.."
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyboardSubmit}
        />
        <Button className="mt-2 w-full" onClick={(e) => handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>)}>Send Message</Button>
    </div>
  );
};

export default ChatComponent;
