import { Badge } from "@/components/ui/badge"
import { CheckCircle, Code, Database, Cloud } from "lucide-react"

const features = [
  "Moderne Tech-Stack",
  "Responsive Design",
  "SEO Optimiert",
  "Schnelle Performance",
  "Sicher & Zuverlässig",
  "24/7 Support",
]

const technologies = [
  { name: "Frontend", techs: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
  { name: "Backend", techs: ["FastAPI", "Python", "Node.js", "PostgreSQL"] },
  { name: "Cloud", techs: ["AWS", "Vercel", "Docker", "CI/CD"] },
  { name: "Tools", techs: ["Git", "VS Code", "Figma", "Postman"] },
]

export function Features() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Warum{" "}
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Coati Solutions?
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Wir entwickeln nicht nur Software – wir schaffen digitale Erlebnisse, die Ergebnisse liefern. Unser Team
              kombiniert technische Expertise mit kreativer Vision, um Lösungen zu liefern, die Erwartungen übertreffen.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-blue-400" />
                  <span className="text-gray-300">{feature}</span>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <h3 className="text-white font-semibold text-lg">Unser Tech-Stack:</h3>
              {technologies.map((category, index) => (
                <div key={index} className="flex flex-wrap items-center gap-2">
                  <span className="text-blue-400 font-medium min-w-[80px]">{category.name}:</span>
                  {category.techs.map((tech, techIndex) => (
                    <Badge
                      key={techIndex}
                      variant="secondary"
                      className="bg-blue-500/20 text-blue-300 border-blue-500/30"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 text-center hover:bg-white/10 transition-all duration-300">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center">
                  <Code className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Frontend Excellence</h3>
              <p className="text-gray-300">
                Moderne, responsive Benutzeroberflächen mit React, Next.js und TypeScript für optimale
                Benutzererfahrung.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 text-center hover:bg-white/10 transition-all duration-300">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-sky-500 to-blue-500 flex items-center justify-center">
                  <Database className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Backend Power</h3>
              <p className="text-gray-300">
                Skalierbare APIs mit FastAPI und Python, optimierte Datenbanken und sichere Cloud-Infrastruktur.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 text-center hover:bg-white/10 transition-all duration-300">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-indigo-500 to-sky-500 flex items-center justify-center">
                  <Cloud className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Cloud Solutions</h3>
              <p className="text-gray-300">
                Professionelle Bereitstellung auf AWS und anderen Cloud-Plattformen mit automatisierten Deployments.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
