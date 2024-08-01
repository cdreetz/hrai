'use client'

import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function JobButtonLink({ id }: { id: string }) {
  return (
    <Button asChild>
      <Link href={`/job/${id}`}>Job</Link>
    </Button>
  );
}

export function ApplicantButtonLink({ id }: { id: string }) {
  return (
    <Button asChild>
      <Link href={`/applicant-details/${id}`}>Details</Link>
    </Button>
  );
}

export type Applicant = {
  id: string
  amount: number
  status: string 
  email: string
  link: string
}

export const applicantcolumns: ColumnDef<Applicant>[] = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
]

export type JobApplicant = {
  id: string
  first_name: string
  last_name: string
  email: string
  link: string
}

export const jobapplicantcolumns: ColumnDef<Applicant>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "first_name",
    header: "First Name",
  },
  {
    accessorKey: "last_name",
    header: "Last Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "link",
    header: "Link",
    cell: ({ row }) => <ApplicantButtonLink id={row.original.id} />,
  }
]

export type JobPost = {
  job_id: string
  role: string
  link: string
}

export const jobcolumns: ColumnDef<JobPost>[] = [
  {
    accessorKey: "job_id",
    header: "Job ID",
  },
  {
    accessorKey: "title",
    header: "Role",
  },
  {
    accessorKey: "link",
    header: "Link",
    cell: ({ row }) => <JobButtonLink id={row.original.job_id} />,
  },
]

