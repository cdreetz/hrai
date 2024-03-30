// /components/uploadresume.tsx
'use client'

import { ChangeEvent, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/utils/supabase/client";


export default function UploadResume() {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const supabase = createClient();

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    try{
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select a file to upload.')
      }

      const file = event.target.files[0];
      const { data, error: uploadError } = await supabase
        .storage
        .from('resumes')
        .upload(`public/${file.name}`, file);

      if (uploadError) {
        throw uploadError
      } 

    } catch (error) {
      alert('Error uploading resume')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className='flex flex-col w-1/3 mx-auto space-y-4'>
      <Label htmlFor="resume" className='cursor-pointer'></Label>
      <Input
        id="resume"
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={handleFileChange}
        disabled={uploading}
      />
    </div>
  );
}
