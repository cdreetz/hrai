"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { createClient } from "@/utils/supabase/client";


const supabase = createClient()


const formSchema = z.object({
  roletitle: z.string().min(3).max(20),
  jobhighlights: z.string().min(3).max(100),
  qualifications: z.string().min(5).max(100),
  responsibilities: z.string().min(5).max(100),
})



export default function ApplicationForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      roletitle: "",
      jobhighlights: "",
      qualifications: "",
      responsibilities: "",
      
    },
  })
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { count } = await supabase
      .from('applicants_table')
      .select('*', { count: 'exact' })
      .single();

    if (count !== null && count !== undefined) {
      const nextId = count + 1;

      const { data, error } = await supabase
        .from('applicants_table')
        .insert([
          {
            id: nextId,
            role_title: values.roletitle,
            job_highlights: values.jobhighlights,
            qualifications: values.qualifications,
            responsibilities: values.qualifications,

          }
        ]);
      if (error) {
        console.error('Error inserting data into Supabase', error);
      } else {
        console.log('Data inserted successfully', data);
      }
    } else {
      console.error('Could not retrieve the current applicant count')
    }
  }
  return (
    <div className="w-1/2 mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
          control={form.control}
          name="roletitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role Title</FormLabel>
              <FormControl>
                <Input placeholder="Machine Learning Engineer" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="jobhighlights"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Highlights</FormLabel>
              <FormControl>
                <Input placeholder="Work on cutting edge ML applications" {...field} />
              </FormControl>
              <FormDescription>
                Please enter some of the job highlights.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="qualifications"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Qualifications</FormLabel>
              <FormControl>
                <Input placeholder="Qualifications" {...field} />
              </FormControl>
              <FormDescription>
                Please add qualifications.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="responsibilities"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Responsibilities</FormLabel>
              <FormControl>
                <Input placeholder="Responsiblities" {...field} />
              </FormControl>
              <FormDescription>
                Please add responsibilities.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  )
}