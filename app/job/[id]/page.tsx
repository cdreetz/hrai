// pages/jobs/[id].js
import JobPost from '../../../components/JobPost';
import ApplicationForm from '../../../components/apply';
import { createClient } from '@/utils/supabase/server'; 
import { cookies } from 'next/headers';


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

interface Params {
  id: number;
}

export default async function Job({ params }: { params: Params }) {
  const { id } = params;
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const response = await supabase
    .from('jobs_table')
    .select('*')
    .eq('job_id', id)
    .single();


  if (response.error) {
    console.error('Error fetching jobs details:', response.error.message);
    return <div>Error fetching job details: {response.error.message}</div>;
  }

  if (response.data) {
    return (
      <div style={{ marginTop: '60px' }}>
        <JobPost job={response.data} />
        <ApplicationForm jobId={id} />
      </div>
    );
  } else {
    return <div>Job details not found.</div>
  }
}

