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
  title: z.string().min(3).max(30),
  description: z.string().min(3).max(200),
  highlights: z.string().min(3).max(200),
  qualifications: z.string().min(5).max(200),
  company: z.string().min(3).max(50),
  tags: z.array(z.string()).min(1), // Assuming tags are required and there's at least one
  benefitsDescription: z.string().min(5).max(200),
})



export default function AddJobForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      highlights: "",
      qualifications: "",
      description: "",
      
    },
  })
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Convert comma-separated strings to arrays
    const qualificationsArray = values.qualifications.split(',').map((item: string) => item.trim());

    const { data, error } = await supabase
    .from('jobs_table')
    .insert([
      {
        title: values.title,
        description: values.description,
        summary: values.highlights,
        qualifications: qualificationsArray,
        company: values.company,
        tags: values.tags,
        benefitsDescription: values.benefitsDescription,
      }
    ]);
      if (error) {
        alert('Error inserting data into Supabase'); // Provide user feedback on error
      } else {
        alert('Data inserted successfully'); // Provide user feedback on success
        form.reset();
      }
    }
  
  return (
    <div className="w-1/2 mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
          control={form.control}
          name="title"
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
          name="highlights"
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
          name="description"
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