import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Code, BarChart3, Smartphone, Database, Cloud, Zap } from 'lucide-react'

const services = [
  {
    icon: Code,
    title: "Web-Entwicklung",
    description: "Maßgeschneiderte Webanwendungen mit modernen Frameworks.",
    color: "from-blue-500 to-sky-500",
  },
  {
    icon: BarChart3,
    title: "Dashboard-Lösungen",
    description:
      "Interaktive Dashboards und Datenvisualisierungen, die Ihre Daten in verwertbare Erkenntnisse verwandeln.",
    color: "from-indigo-500 to-blue-500",
  },
  {
    icon: Smartphone,
    title: "Responsive Design",
    description: "Mobile-First-Designs, die auf jedem Gerät und jeder Bildschirmgröße perfekt aussehen.",
    color: "from-sky-500 to-cyan-500",
  },
  {
    icon: Database,
    title: "Datenbank-Design",
    description: "Skalierbare Datenbankarchitektur und Optimierung für hochperformante Anwendungen.",
    color: "from-blue-600 to-indigo-600",
  },
  {
    icon: Cloud,
    title: "Cloud-Lösungen",
    description:
      "Zukunftssichere und skalierbare Cloud-Infrastruktur mit modernen Hosting-Lösungen und automatisierten Deployments.",
    color: "from-indigo-500 to-purple-500",
  },
  {
    icon: Zap,
    title: "Performance-Optimierung",
    description: "Blitzschnelle Anwendungen optimiert für Geschwindigkeit, SEO und Benutzererfahrung.",
    color: "from-cyan-500 to-blue-500",
  },
]

export function Services() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Unsere{" "}
            <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Leistungen
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Wir bieten umfassende Software-Lösungen, die auf Ihre Geschäftsanforderungen zugeschnitten sind
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 group hover:scale-105"
            >
              <CardHeader>
                <div
                  className={`w-12 h-12 rounded-lg bg-gradient-to-r ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <service.icon className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-white text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-300 text-base leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
