
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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ninetech.com.tr'; // Replace with your actual domain in .env.local or directly

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Ninetech Solutions',
    template: '%s | Ninetech Solutions',
  },
  description: 'Portfolio of a tech expert specializing in embedded systems, IoT, and web development.',
  openGraph: {
    title: 'Ninetech Solutions',
    description: 'Expert in embedded systems, IoT, and web development.',
    url: siteUrl,
    siteName: 'Ninetech Solutions',
    images: [
      {
        url: '/og-image.png', // Path relative to the public folder or an absolute URL
        width: 1200,
        height: 630,
        alt: 'Ninetech - Tech Solutions',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ninetech Solutions',
    description: 'Expert in embedded systems, IoT, and web development.',
    images: [`${siteUrl}/og-image.png`], // Absolute URL for Twitter images
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
  icons: {
    icon: '/favicon.ico', // Place favicon.ico in src/app/
    apple: '/apple-touch-icon.png', // Place apple-touch-icon.png in src/app/
    // You can add other sizes or types here:
    // shortcut: '/shortcut-icon.png',
    // other: [
    //   { rel: 'icon', type: 'image/png', sizes: '32x32', url: '/favicon-32x32.png' },
    //   { rel: 'icon', type: 'image/png', sizes: '16x16', url: '/favicon-16x16.png' },
    // ],
  },
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
