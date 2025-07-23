import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Coati Solutions - Data. Science. Business.",
  description:
    "Wir entwickeln modernste Webanwendungen und beeindruckende Dashboards, die Ihr Unternehmen transformieren. Von der Idee bis zur Umsetzung - wir machen es möglich.",
  keywords: "Web-Entwicklung, Dashboard-Lösungen, Software-Entwicklung, React, Next.js, TypeScript",
  authors: [{ name: "Coati Solutions" }],
  openGraph: {
    title: "Coati Solutions - Data. Science. Business.",
    description: "Modernste Webanwendungen und beeindruckende Dashboards für Ihr Unternehmen",
    type: "website",
    locale: "de_DE",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
