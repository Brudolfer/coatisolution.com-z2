"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function ContactFormEmailJS() {
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<{ success: boolean; message: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setStatus(null)

    const formData = new FormData(e.currentTarget)
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const message = formData.get("message") as string

    try {
      // EmailJS API verwenden
      const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          service_id: "YOUR_SERVICE_ID", // Ersetzen Sie mit Ihrer EmailJS Service ID
          template_id: "YOUR_TEMPLATE_ID", // Ersetzen Sie mit Ihrer Template ID
          user_id: "YOUR_PUBLIC_KEY", // Ersetzen Sie mit Ihrem Public Key
          template_params: {
            from_name: name,
            from_email: email,
            message: message,
            to_email: "ihre-email@beispiel.de",
          },
        }),
      })

      if (response.ok) {
        setStatus({
          success: true,
          message: "Nachricht erfolgreich gesendet!",
        })
        // Formular zurücksetzen
        e.currentTarget.reset()
      } else {
        throw new Error("Fehler beim Senden")
      }
    } catch (error) {
      setStatus({
        success: false,
        message: "Fehler beim Senden der Nachricht. Bitte versuchen Sie es später erneut.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Kontakt</CardTitle>
        <CardDescription>Senden Sie uns eine Nachricht und wir melden uns bei Ihnen zurück.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input id="name" name="name" placeholder="Ihr vollständiger Name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-Mail *</Label>
              <Input id="email" name="email" type="email" placeholder="ihre.email@beispiel.de" required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Nachricht *</Label>
            <Textarea id="message" name="message" placeholder="Ihre Nachricht..." className="min-h-[120px]" required />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Wird gesendet..." : "Nachricht senden"}
          </Button>

          {status && (
            <div
              className={`p-4 rounded-md ${
                status.success
                  ? "bg-green-50 text-green-800 border border-green-200"
                  : "bg-red-50 text-red-800 border border-red-200"
              }`}
            >
              {status.message}
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  )
}
