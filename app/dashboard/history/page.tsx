"use client";
import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { getUserHistory } from '@/utils/history'; // Adjust the path if needed
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const HistoryPage = () => {
  const { user } = useUser();
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      if (user?.primaryEmailAddress?.emailAddress) {
        const userEmail = user.primaryEmailAddress.emailAddress;
        const historyData = await getUserHistory(userEmail);
        setHistory(historyData);
      }
      setLoading(false);
    };

    fetchHistory();
  }, [user]);

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
