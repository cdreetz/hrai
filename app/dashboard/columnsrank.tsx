'use client'

import { ColumnDef } from "@tanstack/react-table"

export type PaymentRank = {
  id: string
  amount: number
  status: string 
  email: string
  rank: number
}

export const columnsrank: ColumnDef<PaymentRank>[] = [
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
  {
    accessorKey: "rank",
    header: "Rank",
  },
]