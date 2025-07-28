"use server"

export async function sendEmailWithResend(prevState: any, formData: FormData) {
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

    // Resend API verwenden (funktioniert besser in verschiedenen Umgebungen)
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "kontakt@ihredomain.de", // Muss eine verifizierte Domain sein
        to: [process.env.SMTP_TO || "ihre-email@beispiel.de"],
        subject: `Neue Nachricht von ${name}`,
        html: `
          <h2>Neue Kontaktanfrage</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>E-Mail:</strong> ${email}</p>
          <p><strong>Nachricht:</strong></p>
          <p>${message.replace(/\n/g, "<br>")}</p>
        `,
        reply_to: email,
      }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

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
