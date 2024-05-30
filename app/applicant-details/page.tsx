import Image from "next/image"
import Link from "next/link"
import {
  ChevronLeft,
  Home,
  LineChart,
  Package,
  Package2,
  PanelLeft,
  PlusCircle,
  Search,
  Settings,
  ShoppingCart,
  Upload,
  Users2,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import React from "react"
import { createClient } from "@/utils/supabase/server"
import { cookies } from "next/headers"

function Bread() {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <Breadcrumb className="hidden md:flex">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="#">Applicant Details</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </header>
  )
}

function ProductDetailsCard() {
  return (
    <Card x-chunk="dashboard-07-chunk-0">
      <CardHeader>
        <CardTitle>Applicant Details</CardTitle>
        <CardDescription>
          All details on this applicant
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="grid gap-3">
            <Label htmlFor="name">Name: Christian Reetz</Label>
            <Label htmlFor="name">Email: cdreetz@gmail.com</Label>
            <Label htmlFor="name">Role Applied: Founding Engineer</Label>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="description">Notes</Label>
            <Textarea
              id="description"
              defaultValue="Was referred by current employee @"
              className="min-h-32"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}


const ReadOnlyChat: React.FC<{messages: any}> = ({messages}) => {
  return (
    <div className="flex gap-2 flex-col m-10">
      {messages ? JSON.parse(messages).filter((m: { role: string; id: string; content: string; }) => m.role !== 'system').map((m: { role: string; id: string; content: string; }) => (
        <React.Fragment key={m.id}>
          <div className="text-sm">
            <div className="font-bold">{m.role === 'user' ? 'You' : 'Assistant'}:</div>
            <div className="m-2">{m.content}</div>
          </div>
        </React.Fragment>
      )) : 'No data available'}
    </div>
  )
}

async function applicantChatData() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const response = await supabase
    .from('conversations_table')
    .select('messages')
    .eq('conversation_id', '6761f91d-d313-48c7-af43-c97107940bf9')
    .single();

  if (response.error) {
    console.error('Error', response.error.message)
    return <div>Error fetching job details</div>;
  }
  
  if (response.data) {
    const { messages } = response.data;
    return (
      <>
        <div className='mt-20 mb-5 h-full'>
          <ReadOnlyChat messages={messages} />
        </div>
      </>
    )
  }
  
}

async function ScreeningCard() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const response = await supabase
    .from('conversations_table')
    .select('messages')
    .eq('conversation_id', '6761f91d-d313-48c7-af43-c97107940bf9')
    .single();

  if (response.error) {
    console.error('Error', response.error.message)
    return <div>Error fetching job details</div>;
  }
  
  if (response.data) {
    const { messages } = response.data;
    return (
      <Card x-chunk="dashboard-07-chunk-1">
        <CardHeader>
          <CardTitle>Applicant Screening</CardTitle>
          <CardDescription>
            Lipsum dolor sit amet, consectetur adipiscing elit
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ReadOnlyChat messages={messages} />
        </CardContent>
      </Card>
    )
  }
}

function ProductStatusCard() {
  return (
    <Card x-chunk="dashboard-07-chunk-3">
      <CardHeader>
        <CardTitle>Applicant Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="grid gap-3">
            <Label htmlFor="status">Status</Label>
            <Select>
              <SelectTrigger id="status" aria-label="Select status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="screened">Screened</SelectItem>
                <SelectItem value="reviewed">Reviewed</SelectItem>
                <SelectItem value="moving-forward">Moving Forward</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}



function ArchiveProductCard() {
  return (
    <Card x-chunk="dashboard-07-chunk-5">
      <CardHeader>
        <CardTitle>Archive Product</CardTitle>
        <CardDescription>
          Lipsum dolor sit amet, consectetur adipiscing elit.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div></div>
        <Button size="sm" variant="secondary">
          Archive Product
        </Button>
      </CardContent>
    </Card>
  )
}

export default function Dashboard() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Bread />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
            <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
              <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                <ProductDetailsCard />
                <ScreeningCard />
              </div>
              <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                <ProductStatusCard />
                <ArchiveProductCard />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
