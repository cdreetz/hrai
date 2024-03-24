// pages/jobs/[id].js
import React from 'react';
import JobPost from '../../../components/JobPost';
import { Button } from '@/components/ui/button';
import Link from "next/link";
import { createClient } from '@/utils/supabase/server'; 
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation';
import ApplicationForm from '../../../components/apply';


interface Job {
  id: number;
  title: string;
  description: string;
  highlights: string;
  qualifications: string;
  company: string;
  tags: string[];
  summary: string;
  requirements: string[];
  benefitsDescription: string;
}

interface JobPageProps {
  job: Job | null;
}

function ButtonLink() {
  return (
    <Button asChild>
      <Link href="/apply">Apply Here</Link>
    </Button>
  );
}

export function generateStaticParams() {
  return [{ id: '1'}]
}

export default async function Job({ params }) {
  const { id } = params;
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const response = await supabase
    .from('jobs_table')
    .select('*')
    .eq('id', id)
    .single();

  // Check if the data is fetched successfully before passing it to the component
  if (response.error === null && response.data) {
    return (
      <>
        <JobPost job={response.data} />
        <ApplicationForm jobId={id}/>
      </>
    );
  } else {
    // Handle the case where data is not available or an error occurred
    return <div>Error fetching job details.</div>;
  }
}

