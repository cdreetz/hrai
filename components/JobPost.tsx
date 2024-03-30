/**
 * v0 by Vercel.
 * @see https://v0.dev/t/34gn9SLmO3o
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"


interface Job {
  title: string;
  tags: string[];
  highlights: string;
  requirements: string[];
  description: string;
  benefitsDescription: string;
}

export default function JobPost({ job }: { job: Job }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
      <div className="flex justify-between items-start mb-4 border-b border-gray-200 pb-4">
        <div>
          <h2 className="text-2xl font-bold">{job.title}</h2>
        </div>
      </div>
      <div className="flex items-center space-x-2 my-4 border-b border-gray-200 pb-4">
        {job?.tags?.map((tags, index) => (
          <Badge key={index} variant="secondary">{tags}</Badge>
        )) || []}
      </div>
      <div className="my-4 border-b border-gray-200 pb-4">
        <h3 className="text-lg font-semibold">Job highlights</h3>
        <p className="text-sm text-gray-500">{job.highlights}</p>
      </div>
      <div className="my-4 border-b border-gray-200 pb-4">
        <h4 className="font-semibold">Qualifications</h4>
        <ul className="list-disc pl-5 space-y-1">
          {job?.requirements?.map((requirement, index) => (
            <li key={index}>{requirement}</li>
          )) || []}
        </ul>
      </div>
      <div className="my-4 border-b border-gray-200 pb-4">
        <h4 className="font-semibold">Responsibilities</h4>
        <ul className="list-disc pl-5 space-y-1">
          <li>{job.description}</li>
        </ul>
      </div>
      <div className="my-4">
        <h3 className="text-lg font-semibold">Benefits</h3>
        <p className="text-sm text-gray-500">
          {job.benefitsDescription}
        </p>
      </div>
    </div>
  )
}

