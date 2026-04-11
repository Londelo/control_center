/**
 * Root layout for Next.js app
 */

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Control Center V2',
  description: 'Personal productivity system with Daily Rituals and Todo System',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
