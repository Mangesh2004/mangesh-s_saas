"use client";
import React, { useState } from 'react';
import FormSection from '../_components/FormSection';
import OutputSection from '../_components/OutputSection';
import { TEMPLETE } from '../../_components/TempleteList';
import Templete from '@/app/(data)/Templete';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { chatSession } from '@/utils/AiModel';
import { db } from '@/utils/db';
import { schema } from '@/utils/schema';
import moment from 'moment';
import { useUser } from '@clerk/nextjs';

interface PROPS {
  params: {
    'templete-slug': string;
  };
}

export default function CreateNewContent({ params }: PROPS) {
  const selectedTemplete = Templete.find((item) => item.slug === params['templete-slug']);
  const [loading, setLoading] = useState(false);
  const { user } = useUser(); // Use useUser hook to fetch user data
  const [AiOutput, setAiOutput] = useState<string>();

  const GenerateAIcontent = async (formData: any) => {
    setLoading(true);
    const selectedPrompt = selectedTemplete?.aiPrompt;
    const finalPrompt = JSON.stringify(formData) + ", " + selectedPrompt;
    const result = await chatSession.sendMessage(finalPrompt);
    const aiResponse = await result?.response.text();
    setAiOutput(aiResponse);
    await SaveInDB(formData, selectedTemplete?.slug, result?.response.text());
    setLoading(false);
  };

  const SaveInDB = async (formData: any, slug: string | undefined, AiOutput: string) => {
    if (!user) return; 
    const result = await db.insert(schema).values({
      formdata: formData,
      templeteSlug: slug || '',
      aiResponse: AiOutput,
      createdBy: user?.primaryEmailAddress?.emailAddress || "",
      createdAt: moment().format('DD/MM/YYYY'),
    });
    console.log(result);
  };

  return (
    <div className='p-5'>
      <Link href={"/dashboard"}>
        <Button><ArrowLeft /> Back</Button>
      </Link>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-5 pt-5'>
        <FormSection selectedTemplete={selectedTemplete} loading={loading} userForminput={(v: any) => GenerateAIcontent(v)} />
        <div className='col-span-2'>
          <OutputSection AiOutput={AiOutput || ""} />
        </div>
      </div>
    </div>
  );
}
