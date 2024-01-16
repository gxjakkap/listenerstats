import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { CookiesProvider } from 'next-client-cookies/server' // will remove when next app dir officially support cookies on client side
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ListenerStats',
  description: 'Your music obsession, visualized.',
  openGraph: {
    title: 'ListenerStats',
    description: 'Your music obsession, visualized.',
    url: 'https://lstats.guntxjakka.me',
    siteName: 'ListenerStats',
    images: [
      {url: 'https://cdn.statically.io/og/ListenerStats.jpg', width: 2048, height: 1170}
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ListenerStats',
    description: 'Your music obsession, visualized.',
    creator: '@guntxjakka',
    images: 'https://cdn.statically.io/og/ListenerStats.jpg'
  },
  metadataBase: new URL('https://lstats.guntxjakka.me')
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <CookiesProvider>
        <body className={inter.className}>
          <div className="min-h-screen flex flex-col">
            <div className="mb-auto">
              {children}
            </div>
            <footer className="footer footer-center p-4 bg-base-300 text-base-content">
              <aside>
                <p>Copyright © 2024 - Jakkaphat Ch.</p>
              </aside>
            </footer>
            <Analytics />
          </div>
        </body>
      </CookiesProvider>
    </html>
  )
}
