import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css'; // Ensure global styles are applied
import { ClerkProvider } from '@clerk/nextjs';

const outfit = Outfit({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Ai',
  description: 'Developed by Mangesh',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={outfit.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
