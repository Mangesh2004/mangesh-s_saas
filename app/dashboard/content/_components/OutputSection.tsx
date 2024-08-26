"use client"
import React from 'react';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';

interface Props {
  AiOutput: string;
}

export default function OutputSection({ AiOutput }: Props) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(AiOutput);
      alert('Content copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="shadow-lg border rounded-lg">
      <div className="flex justify-between items-center p-5">
        <h2>Your result</h2>
        <Button onClick={handleCopy}>
          <Copy /> Copy
        </Button>
      </div>
      <div className="p-5">
        <p>{AiOutput}</p>
      </div>
    </div>
  );
}
