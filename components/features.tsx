import { Badge } from "@/components/ui/badge"
import { CheckCircle, Code, Database, Cloud } from 'lucide-react'

const features = [
  "Zukunftssicher & Skalierbar",
  "Responsive Design",
  "SEO Optimiert",
  "Test Automation",
  "Sicher & Zuverlässig",
  "Agile Projektmethoden",
]

const technologies = [
  { name: "Frontend", techs: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
  { name: "Backend", techs: ["CloudHosting", "Python", "Node.js", "PostgreSQL"] },
  { name: "Cloud", techs: ["Cloud-Lösungen", "Vercel", "Docker", "CI/CD"] },
  { name: "Tools", techs: ["Git", "VS Code", "Figma", "Postman"] },
]

export function Features() {
  return (
    <section className="py-14 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
            Warum{" "}
            <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              BI-Ratio?
            </span>
          </h2>
          <p className="text-base sm:text-xl text-gray-300 mb-6 sm:mb-8 leading-relaxed max-w-3xl">
            Bei uns trifft tiefgehende Frontend- und Backend-Expertise auf fachliches Know-how aus jahrelanger Consulting-Erfahrung. Dieses Zusammenspiel ermöglicht es uns, maßgeschneiderte Lösungen zu entwickeln, die echten Mehrwert für unsere Kunden schaffen. Technisch fundiert, praxisnah und zukunftssicher.
          </p>

          <div className="grid grid-cols-2 gap-3 mb-8 max-w-3xl">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 shrink-0 text-blue-400" />
                <span className="text-sm text-gray-300 sm:text-base">{feature}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-4">
            <div className="min-w-0 rounded-xl border border-white/10 bg-white/5 p-3 text-center sm:p-4">
              <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 sm:h-11 sm:w-11">
                <Code className="h-4 w-4 text-white sm:h-5 sm:w-5" />
              </div>
              <h3 className="mb-1 text-sm font-bold leading-tight text-white sm:text-base">Frontend Excellence</h3>
              <p className="text-xs leading-snug text-gray-300 sm:text-sm">
                Moderne, responsive Benutzeroberflächen mit React, Next.js und TypeScript für optimale
                Benutzererfahrung.
              </p>
            </div>

            <div className="min-w-0 rounded-xl border border-white/10 bg-white/5 p-3 text-center sm:p-4">
              <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-r from-sky-500 to-blue-500 sm:h-11 sm:w-11">
                <Database className="h-4 w-4 text-white sm:h-5 sm:w-5" />
              </div>
              <h3 className="mb-1 text-sm font-bold leading-tight text-white sm:text-base">Backend Power</h3>
              <p className="text-xs leading-snug text-gray-300 sm:text-sm">
                Skalierbare APIs mit modernen Cloud-Lösungen, optimierte Datenbanken und sichere Infrastruktur.
              </p>
            </div>

            <div className="min-w-0 rounded-xl border border-white/10 bg-white/5 p-3 text-center sm:p-4">
              <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-sky-500 sm:h-11 sm:w-11">
                <Cloud className="h-4 w-4 text-white sm:h-5 sm:w-5" />
              </div>
              <h3 className="mb-1 text-sm font-bold leading-tight text-white sm:text-base">Cloud Solutions</h3>
              <p className="text-xs leading-snug text-gray-300 sm:text-sm">
                Professionelle Bereitstellung mit modernen Cloud-Lösungen und automatisierten Deployments.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
