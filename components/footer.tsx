import { Github, Twitter, Linkedin, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-full p-3 border border-white/20">
                <img src="/images/coati-logo.svg" alt="Coati Solutions Logo" className="h-10 w-auto" />
              </div>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Data. Science. Business. - Wir verwandeln Daten in leistungsstarke digitale Lösungen. Spezialisiert auf
              Web-Entwicklung, Dashboards und maßgeschneiderte Software.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/CoatiSolutions"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Github className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://twitter.com/CoatiSolutions"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Twitter className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://www.linkedin.com/company/coati-solutions/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Linkedin className="w-5 h-5 text-white" />
              </a>
              <a
                href="mailto:info@coati-solutions.de"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Mail className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Leistungen</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Web-Entwicklung
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Dashboard-Lösungen
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Mobile Apps
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Cloud-Lösungen
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Unternehmen</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  Über Uns
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-white transition-colors">
                  Technologien
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  Kontakt
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center">
          <p className="text-gray-300">
            © 2024 Coati Solutions. Alle Rechte vorbehalten. Mit ❤️ und modernster Technologie entwickelt.
          </p>
        </div>
      </div>
    </footer>
  )
}
