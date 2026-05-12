import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Engineering Desk',
  description: 'Interactive portfolio concept'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
