"use client" 
import React, { useState } from 'react'
import FormSection from '../_components/FormSection'
import OutputSection from '../_components/OutputSection'
import { TEMPLETE } from '../../_components/TempleteList'
import Templete from '@/app/(data)/Templete'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { chatSession } from '@/utils/AiModel'
import { db } from '@/utils/db'
import { schema } from '@/utils/schema'
import { useUser } from '@clerk/clerk-react'
import moment from 'moment';


interface PROPS{
    params:{
        'templete-slug':string
    }
}

export default function CreateNewContent(props:PROPS) {
    const selectedTemplete:TEMPLETE|undefined=Templete?.find((item)=>item.slug==props.params['templete-slug'])
    const [loading, setloading]=useState(false)
    const {user}=useUser()
    const [AiOutput, setAiOutput]=useState<string>()
    const GenerateAIcontent=async (formdata:any)=>{
      setloading(true)
      const selectedPrompt=selectedTemplete?.aiPrompt
      const finalPrompt=JSON.stringify(formdata)+", "+selectedPrompt;
      const result=await chatSession.sendMessage(finalPrompt)
      setAiOutput(result?.response.text())
      await SaveinDB(formdata,selectedTemplete?.slug,result?.response.text())
      setloading(false)
    }

    const SaveinDB=async(formdata:any, slug:any, AiOutput:string)=>{
      const result=await db.insert(schema).values({
        formdata:formdata,
        templeteSlug:slug,
        aiResponse:AiOutput,
        createdBy: user?.primaryEmailAddress?.emailAddress || '',
        createdAt: moment().format('DD/MM/YYYY')

      })
      console.log(result);
      
    }


  return (
    <div className='p-5 '>
      <Link href={"/dashboard"}>
      <Button> <ArrowLeft/> Back </Button>
      </Link>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-5 pt-5'>
      <FormSection selectedTemplete={selectedTemplete} loading={loading} userForminput={(v:any)=>GenerateAIcontent(v)
      }/>
      <div className='col-span-2'>
      <OutputSection AiOutput={AiOutput || ""} />
      </div>
    </div>
    </div>
  )
}
