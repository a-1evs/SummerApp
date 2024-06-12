import React from 'react';
import Header from "@/components/Header"; // Ensure the path is correct
import './globals.css'; // Import your global styles

export const metadata = {
  title: 'Camp Events',
  description: 'Display camp events and information',
};

export default function Layout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-gray-100 text-gray-900">
        <Header />
        <main className="pt-20 p-4">
          {children}
        </main>
      </body>
    </html>
  );
}
