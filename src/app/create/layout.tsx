import React from 'react'
import { DocketDataProvider } from '@/create/DocketDataProvider'

export default function CreateDocsLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    return (
      <DocketDataProvider>
        <section>
          {/* Include shared UI here e.g. a header or sidebar */}
          <nav></nav>
          {children}
        </section>
      </DocketDataProvider>
    )
  }