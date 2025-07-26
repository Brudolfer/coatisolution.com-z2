"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Mail, Send, CheckCircle, AlertCircle } from "lucide-react"
import { sendContactEmail } from "@/app/actions/contact"

export default function TestEmailPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<any>(null)

  const sendTestEmail = async () => {
    setIsLoading(true)
    setResult(null)

    // Test-Daten erstellen
    const testFormData = new FormData()
    testFormData.append("name", "Max Mustermann")
    testFormData.append("email", "leon.peter@thecoatisolution.com") // Ihre E-Mail für den Test
    testFormData.append("subject", "🧪 Test der neuen E-Mail-Designs")
    testFormData.append(
      "message",
      `Dies ist eine Testnachricht für das neue E-Mail-Design!

🎨 Wir testen:
- Moderne Gradient-Hintergründe
- Coati Logo Integration
- Responsive Karten-Layouts
- Farbkodierte Bereiche
- Action-Buttons
- Professionelle Typografie

Wenn Sie diese E-Mail erhalten, funktioniert alles perfekt! 🚀

Mit freundlichen Grüßen,
Das Test-Team`,
    )

    try {
      const response = await sendContactEmail(null, testFormData)
      setResult(response)
    } catch (error) {
      setResult({
        success: false,
        message: "Fehler beim Senden der Test-E-Mail",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-white/5 backdrop-blur-sm border-white/10">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center">
              <Mail className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-white text-3xl">E-Mail Design Tester</CardTitle>
          <p className="text-gray-300 mt-2">Testen Sie das neue professionelle E-Mail-Design mit Logos und Grafiken</p>
        </CardHeader>

        <CardContent className="space-y-6">
          {result && (
            <Alert
              className={result.success ? "border-green-500/50 bg-green-500/10" : "border-red-500/50 bg-red-500/10"}
            >
              {result.success ? (
                <CheckCircle className="h-4 w-4 text-green-400" />
              ) : (
                <AlertCircle className="h-4 w-4 text-red-400" />
              )}
              <AlertDescription className={result.success ? "text-green-300" : "text-red-300"}>
                {result.message}
              </AlertDescription>
            </Alert>
          )}

          <div className="bg-white/5 rounded-lg p-6 border border-white/10">
            <h3 className="text-white font-semibold mb-4">📧 Test-E-Mail Details:</h3>
            <div className="space-y-2 text-gray-300">
              <p>
                <strong>An:</strong> simon.frey@thecoatisolution.com
              </p>
              <p>
                <strong>Kopie an:</strong> leon.peter@thecoatisolution.com
              </p>
              <p>
                <strong>Betreff:</strong> 🧪 Test der neuen E-Mail-Designs
              </p>
              <p>
                <strong>Inhalt:</strong> Professionelle Test-Nachricht mit allen Design-Features
              </p>
            </div>
          </div>

          <div className="bg-white/5 rounded-lg p-6 border border-white/10">
            <h3 className="text-white font-semibold mb-4">✨ Neue Design-Features:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-300">
              <div className="flex items-center space-x-2">
                <span className="text-blue-400">🐾</span>
                <span>Coati Logo Integration</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-400">🎨</span>
                <span>Moderne Gradient-Hintergründe</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-purple-400">📱</span>
                <span>Responsive Karten-Layouts</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-yellow-400">🌈</span>
                <span>Farbkodierte Bereiche</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-indigo-400">🎯</span>
                <span>Action-Buttons</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-cyan-400">✨</span>
                <span>Glassmorphism-Effekte</span>
              </div>
            </div>
          </div>

          <Button
            onClick={sendTestEmail}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 text-lg"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 mr-2 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Test-E-Mail wird gesendet...
              </>
            ) : (
              <>
                <Send className="w-5 h-5 mr-2" />🧪 Test-E-Mail Senden
              </>
            )}
          </Button>

          <div className="text-center">
            <p className="text-gray-400 text-sm">
              Die Test-E-Mail wird an beide Coati Solutions E-Mail-Adressen gesendet
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
