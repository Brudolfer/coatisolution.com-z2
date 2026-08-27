import type React from "react"
import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { CookieBanner } from "@/components/cookie-banner" // Import the CookieBanner

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "BI-Ratio - Data. Science. Business.",
  description:
    "Geben Sie sich nicht mit Standard-Lösungen zufrieden. Wir verwandeln Daten in leistungsstarke digitale Lösungen. Spezialisiert auf Web-Entwicklung, Dashboards und maßgeschneiderte Software.",
  keywords:
    "Web-Entwicklung, Dashboard, Software-Entwicklung, Data Science, Business Intelligence, React, Next.js, FastAPI, Python, BI-Ratio",
  authors: [{ name: "BI-Ratio" }],
  creator: "BI-Ratio",
  publisher: "BI-Ratio",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "https://thecoatisolution.com",
    siteName: "BI-Ratio",
    title: "BI-Ratio - Data. Science. Business.",
    description:
      "Geben Sie sich nicht mit Standard-Lösungen zufrieden. Wir verwandeln Daten in leistungsstarke digitale Lösungen.",
  },
  twitter: {
    card: "summary_large_image",
    title: "BI-Ratio - Data. Science. Business.",
    description: "Sie verdienen BI-Ratio - nicht irgendeine Standard-Lösung.",
    creator: "@TheCoatiSolution",
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
          <CookieBanner /> {/* Add the CookieBanner here */}
        </ThemeProvider>
      </body>
    </html>
  )
}
