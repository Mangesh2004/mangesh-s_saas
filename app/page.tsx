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
    <div className="h-screen flex items-center justify-center bg-black text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8">Welcome to Our Service</h1>
        <Button onClick={handleLoginClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Log In
        </Button>
      </div>
    </div>
  );
}
