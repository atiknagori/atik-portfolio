import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

const metaTitle = 'Expert Frontend Web Developer';
const metaDescription =
  'I specialize in building high-converting WooCommerce stores, bespoke custom WordPress themes, and lightning-fast websites that rank high on Google and drive real business results.';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://atiknagori.com'),
  title: metaTitle,
  description: metaDescription,
  authors: [{ name: 'Atik Nagori' }],
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    url: '/',
    title: metaTitle,
    description: metaDescription,
    siteName: 'Atik Nagori Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: metaTitle,
    description: metaDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
