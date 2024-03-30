// pages/jobs/[id].js
'use client'
import React from 'react';
import JobPost from '../../../components/JobPost';
import { createClient } from '@/utils/supabase/client'; 
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
interface Params {
  id: number;
}

export default async function Job({ params }: { params: Params }) {
  const { id } = params;
  const supabase = createClient();
  const response = await supabase
    .from('jobs_table')
    .select('*')
    .eq('id', id)
    .single();


  if (response.error) {
    console.error('Error fetching jobs details:', response.error.message);
    return <div>Error fetching job details: {response.error.message}</div>;
  }

  if (response.data) {
    return (
      <>
        <JobPost job={response.data} />
        <ApplicationForm jobId={id} />
      </>
    );
  } else {
    return <div>Job details not found.</div>
  }
}


