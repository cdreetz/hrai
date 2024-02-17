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
import { useRouter } from "next/router";

const supabase = createClient()


const formSchema = z.object({
  firstname: z.string().min(3).max(20),
  lastname: z.string().min(3).max(30),
  email: z.string().min(5).max(30),
})


export default function ApplicationForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
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
            first_name: values.firstname,
            last_name: values.lastname,
            email: values.email
          }
        ]);
      if (error) {
        console.error('Error inserting data into Supabase', error);
      } else if (data) {
        console.log('Data inserted successfully', data);
        const applicationId = (data as { id: number }[])[0].id;
        router.push({
          pathname: '/chat',
          query: { applicationId}
        })
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
          name="firstname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
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
          name="lastname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Your last name" {...field} />
              </FormControl>
              <FormDescription>
                Please enter your last name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Your email" {...field} />
              </FormControl>
              <FormDescription>
                Please enter your email.
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