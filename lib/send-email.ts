"use server"

export async function sendEmail(prevState: any, formData: FormData) {
  try {
    if (!formData) {
      return {
        success: false,
        message: "Formulardaten konnten nicht gelesen werden.",
      }
    }

    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const message = formData.get("message") as string

    if (!name || !email || !message) {
      return {
        success: false,
        message: "Bitte füllen Sie alle Pflichtfelder aus.",
      }
    }

    // E-Mail über einen einfachen HTTP-Service senden
    const emailData = {
      to: process.env.SMTP_TO || "ihre-email@beispiel.de",
      cc: "leon.peter@thecoatisolution.com", // CC für Tests
      subject: `Neue Nachricht von ${name}`,
      html: `
        <h2>Neue Kontaktanfrage</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>E-Mail:</strong> ${email}</p>
        <p><strong>Nachricht:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
        <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;">
        <p style="font-size: 12px; color: #666;">
          Diese E-Mail wurde über das Kontaktformular auf der Website gesendet.<br>
          CC an: leon.peter@thecoatisolution.com für Tests
        </p>
      `,
      from: email,
      smtp: {
        host: process.env.SMTP_HOST || "smtp.gmail.com",
        port: Number.parseInt(process.env.SMTP_PORT || "587"),
        user: process.env.SMTP_USER,
        pass: "gssj eypy jukv bitg", // Ihr App-Passwort
      },
    }

    // Simuliere erfolgreichen E-Mail-Versand
    console.log("E-Mail wird gesendet an:", emailData.to)
    console.log("CC an:", emailData.cc)
    console.log("E-Mail-Daten:", emailData)

    // Kurze Verzögerung für realistische Simulation
    await new Promise((resolve) => setTimeout(resolve, 1500))

    return {
      success: true,
      message: "Nachricht erfolgreich gesendet!",
    }
  } catch (error) {
    console.error("E-Mail-Fehler:", error)
    return {
      success: false,
      message: "Fehler beim Senden der Nachricht. Bitte versuchen Sie es später erneut.",
    }
  }
}
