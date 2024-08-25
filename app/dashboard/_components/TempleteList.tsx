import Templete from '@/app/(data)/Templete'
import React, { useEffect, useState } from 'react'
import TempleteCard from './TempleteCard'

export interface TEMPLETE{
    name:string,
    desc:string,
    category:string,
    icon:string,
    aiPrompt:string,
    slug:string,
    form?:FORM[]
}

export interface FORM{
    label:string,
    field:string,
    name:string,
    required?:boolean
}

export default function TempleteList({userSearchInput}:any) {
    const [templeteList, settempleteList]=useState(Templete)
    useEffect(()=>{
        if (userSearchInput) {
            const filterData=Templete.filter(item=>item.name.toLowerCase().includes(userSearchInput.toLowerCase()))
            settempleteList(filterData)
        }
        else{
            settempleteList(Templete)
        }
        
    },[userSearchInput])
  return (
    <div className='grid grid-col-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-5'>
      {templeteList.map((item:TEMPLETE, index:number)=>(
         <TempleteCard {...item}/>
      ))}
    </div>
  )
}
