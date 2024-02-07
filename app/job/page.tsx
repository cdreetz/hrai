// pages/jobs/[id].js
import React from 'react';
import JobPost from '../../components/JobPost';
import { jobData } from '../../data/jobs';
import { Button } from '@/components/ui/button';
import Link from "next/link";

export function ButtonLink() {
  return (
    <Button asChild>
      <Link href="/apply">Apply Here</Link>
    </Button>
  );
}

export default function JobPage() {
  return (
    <>
      {jobData.map((job, index) => (
        <div key={index} className="flex flex-col items-center gap-4">
          <JobPost job={job} />
          <ButtonLink />
        </div>
      ))}
    </>
  )
}
