// app/dashboard/page.tsx
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Applicant, applicantcolumns, JobPost, jobcolumns, JobApplicant, jobapplicantcolumns } from "./columns";
import { PaymentRank, columnsrank } from "./columnsrank";
import { DataTable } from "./data-table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { payments, rankedPayments } from "../../data/payments";
import { myJobs, jobData } from "../../data/jobs";
import Chat from "@/components/chat";
import Settings from "@/components/Settings";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

//async function getData(): Promise<Payment[]> {
//  return [
//    {
//      id: "77188273",
//      amount: 100,
//      status: "pending",
//      email: "m@email.com",
//    },
//  ]
//}



interface DataCardProps {
  title: string;
  description: string;
  content: string;
  minWidth?: string;
}

function DataCard({ title, description, content, minWidth = '250px' }: DataCardProps) {
  return (
    <Card className={`min-w-[${minWidth}] flex-grow`}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{content}</CardContent>
    </Card>
  );
}

function TopCards() {
  return (
    <div className="flex flex-row justify-center items-center space-x-4 w-full">
      <DataCard title="Total Applicants" description="All applicants before filtering." content="1000" />
      <DataCard title="Total Prescreened" description="All applicants who completed prescreening" content="500" />
      <DataCard title="Average Score" description="Average prescreening score" content="92" />
    </div>
  );
}

function SecondCards() {
  return (
    <div className="flex flex-row justify-center items-center space-x-4 w-full">
      <DataCard title="Days Left" description="Days until applications close" content="22" minWidth="350px" />
      <DataCard title="Top Applicants" description="Number of top applicants" content="8" minWidth="350px" />
    </div>
  );
}

function ChatTab() {
  return (
    <div className="flex items-center">
      <Chat />
    </div>
  )
}

function SettingsTab() {
  return (
    <div className='flex items-center'>
      <Settings />
    </div>
  )
}

async function DashboardTabs() {
  return (
    <Tabs defaultValue="Overview">
      <TabsList className="grid w-[800px] grid-cols-5">
        <TabsTrigger value="Overview">Overview</TabsTrigger>
        <TabsTrigger value="Jobs">Jobs</TabsTrigger>
        <TabsTrigger value="Applicants">Applicants</TabsTrigger>
        <TabsTrigger value="Chat">Chat</TabsTrigger>
        <TabsTrigger value="Settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="Overview">
        <TopCards />
        <div style={{marginTop: '10px'}}></div>
        <SecondCards />
        <DataTable columns={columnsrank} data={rankedPayments} />
      </TabsContent>
      <TabsContent value="Jobs">
        <DataTable columns={jobcolumns} data={myJobs} />
      </TabsContent>
      <TabsContent value="Applicants">
        <DataTable columns={jobapplicantcolumns} data={await ApplicantListData() || []} />
      </TabsContent>
      <TabsContent value="Chat">
        <ChatTab />
      </TabsContent>
      <TabsContent value="Settings">
        <SettingsTab />
      </TabsContent>
    </Tabs>
  )
}

async function ApplicantListDataExample() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data: applicants } = await supabase.from('applicants_table').select()
  return (
    <ul>
      {applicants?.map((applicant) => (
        <li key={applicant.id}>
          <span>{applicant.first_name} {applicant.last_name} - {applicant.email}</span>
        </li>
      ))}
    </ul>
  )
}

async function ApplicantListData() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data: applicants } = await supabase.from('applicants_table').select()
  return applicants;
}

export default function Dashboard() {
  return (
    <div>
      <div style={{
        width: '90%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        margin: '0 auto',
        gap: '10px',
        paddingTop: '20px'
      }}>
        <h1 style={{fontSize: '3em', fontWeight: 'bold'}}>
          Your Dashboard
        </h1>
        <DashboardTabs />
        <ApplicantListDataExample />
      </div>
    </div>
  );
}
