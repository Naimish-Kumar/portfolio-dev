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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Inter:wght@300;400;500;600;700;800;900&family=Kalam:wght@400;700&family=Playfair+Display:ital,wght@0,500;0,600;0,700;0,900;1,400;1,600;1,700&family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Syne:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#070913] text-slate-100 antialiased min-h-screen selection:bg-indigo-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
