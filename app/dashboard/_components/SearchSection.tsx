import { Search } from 'lucide-react'
import React from 'react'

export default function SearchSection({onSearchInput}:any) {
  return (
    <div className='p-10 bg-gradient-to-br from-purple-600 via-purple-700 to-blue-600 text-white flex flex-col justify-center items-center'>
      <h2 className='text-3xl'>Browse all elements</h2>
      <p>What would you like to create today</p>
      <div className='w-full flex items-center justify-center '>
        <div className='flex gap-2 items-center p-2 border rounded-2xl my-5 bg-white w-[50%]'>
            <Search className='text-purple-600'/>
            <input type="text" placeholder='Search' onChange={(event)=>onSearchInput(event.target.value)} className='bg-transparent text-black outline-none'/>
        </div>
      </div>
    </div>
  )
}
