
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google'; // Assuming Geist is similar to Inter
import './globals.css';
import { Toaster } from "@/components/ui/toaster"; // Import Toaster
import { ThemeProvider } from '@/contexts/ThemeContext'; // Import ThemeProvider

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://placehold.co'; // Replace with your actual domain in .env.local or directly

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Ninetech Portfolio',
    template: '%s | Ninetech Portfolio',
  },
  description: 'Portfolio of a tech expert specializing in embedded systems, IoT, and web development.',
  openGraph: {
    title: 'Ninetech Portfolio',
    description: 'Expert in embedded systems, IoT, and web development.',
    url: siteUrl,
    siteName: 'Ninetech Portfolio',
    images: [
      {
        url: '/og-image.png', // Replace with your actual OG image path
        width: 1200,
        height: 630,
        alt: 'Ninetech Portfolio - Tech Solutions',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ninetech Portfolio',
    description: 'Expert in embedded systems, IoT, and web development.',
    // images: ['/twitter-image.png'], // Replace with your actual Twitter image path
    // creator: '@yourtwitterhandle', // Replace with your Twitter handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  // icons: { // You can add various icon sizes here
  //   icon: '/favicon.ico',
  //   apple: '/apple-touch-icon.png',
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        <ThemeProvider>
          {children}
          <Toaster /> {/* Add Toaster here */}
        </ThemeProvider>
      </body>
    </html>
  );
}
