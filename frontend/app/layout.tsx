import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AcroCoder | Full Stack Developer & Cloud Engineer',
  description: 'Dynamic portfolio of AcroCoder - Senior Full Stack Engineer, Next.js Specialist, and Cloud Architect.',
  keywords: ['Full Stack Developer', 'Next.js', 'React', 'Node.js', 'MySQL', 'Cloud Engineer', 'AcroCoder', 'Portfolio'],
  authors: [{ name: 'AcroCoder' }],
  openGraph: {
    title: 'AcroCoder | Full Stack Developer & Cloud Engineer',
    description: 'Dynamic portfolio featuring full-stack projects, architecture showcases, and tech expertise.',
    url: 'https://dev.acrocoder.com',
    siteName: 'AcroCoder Portfolio',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'AcroCoder Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AcroCoder | Full Stack Developer',
    description: 'Dynamic portfolio featuring full-stack projects, architecture showcases, and tech expertise.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#070913] text-slate-100 antialiased min-h-screen selection:bg-indigo-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
