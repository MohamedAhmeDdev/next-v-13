'use client';  // is used to declare a boundary between a Server and Client Component modules.

import { useState } from 'react';
import { Button, Callout, Text, TextField } from '@radix-ui/themes'; //its a ui theme provider
import SimpleMDE from "react-simplemde-editor"; //used for input
import "easymde/dist/easymde.min.css";//used for input
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema } from '@/app/validationSchemas';
import { z } from 'zod';
import Spinner from '@/app/components/Spinner'; //this a spinner package for spinners



type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const router = useRouter();
  const {register, control, handleSubmit, formState: { errors }} = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema)
  });

  const [error, setError] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);

const onSubmit = handleSubmit(async (data) => { 
  try {
    setSubmitting(true);
    await axios.post('/api/issues', data); router.push('/issues'); 
  } catch (error) {
    setSubmitting(false);
    setError('An unexpected error occurred.') 
  }
})

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className='mb-5'>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className='space-y-3'
      onSubmit={onSubmit}>
      <TextField.Root>
        <TextField.Input placeholder='Title' {...register('title')} />
      </TextField.Root>
      {errors.title && <Text color="red" as="p">{errors.title.message}</Text>}

      <Controller name="description" control={control}  render={({ field }) => <SimpleMDE placeholder='Description' {...field} />}/>
      {errors.description && <Text color="red" as="p">{errors.description.message}</Text>}

      <Button disabled={isSubmitting} >Submit New Issue {isSubmitting && <Spinner />}</Button>
    </form>
  </div>
  )
}

export default NewIssuePage