import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ListenerStats',
  description: 'View your music streaming stats',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
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
        </div>
      </body>
    </html>
  )
}
