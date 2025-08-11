"use client"

import { useActionState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Mail, MapPin, Send, CheckCircle, AlertCircle } from "lucide-react"
import { sendContactEmail } from "@/app/actions/contact"

export function Contact() {
  const [state, formAction, isPending] = useActionState(sendContactEmail, null)

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Lassen Sie uns etwas{" "}
            <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Großartiges
            </span>{" "}
            schaffen
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Bereit, Ihre Ideen in die Realität umzusetzen? Kontaktieren Sie uns und lassen Sie uns über Ihr nächstes
            Projekt sprechen.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-2xl">Schreiben Sie uns</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {state && (
                  <Alert
                    className={
                      state.success ? "border-green-500/50 bg-green-500/10" : "border-red-500/50 bg-red-500/10"
                    }
                  >
                    {state.success ? (
                      <CheckCircle className="h-4 w-4 text-green-400" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-red-400" />
                    )}
                    <AlertDescription className={state.success ? "text-green-300" : "text-red-300"}>
                      {state.message}
                    </AlertDescription>
                  </Alert>
                )}

                <form action={formAction} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      name="name"
                      placeholder="Ihr Name"
                      required
                      disabled={isPending}
                      className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 disabled:opacity-50"
                    />
                    <Input
                      name="email"
                      placeholder="Ihre E-Mail"
                      type="email"
                      required
                      disabled={isPending}
                      className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 disabled:opacity-50"
                    />
                  </div>
                  <Input
                    name="subject"
                    placeholder="Betreff"
                    required
                    disabled={isPending}
                    className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 disabled:opacity-50"
                  />
                  <Textarea
                    name="message"
                    placeholder="Erzählen Sie uns von Ihrem Projekt..."
                    rows={6}
                    required
                    disabled={isPending}
                    className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 disabled:opacity-50"
                  />
                  <Button
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isPending ? (
                      <>
                        <div className="w-4 h-4 mr-2 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Wird gesendet...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Nachricht senden
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Kontakt aufnehmen</h3>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                Wir sind hier, um Ihre Vision zum Leben zu erwecken. Ob Sie eine komplette Webanwendung, ein
                beeindruckendes Dashboard oder maßgeschneiderte Software-Lösungen benötigen - unser Team ist bereit,
                außergewöhnliche Ergebnisse zu liefern.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-white font-semibold">E-Mail</div>
                  <div className="text-gray-300">info@thecoatisolution.com</div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-sky-500 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-white font-semibold">Standort</div>
                  <div className="text-gray-300">Ulm, Deutschland</div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h4 className="text-white font-semibold mb-3">Schnelle Antwortzeit</h4>
              <p className="text-gray-300">
                Wir antworten normalerweise innerhalb von 24 Stunden auf alle Anfragen. Bei dringenden Projekten zögern
                Sie nicht, uns direkt anzurufen.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
