// pages/jobs/[id].js
import React from 'react';
import JobPost from '../../../components/JobPost';
import { Button } from '@/components/ui/button';
import Link from "next/link";
import { createClient } from '@/utils/supabase/client'; 
import { notFound } from 'next/navigation';

const supabase = createClient();

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

export async function generateStaticParams() {
  const { data: jobs } = await supabase
    .from('jobs_table')
    .select('id')

  return (jobs || []).map(({ id }) => ({
    params: {
      id: id.toString(),
    }
  }))
}

export default async function Job({ params: { id } }: { params: { id: string } }) {
  const { data: job } = await supabase
  .from('jobs_table')
  .select().match({ id })
  .single()

  if (!job) {
    notFound()
  }

  //return <JobPost job={job} />
  //return <pre>{JSON.stringify(job, null, 2)}</pre>
  return (
    <div className="flex flex-col items-center gap-4">
      <JobPost job={job} />
      <ButtonLink />
    </div>
  )
}
