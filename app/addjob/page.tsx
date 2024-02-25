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
  highlights: z.string().min(3).max(200),
  qualifications: z.string().min(5).max(200),
  responsibilities: z.string().min(5).max(200),
})



export default function AddJobForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      highlights: "",
      qualifications: "",
      responsibilities: "",
      
    },
  })
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Convert comma-separated strings to arrays
    const qualificationsArray = values.qualifications.split(',').map(item => item.trim());

    const { data, error } = await supabase
      .from('jobs_table') // Make sure to use the correct table name
      .insert([
        {
          title: values.title,
          highlights: values.highlights, // Use the converted array
          qualifications: qualificationsArray, // Use the converted array
          responsibilities: values.responsibilities, // Use the converted array
        }
      ]);

    if (error) {
      console.error('Error inserting data into Supabase', error);
    } else {
      console.log('Data inserted successfully', data);
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