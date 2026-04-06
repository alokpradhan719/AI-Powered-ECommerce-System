'use client';

import React, { ReactNode } from 'react';

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
