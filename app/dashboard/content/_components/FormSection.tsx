"use client"
import React, { useState } from 'react'
import { TEMPLETE } from '../../_components/TempleteList'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Loader2Icon } from 'lucide-react'

interface PROPS {
  selectedTemplete?: TEMPLETE
  userForminput: any
  loading: boolean
}

export default function FormSection({ selectedTemplete, userForminput, loading }: PROPS) {

  const [formdata, setformdata] = useState<any>()

  const handleInputChange = (event: any) => {
    const { name, value } = event.target
    setformdata({ ...formdata, [name]: value })
  }

  const onSubmit = (e: any) => {
    e.preventDefault()
    userForminput(formdata)
  }

  return (
    <div className='p-5 shadow-md border rounded-lg'>
      {/* @ts-ignore */}
      <Image src={selectedTemplete?.icon} alt='icon' width={70} height={70} />

      <h2 className='font-bold text-3xl '> {selectedTemplete?.name} </h2>
      <p> {selectedTemplete?.desc} </p>
      <form action="" className='mt-6' onSubmit={onSubmit}>
        {selectedTemplete?.form?.map((item, index) => (
          <div className='my-2 flex flex-col gap-2 mb-7' key={index}>
            <label htmlFor=""> {item.label} </label>
            {
              item.field === 'input' ?
                <Input name={item.name} required={item?.required} onChange={handleInputChange} /> :
                item.field === 'textarea' ?
                  <Textarea name={item.name} onChange={handleInputChange} /> : null
            }
          </div>
        ))}
        <Button className='w-full py-6' type='submit' disabled={loading}> {loading && <Loader2Icon className='animate-spin' />} Generate content</Button>
      </form>
    </div>
  )
}
