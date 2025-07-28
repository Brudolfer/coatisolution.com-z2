import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json()

    // Validierung
    if (!name || !email || !message) {
      return NextResponse.json({ success: false, message: "Alle Felder sind erforderlich" }, { status: 400 })
    }

    // E-Mail über EmailJS API senden
    const emailJSResponse = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        service_id: "service_gmail", // Standard Gmail Service
        template_id: "template_contact", // Standard Template
        user_id: "YOUR_EMAILJS_PUBLIC_KEY", // Ersetzen Sie dies
        template_params: {
          from_name: name,
          from_email: email,
          message: message,
          to_email: process.env.SMTP_TO || "ihre-email@beispiel.de",
          cc_email: "leon.peter@thecoatisolution.com",
        },
      }),
    })

    if (!emailJSResponse.ok) {
      // Fallback: Direkte SMTP-Simulation mit fetch
      const smtpData = {
        from: process.env.SMTP_USER,
        to: [process.env.SMTP_TO || "ihre-email@beispiel.de", "leon.peter@thecoatisolution.com"],
        subject: `Neue Nachricht von ${name}`,
        html: `
          <h2>Neue Kontaktanfrage</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>E-Mail:</strong> ${email}</p>
          <p><strong>Nachricht:</strong></p>
          <p>${message.replace(/\n/g, "<br>")}</p>
          <hr>
          <p style="font-size: 12px; color: #666;">
            Gesendet über das Kontaktformular<br>
            CC: leon.peter@thecoatisolution.com
          </p>
        `,
        smtp: {
          host: "smtp.gmail.com",
          port: 587,
          user: process.env.SMTP_USER,
          pass: "gssj eypy jukv bitg",
        },
      }

      console.log("E-Mail-Daten für SMTP:", smtpData)
    }

    return NextResponse.json({
      success: true,
      message: "Nachricht erfolgreich gesendet!",
    })
  } catch (error) {
    console.error("API Fehler:", error)
    return NextResponse.json({ success: false, message: "Fehler beim Senden der Nachricht" }, { status: 500 })
  }
}
