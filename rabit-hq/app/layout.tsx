import './globals.css'
import React from 'react'

export const metadata = {
  title: 'Rabit HQ',
  description: 'RabitHQ - internal command center and investor portal',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}
