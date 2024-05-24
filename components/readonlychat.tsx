'use client'
import React, { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/utils/supabase/client";
import { Message, useChat } from "ai/react"

const ReadOnlyChatComponent: React.FC = () => {
  const supabase = createClient();
  const { messages, setMessages } = useChat();

  useEffect(() => {
    const fetchConversation = async () => {
      const { data, error } = await supabase
        .from('conversations_table')
        .select('messages')
        .eq('conversation_id', '6761f91d-d313-48c7-af43-c97107940bf9')
        .single();

      if (error) {
        console.error('Error fetching conversation:', error);
      } else if (data) {
        console.log(data);
        setMessages(data.messages);
      }
    };

    fetchConversation();
  }, []);

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
    </div>
  );
};

export default ReadOnlyChatComponent;
