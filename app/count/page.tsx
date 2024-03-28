// app/count/page.tsx
import { createClient } from "@/utils/supabase/client"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


interface DataCardProps {
  title: string;
  description: string;
  content: number;
  minWidth?: string;
}

function DataCard({ title, description, content, minWidth = '250px' }: DataCardProps) {
  return (
    <Card className={`min-w-[${minWidth}] flex-grow`}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{content}</CardContent>
    </Card>
  );
}

async function CountApplicants() {
  const supabase = createClient()
  const { count, error } = await supabase
    .from('applicants_table')
    .select('*', { count: 'exact', head: true })

  if (error) throw error;
  if (count === null) throw new Error("Count is null");

  return (
    <div className="flex flex-row justify-center items-center space-x-4 w-full">
      <DataCard title="Total Applicants" description="All applicants before filtering." content={count} />
    </div>
  )
}

function TopCards() {
  return (
    <div className="flex flex-row justify-center items-center space-x-4 w-full">
      <DataCard title="Total Applicants" description="All applicants before filtering." content="1000" />
    </div>
  );
}

export default function CountsPage() {
  return (
    <div className="m-4 w-1/4">
      <CountApplicants />
    </div>
  )
}