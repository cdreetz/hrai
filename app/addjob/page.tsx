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
  requirements: z.string().min(5).max(200),
  company: z.string().min(3).max(50),
  tags: z.string().min(3).max(50),
  benefitsDescription: z.string().min(5).max(200),
})

async function currentUser() {
  console.log('Fetching current user')
  const { data: { user } = {} } = await supabase.auth.getUser()
  return user && user.id ? user.id : null
}

export default function AddJobForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    // resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      highlights: "",
      requirements: "",
      description: "",
      
    },
  })
  
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log('Form onSubmit triggered', values)
    const userId = await currentUser();

    if (!userId) {
      alert('User not authenticated. Please login.');
      return;
    }

    // Convert comma-separated strings to arrays
    const requirementsArray = values.requirements.split(',').map((item: string) => item.trim());
    const tagsArray = values.tags.split(',').map(tag => tag.trim());


    const { data, error } = await supabase
    .from('jobs_table')
    .insert([
      {
        title: values.title,
        description: values.description,
        highlights: values.highlights,
        requirements: requirementsArray,
        tags: tagsArray,
        benefitsDescription: values.benefitsDescription,
        user_id: userId,
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
      <form onSubmit={(e) => { e.preventDefault(); form.handleSubmit(onSubmit)(e); }} className="space-y-8">
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
          name="requirements"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Requirements</FormLabel>
              <FormControl>
                <Input placeholder="Requirements" {...field} />
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
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Description" {...field} />
              </FormControl>
              <FormDescription>
                Please a description.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <Input placeholder="Tags" {...field} />
              </FormControl>
              <FormDescription>
                Please add some tags.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="benefitsDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Benefits Description</FormLabel>
              <FormControl>
                <Input placeholder="Benfits" {...field} />
              </FormControl>
              <FormDescription>
                Please add a benefits description.
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