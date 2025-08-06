import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Award, Coffee, Heart } from 'lucide-react'

export function About() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Über <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Uns</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Lernen Sie das Team hinter Coati Solutions kennen - zwei leidenschaftliche Entwickler mit einer Vision
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Leon Peter - Frontend */}
          <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 group">
            <CardContent className="p-8 text-center">
              <div className="relative mb-6">
                <div className="w-48 h-48 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 p-1">
                  <div className="w-full h-full rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                    <img
                      src="/placeholder.svg?height=200&width=200"
                      alt="Leon Peter Foto"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-r from-blue-500 to-sky-500 rounded-full flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Leon Peter</h3>
              <p className="text-blue-400 font-semibold mb-4">Co-Founder & Frontend Designer</p>
              <p className="text-gray-300 leading-relaxed mb-6">
                Spezialist für Frontend-Entwicklung, UI/UX Design und Web-Apps. Mit über 5 Jahren Erfahrung in der
                Entwicklung moderner Webanwendungen bringt er kreative Lösungen und benutzerfreundliche Designs in jedes
                Projekt.
              </p>
            </CardContent>
          </Card>

          {/* Simon Frey - Backend */}
          <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 group">
            <CardContent className="p-8 text-center">
              <div className="relative mb-6">
                <div className="w-48 h-48 mx-auto rounded-full bg-gradient-to-r from-sky-500 to-blue-500 p-1">
                  <div className="w-full h-full rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                    <img
                      src="/placeholder.svg?height=200&width=200"
                      alt="Simon Frey Foto"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full flex items-center justify-center">
                  <Coffee className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Simon Frey</h3>
              <p className="text-sky-400 font-semibold mb-4">Co-Founder & Backend Architect</p>
              <p className="text-gray-300 leading-relaxed mb-6">
                Experte für Backend-Entwicklung, FastAPI, Datenbank-Design und Cloud-Infrastructure. Verantwortlich für
                skalierbare Lösungen und Systemarchitektur mit einem Fokus auf Performance, Sicherheit und moderne
                API-Entwicklung.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Gemeinsame Werte */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-sky-500 flex items-center justify-center">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-white font-semibold mb-2">Teamwork</h4>
            <p className="text-gray-300 text-sm">Gemeinsam erreichen wir mehr</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 flex items-center justify-center">
              <Award className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-white font-semibold mb-2">Qualität</h4>
            <p className="text-gray-300 text-sm">Höchste Standards in allem</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 flex items-center justify-center">
              <Coffee className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-white font-semibold mb-2">Innovation</h4>
            <p className="text-gray-300 text-sm">Immer am Puls der Zeit</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-white font-semibold mb-2">Leidenschaft</h4>
            <p className="text-gray-300 text-sm">Mit Herz bei der Sache</p>
          </div>
        </div>
      </div>
    </section>
  )
}
