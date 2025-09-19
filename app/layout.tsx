import React from 'react';
import { Inter } from 'next/font/google';
import './globals.css';
import { BottomNav } from '@/components/ui/bottom-nav';
import { Sidebar } from '@/components/ui/sidebar';
import { ServiceWorkerRegistration } from '@/components/service-worker-registration';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'SmartPriemkaPro',
  description: 'Property Inspection Mobile App',
  manifest: '/manifest.json',
  themeColor: '#14b8a6',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ServiceWorkerRegistration />
        <div className="min-h-screen bg-background">
          <Sidebar />
          <main className="lg:ml-64 pb-16 lg:pb-0">
            <div className="container mx-auto px-4 py-6 max-w-screen-md lg:max-w-none">
              {children}
            </div>
          </main>
          <BottomNav />
        </div>
      </body>
    </html>
  );
}
