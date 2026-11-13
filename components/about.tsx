import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Award, Coffee, Heart } from 'lucide-react'

export function About() {
  return (
    <div id="about">
      <h3 className="text-2xl font-bold text-white mb-3">
        Über <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Uns</span>
      </h3>
      <p className="text-gray-300 leading-relaxed mb-6">
        Lernen Sie das Team hinter BI-Ratio kennen - zwei leidenschaftliche Entwickler mit einer Vision
      </p>

      <div className="grid gap-4 mb-6">
          {/* Leon Peter - Frontend */}
          <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 group">
            <CardContent className="p-5 sm:p-8 text-center">
              <div className="mb-4 sm:mb-6">
                <div className="w-32 h-32 sm:w-48 sm:h-48 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 p-1">
                  <div className="w-full h-full rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                    <img
                      src="/placeholder.svg?height=200&width=200"
                      alt="Leon Peter Foto"
                      className="w-full h-full object-cover"
                    />
                  </div>
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
            <CardContent className="p-5 sm:p-8 text-center">
              <div className="mb-4 sm:mb-6">
                <div className="w-32 h-32 sm:w-48 sm:h-48 mx-auto rounded-full bg-gradient-to-r from-sky-500 to-blue-500 p-1">
                  <div className="w-full h-full rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                    <img
                      src="/placeholder.svg?height=200&width=200"
                      alt="Simon Frey Foto"
                      className="w-full h-full object-cover"
                    />
                  </div>
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
        <div className="grid grid-cols-4 gap-1.5">
          <div className="min-w-0 text-center">
            <div className="mx-auto mb-1.5 flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-sky-500">
              <Users className="h-4 w-4 text-white" />
            </div>
            <h4 className="text-[0.68rem] font-semibold leading-tight text-white">Teamwork</h4>
            <p className="mt-0.5 text-[0.62rem] leading-tight text-gray-300">Gemeinsam erreichen wir mehr</p>
          </div>
          <div className="min-w-0 text-center">
            <div className="mx-auto mb-1.5 flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-r from-sky-500 to-indigo-500">
              <Award className="h-4 w-4 text-white" />
            </div>
            <h4 className="text-[0.68rem] font-semibold leading-tight text-white">Qualität</h4>
            <p className="mt-0.5 text-[0.62rem] leading-tight text-gray-300">Höchste Standards in allem</p>
          </div>
          <div className="min-w-0 text-center">
            <div className="mx-auto mb-1.5 flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-blue-500">
              <Coffee className="h-4 w-4 text-white" />
            </div>
            <h4 className="text-[0.68rem] font-semibold leading-tight text-white">Innovation</h4>
            <p className="mt-0.5 text-[0.62rem] leading-tight text-gray-300">Immer am Puls der Zeit</p>
          </div>
          <div className="min-w-0 text-center">
            <div className="mx-auto mb-1.5 flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-indigo-500">
              <Heart className="h-4 w-4 text-white" />
            </div>
            <h4 className="text-[0.68rem] font-semibold leading-tight text-white">Leidenschaft</h4>
            <p className="mt-0.5 text-[0.62rem] leading-tight text-gray-300">Mit Herz bei der Sache</p>
          </div>
        </div>
    </div>
  )
}
