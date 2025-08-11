import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900" />
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920&text=Abstract+Tech+Pattern')] opacity-5" />

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500/20 rounded-full blur-xl animate-float" />
      <div
        className="absolute top-40 right-20 w-32 h-32 bg-indigo-500/20 rounded-full blur-xl animate-float"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="absolute bottom-20 left-20 w-24 h-24 bg-sky-500/20 rounded-full blur-xl animate-float"
        style={{ animationDelay: "4s" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto text-center">
        <div className="mb-8">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4 mr-2" />
            Data. Science. Business.
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight">
          Geben Sie sich nicht mit{" "}
          <span className="text-gray-400 line-through decoration-red-500 decoration-4">gewöhnlichen Lösungen</span>{" "}
          zufrieden.
        </h1>

        <div className="mb-8">
          <p className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-400 via-sky-400 to-indigo-400 bg-clip-text text-transparent">
            Sie suchen "The Coati Solution" ✨
          </p>
        </div>

        <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
          Wir verwandeln Daten in leistungsstarke digitale Lösungen. Spezialisiert auf Web-Entwicklung, Dashboards und
          maßgeschneiderte Software, die Ihr Unternehmen voranbringt.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Link href="#contact" passHref legacyBehavior>
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 group"
            >
              Projekt starten
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link href="#services" passHref legacyBehavior>
            <Button
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold rounded-full backdrop-blur-sm bg-transparent"
            >
              Unsere Leistungen
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
