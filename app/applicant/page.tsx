// app/page.tsx

// applicant page to view details of any given applicant
// should have the applicants name, email, resume link, job they applied to, and their prescreening conversation
// should essentially be a query like 
//
// select * from applicants_table where id = id;
//
// select title from jobs_table where id = applicants_table.id 
//
// select conversation_id from conversations_table where appicant_id = applicants_table.id

import React from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Chat from "@/components/chat";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import ChatComponent from '@/components/newchat';
import { Message } from 'ai/react';
import { DataCard } from "../dashboard/page";


function ApplicantDetailsCard() {
  const cardStyle = "min-w-[250px] w-full sm:w-1/3 h-40"
  return (
    <div className="flex flex-col sm:flex-row justify-center items-stretch space-x-0 space-y-4 sm:space-x-4 sm:space-y-0 w-full">
      <DataCard title="Applicant Name" description='Full Name of Applicant' content='Content' className={cardStyle} />
      <DataCard title="Applied Job" description='The job title applied' content='Content' className={cardStyle} />
    </div>
  )
}

export default function ApplicantDetailsPage() {
  return (
    <div className='flex flex-col justify-center mt-20 mx-10 gap-5 w-9/10'>
      <ApplicantDetailsCard />
    </div>
  )
}