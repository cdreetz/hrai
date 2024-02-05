// pages/jobs/[id].js
import React from 'react';
import JobPost from '../../components/JobPost';
import { jobData } from '../../data/jobs';


export default function JobPage() {
  return (
    <>
      {jobData.map((job, index) => (
        <JobPost key={index} job={job} />
      ))}
    </>
  )
}
