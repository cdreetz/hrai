'use client'

import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function ButtonLink() {
  return (
    <Button asChild>
      <Link href="/job">Job</Link>
    </Button>
  );
}

export type Applicant = {
  id: string
  amount: number
  status: string 
  email: string
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

export type JobPost = {
  id: string
  role: string
  link: string
}

export const jobcolumns: ColumnDef<JobPost>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "link",
    header: "Link",
    cell: () => <ButtonLink />,
  },
]

