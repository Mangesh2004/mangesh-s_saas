"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button'; // Adjust the path as necessary

export default function LandingPage() {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push('/dashboard'); // Redirect to the Clerk sign-in page
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-slate-600 via-violet-700 to-blue-600 text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold ">Welcome to my SAAS application </h1>
        <h3 className='text-white p-5'>Devoloped by Mangesh Waybhase</h3>
        <Button onClick={handleLoginClick} className="bg-transparent border rounded-lg hover:bg-white text-white hover:text-black font-bold py-2 px-4 ">
          Log In
        </Button>
      </div>
    </div>
  );
}
