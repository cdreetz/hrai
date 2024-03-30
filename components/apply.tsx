'use client'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { useState  } from "react";
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
//import { createClient } from "@/utils/supabase/server";
//import { cookies } from "next/headers";



const formSchema = z.object({
  firstname: z.string().min(3).max(20),
  lastname: z.string().min(3).max(30),
  email: z.string().min(5).max(30),
  resume: z.instanceof(File).optional(),
})



export default function ApplicationForm({ jobId }: { jobId?: number }) {
  const [uploading, setUploading] = useState(false);
  //const cookieStore = cookies()
  //const supabase = createClient(cookieStore);
  const supabase = createClient();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      resume: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setUploading(true);
    let resumeUrl = null;

    if (values.resume) {
      const file = values.resume;
      const fileExtension = file.name.split('.').pop();
      const resumePath = `public/${values.email}_resume.${fileExtension}`;
      const { error: uploadError } = await supabase
        .storage
        .from('applicant_files')
        .upload(resumePath, file);

      if (uploadError) {
        console.error('Error uploading resume', uploadError);
        setUploading(false);
        return;
      }

      resumeUrl = resumePath;
    }

    const { data, error } = await supabase
      .from('applicants_table')
      .insert([
        {
          first_name: values.firstname,
          last_name: values.lastname,
          email: values.email,
          job_id: jobId,
          resume_url: resumeUrl,
        }
      ]);

    setUploading(false);
  
    if (error) {
      console.error('Error inserting data into Supabase', error);
    } else {
      console.log('Data inserted successfully', data);
      form.reset();
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto mt-4">
      <div className="mx-auto">
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
          <FormField
            control={form.control}
            name="resume"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Resume</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    disabled={uploading}
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        field.onChange(e.target.files[0]);
                      }
                    }}
                  />
                </FormControl>
                <FormDescription>
                  Please upload your resume.
                </FormDescription>
              </FormItem>
            )}
          />
          <Button type="submit" disabled={uploading}>
            {uploading ? 'Submitting...' : 'Submit'}
          </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}