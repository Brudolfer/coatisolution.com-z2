"use client"

import { useCookieConsent } from "@/hooks/use-cookie-consent"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { X } from 'lucide-react'

export function CookieBanner() {
const { consentStatus, acceptCookies, declineCookies, showBanner } = useCookieConsent()

if (!showBanner) {
  return null
}

return (
  <div className="fixed bottom-0 left-0 right-0 z-[100] p-4">
    <Card className="bg-white/10 backdrop-blur-lg border border-white/20 text-white shadow-2xl max-w-3xl mx-auto">
      <CardContent className="flex flex-col md:flex-row items-center justify-between gap-4 p-4">
        <div className="flex-1 text-center md:text-left">
          <p className="text-sm md:text-base">
            Wir verwenden Cookies, um die Benutzerfreundlichkeit zu verbessern und die Leistung unserer Website zu analysieren. Durch die Nutzung unserer Website stimmen Sie der Verwendung von Cookies zu.
          </p>
        </div>
        <div className="flex gap-2 w-full md:w-auto justify-center">
          <Button
            onClick={acceptCookies}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-2 text-sm rounded-md"
          >
            Akzeptieren
          </Button>
          <Button
            onClick={declineCookies}
            variant="outline"
            className="border-white/30 text-white hover:bg-white/20 px-4 py-2 text-sm rounded-md"
          >
            Ablehnen
          </Button>
        </div>
      </CardContent>
    </Card>
  </div>
)
}
