import { Button } from "@/components/ui/button";
import Link from "next/link"

export function AddJobButton() {
  return (
    <div className="m-4">
      <Button asChild>
        <Link href="/addjob">Add Job</Link>
      </Button>
    </div>
  )
}