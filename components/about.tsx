import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Award, Coffee, Heart } from 'lucide-react'

export function About() {
  return (
    <div id="about" className="mt-10">
      <h3 className="mb-2 text-2xl font-bold text-white">
        Über <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Uns</span>
      </h3>
      <p className="mb-4 text-sm leading-relaxed text-gray-300 sm:text-base">
        Lernen Sie das Team hinter BI-Ratio kennen - zwei leidenschaftliche Entwickler mit einer Vision
      </p>

      <div className="mb-6 grid grid-cols-2 gap-3">
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardContent className="p-3 text-center sm:p-5">
              <div className="mx-auto mb-3 h-16 w-16 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 p-0.5 sm:h-24 sm:w-24">
                <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-gray-300">
                  <img
                    src="/images/leon-peter.jpg"
                    alt="Leon Peter"
                    className="h-full w-full object-cover object-[center_20%]"
                  />
                </div>
              </div>
              <h3 className="text-base font-bold text-white sm:text-xl">Leon Peter</h3>
              <p className="mb-2 text-xs font-semibold text-blue-400 sm:text-sm">Co-Founder & Frontend Designer</p>
              <p className="break-words text-xs leading-snug text-gray-300 sm:text-sm">
                Spezialist für Frontend-Entwicklung, UI/UX Design und Web-Apps. Mit über 5 Jahren Erfahrung in der
                Entwicklung moderner Webanwendungen bringt er kreative Lösungen und benutzerfreundliche Designs in jedes
                Projekt.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardContent className="p-3 text-center sm:p-5">
              <div className="mx-auto mb-3 h-16 w-16 rounded-full bg-gradient-to-r from-sky-500 to-blue-500 p-0.5 sm:h-24 sm:w-24">
                <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-gray-300">
                  <img
                    src="/images/simon-frey.jpg"
                    alt="Simon Frey"
                    className="h-full w-full object-cover object-[center_20%]"
                  />
                </div>
              </div>
              <h3 className="text-base font-bold text-white sm:text-xl">Simon Frey</h3>
              <p className="mb-2 text-xs font-semibold text-sky-400 sm:text-sm">Co-Founder & Backend Architect</p>
              <p className="break-words text-xs leading-snug text-gray-300 sm:text-sm">
                Experte für Backend-Entwicklung, FastAPI, Datenbank-Design und Cloud-Infrastructure. Verantwortlich für
                skalierbare Lösungen und Systemarchitektur mit einem Fokus auf Performance, Sicherheit und moderne
                API-Entwicklung.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Gemeinsame Werte */}
        <div className="grid grid-cols-4 gap-1.5 sm:gap-4">
          <div className="min-w-0 text-center">
            <div className="mx-auto mb-1.5 flex h-9 w-9 items-center justify-center rounded-full sm:mb-2 sm:h-12 sm:w-12 bg-gradient-to-r from-blue-500 to-sky-500">
              <Users className="h-4 w-4 text-white sm:h-6 sm:w-6" />
            </div>
            <h4 className="text-[0.68rem] font-semibold leading-tight text-white sm:text-sm">Teamwork</h4>
            <p className="mt-0.5 text-[0.62rem] leading-tight text-gray-300 sm:text-sm">Gemeinsam erreichen wir mehr</p>
          </div>
          <div className="min-w-0 text-center">
            <div className="mx-auto mb-1.5 flex h-9 w-9 items-center justify-center rounded-full sm:mb-2 sm:h-12 sm:w-12 bg-gradient-to-r from-sky-500 to-indigo-500">
              <Award className="h-4 w-4 text-white sm:h-6 sm:w-6" />
            </div>
            <h4 className="text-[0.68rem] font-semibold leading-tight text-white sm:text-sm">Qualität</h4>
            <p className="mt-0.5 text-[0.62rem] leading-tight text-gray-300 sm:text-sm">Höchste Standards in allem</p>
          </div>
          <div className="min-w-0 text-center">
            <div className="mx-auto mb-1.5 flex h-9 w-9 items-center justify-center rounded-full sm:mb-2 sm:h-12 sm:w-12 bg-gradient-to-r from-indigo-500 to-blue-500">
              <Coffee className="h-4 w-4 text-white sm:h-6 sm:w-6" />
            </div>
            <h4 className="text-[0.68rem] font-semibold leading-tight text-white sm:text-sm">Innovation</h4>
            <p className="mt-0.5 text-[0.62rem] leading-tight text-gray-300 sm:text-sm">Immer am Puls der Zeit</p>
          </div>
          <div className="min-w-0 text-center">
            <div className="mx-auto mb-1.5 flex h-9 w-9 items-center justify-center rounded-full sm:mb-2 sm:h-12 sm:w-12 bg-gradient-to-r from-blue-500 to-indigo-500">
              <Heart className="h-4 w-4 text-white sm:h-6 sm:w-6" />
            </div>
            <h4 className="text-[0.68rem] font-semibold leading-tight text-white sm:text-sm">Leidenschaft</h4>
            <p className="mt-0.5 text-[0.62rem] leading-tight text-gray-300 sm:text-sm">Mit Herz bei der Sache</p>
          </div>
        </div>
    </div>
  )
}
