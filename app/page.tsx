import type { Metadata } from "next"
import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { Showcase } from "@/components/showcase"
import { Modules } from "@/components/modules"
import { Features } from "@/components/features"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"

export const metadata: Metadata = {
  alternates: { canonical: "/" },
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <Navigation />
      <main>
        <div id="home">
          <Hero />
        </div>
        <Showcase />
        <div id="modules">
          <Modules />
        </div>
        <div id="services">
          <Services />
        </div>
        <div id="features">
          <Features />
        </div>
        <div id="contact">
          <Contact />
        </div>
      </main>
      <Footer />
    </div>
  )
}
