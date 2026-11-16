import type { Metadata } from "next"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Impressum",
  description: "Anbieterkennzeichnung der BI-Ratio GbR, Mozartstraße 24, 73079 Süßen. Gesellschafter: Simon Frey und Leon Peter.",
  alternates: { canonical: "/impressum" },
  openGraph: {
    url: "/impressum",
    title: "Impressum | BI-Ratio",
    description: "Anbieterkennzeichnung der BI-Ratio GbR, Mozartstraße 24, 73079 Süßen. Gesellschafter: Simon Frey und Leon Peter.",
  },
}

export default function ImpressumPage() {
return (
  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex flex-col">
    <Navigation />
    <main className="flex-1 flex items-center justify-center py-24 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-4xl bg-white/5 backdrop-blur-sm border-white/10 text-white">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            Impressum
          </CardTitle>
          <p className="text-lg text-gray-300 mt-2">Angaben gemäß § 5 DDG</p>
        </CardHeader>
        <CardContent className="space-y-8 text-gray-300 text-base leading-relaxed">
          <section>
            <h3 className="text-2xl font-semibold text-white mb-4">Anbieter</h3>
            <p>
              BI-Ratio GbR<br />
              Mozartstraße 24<br />
              73079 Süßen<br />
              Deutschland
            </p>
          </section>

          <section>
            <h3 className="text-2xl font-semibold text-white mb-4">Vertreten durch die Gesellschafter</h3>
            <p>
              Simon Frey und Leon Peter
            </p>
          </section>

          <section>
            <h3 className="text-2xl font-semibold text-white mb-4">Kontakt</h3>
            <p>
              E-Mail: info@bi-ratio.com
            </p>
          </section>

          <section>
            <h3 className="text-2xl font-semibold text-white mb-4">Haftung für Inhalte</h3>
            <p>
              Als Diensteanbieter sind wir für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Für fremde Informationen, die wir nur durchleiten, zwischenspeichern oder speichern, gilt die beschränkte Verantwortlichkeit nach den Artikeln 4 bis 6 der Verordnung (EU) 2022/2065 in Verbindung mit § 7 DDG. Eine allgemeine Pflicht, diese Informationen zu überwachen oder nach rechtswidrigen Tätigkeiten zu forschen, besteht nicht.
            </p>
            <p>
              Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
            </p>
          </section>

          <section>
            <h3 className="text-2xl font-semibold text-white mb-4">Haftung für Links</h3>
            <p>
              Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.
            </p>
            <p>
              Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
            </p>
          </section>

          <section>
            <h3 className="text-2xl font-semibold text-white mb-4">Urheberrecht</h3>
            <p>
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
            </p>
            <p>
              Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
            </p>
          </section>
        </CardContent>
      </Card>
    </main>
    <Footer />
  </div>
)
}
