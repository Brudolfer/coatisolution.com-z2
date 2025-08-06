"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Code, BarChart3, Sparkles } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
      {/* Animierte Hintergrund-Elemente */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-sky-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex items-center justify-center mb-8">
          <div className="bg-gradient-to-r from-white/25 to-white/15 backdrop-blur-sm rounded-full p-8 border border-white/40 shadow-2xl">
            <img src="/images/coati-logo.svg" alt="Coati Solutions Logo" className="h-20 w-auto brightness-0 invert" />
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          <span className="bg-gradient-to-r from-blue-400 via-sky-400 to-indigo-400 bg-clip-text text-transparent">
            Data. Science. Business.
          </span>
          <br />
          Software-Lösungen, die funktionieren
        </h1>

        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
          Wir entwickeln modernste Webanwendungen und beeindruckende Dashboards, die Ihr Unternehmen transformieren. Von
          der Idee bis zur Umsetzung - wir machen es möglich.
        </p>

        {/* Neuer Slogan */}
        <div className="mb-8 p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 max-w-2xl mx-auto">
          <p className="text-lg text-gray-300">
            Warum sich mit <span className="text-gray-400">gewöhnlichen Lösungen</span> zufriedengeben?
          </p>
          <p className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent mt-2">
            Sie verdienen "The Coati Solution" 🚀
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button
            size="lg"
            onClick={() => {
              const contactSection = document.getElementById("contact")
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: "smooth" })
              }
            }}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-2xl hover:shadow-blue-500/25 transition-all duration-300"
          >
            Projekt Starten
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => {
              const servicesSection = document.getElementById("services")
              if (servicesSection) {
                servicesSection.scrollIntoView({ behavior: "smooth" })
              }
            }}
            className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg rounded-full backdrop-blur-sm bg-transparent"
          >
            Unsere Leistungen
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="flex items-center justify-center space-x-3 bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <Code className="w-8 h-8 text-blue-400" />
            <span className="text-white font-semibold text-lg">Web Design</span>
          </div>
          <div className="flex items-center justify-center space-x-3 bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <BarChart3 className="w-8 h-8 text-sky-400" />
            <span className="text-white font-semibold text-lg">Dashboards</span>
          </div>
          <div className="flex items-center justify-center space-x-3 bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <Sparkles className="w-8 h-8 text-indigo-400" />
            <span className="text-white font-semibold text-lg">Individuelle Lösungen</span>
          </div>
        </div>
      </div>
    </section>
  )
}
