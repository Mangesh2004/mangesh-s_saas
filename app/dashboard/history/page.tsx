"use client"
import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { getUserHistory } from '@/utils/history';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface HistoryEntry {
  id: number;
  formdata: string;
  aiResponse: string;
  templeteSlug: string;
  createdAt: string;
}

const HistoryPage: React.FC = () => {
  const { user } = useUser();
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchHistory = async () => {
      if (user?.primaryEmailAddress?.emailAddress) {
        const userEmail = user.primaryEmailAddress.emailAddress;
        const historyData:any = await getUserHistory(userEmail);
        setHistory(historyData);
      }
      setLoading(false);
    };

    fetchHistory();
  }, [user]);

  if (!user?.id) {
    return <p>You need to be logged in to view this page.</p>;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (history.length === 0) {
    return <p>No history found.</p>;
  }

  return (
    <div className="p-5">
      <Link href="/dashboard">
        <Button>Back to Dashboard</Button>
      </Link>
      <h1 className="text-2xl font-bold mt-5">Your History</h1>
      <ul className="mt-4 space-y-4">
        {history.map((entry) => (
          <li key={entry.id} className="p-4 border rounded-lg">
            <p><strong>Form Data:</strong> {entry.formdata}</p>
            <p><strong>AI Response:</strong> {entry.aiResponse}</p>
            <p><strong>Template:</strong> {entry.templeteSlug}</p>
            <p><strong>Date:</strong> {entry.createdAt}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HistoryPage;
