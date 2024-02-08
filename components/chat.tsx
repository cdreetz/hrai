'use client'

import React, { useState } from "react";
import OpenAI from "openai";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";


const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

type ScrollAreaDemoProps = {
  items: string[];
}


function ScrollAreaDemo({ items }: ScrollAreaDemoProps) {
  return (
    <ScrollArea className="h-72 w-full rounded-md border" >
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Messages</h4>
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <div className="text-sm">
              {item}
            </div>
            <Separator className="my-2" />
          </React.Fragment>
        ))}
      </div>
    </ScrollArea>
  )
}


type TextAreaComponentProps = {
  onSubmit: () => void;
  textValue: string;
  setTextValue: (value: string) => void;
}

function TextAreaComponent({ onSubmit, textValue, setTextValue }: TextAreaComponentProps) {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  };
  return (
    <div className="grid w-full gap-2 mt-2">
      <Textarea
        placeholder="Type message here"
        value={textValue}
        onChange={(e) => setTextValue(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <Button onClick={onSubmit}>Send Message</Button>
    </div>
  );
}



export default function Chat() {
  // Initialize the conversation with the assistant's greeting message
  const initialMessages = [
    { role: "system", content: "You are a helpful assistant tasked with screening job candidates for a machine learning engineer role. It is an entry level role and candidates should be familiar with both model training and model deployment. We need to assess for technical skills, coding skills, behavioral skills, and problem solving skills. Questions should begin with 'Tell me about a time..' or 'Walk me through how you would...' and you should only ask one question at a time." },
    { role: "assistant", content: "In this prescreening step, we are just looking to get an idea of your familiarity with the role and relevant skills. You can treat it more as a casual conversation than an exam. Are you ready?" },
  ];
  const [conversation, setConversation] = useState(initialMessages);
  const [textValue, setTextValue] = useState("");

  const handleSubmit = async () => {
    if (textValue.trim() !== "") {
      // Update conversation with user's message
      const updatedConversation: any = [...conversation, { role: "user", content: textValue }];

      try {
        const completion = await openai.chat.completions.create({
          messages: updatedConversation,
          model: "gpt-3.5-turbo-1106"
        });

        // Add AI's response to the conversation
        const aiResponse = completion.choices[0].message.content;
        setConversation([...updatedConversation, { role: "assistant", content: aiResponse }]);

      } catch (error) {
        console.error("Error fetching response from OpenAI:", error);
        // Handle error appropriately
      }

      setTextValue(""); // Clear textarea after submit
    }
  };

  // Render conversation items
  const items = conversation.filter(msg => msg.role !== "system").map((msg, index) => 
  `${msg.role === "assistant" ? "Assistant" : "User"}: ${msg.content}`
  );

  return (
    <div>
      <div className="h-screen flex flex-col items-center w-full">
        <ScrollAreaDemo items={items} />
        <TextAreaComponent onSubmit={handleSubmit} textValue={textValue} setTextValue={setTextValue} />
      </div>
    </div>
  );
}