import type { Metadata } from 'next';

import './globals.css';
import Provider from './Provider';

export const metadata: Metadata = {
  title: 'OcrDemo',
  description: 'Optical Character Recognition Demo Web App',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
