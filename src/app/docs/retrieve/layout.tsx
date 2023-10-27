import React from 'react';
import { UserDocsDataProvider  } from '@/docs/retrieve/UserDocsDataProvider';
export default function CreateDocsLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    return (
    <UserDocsDataProvider>
        <section>
          {/* Include shared UI here e.g. a header or sidebar */}
          {children}
        </section>
    </UserDocsDataProvider>
    )
  }