"use server"

// Für die Produktion: Echte E-Mail-Versendung
export async function sendEmailProduction(formData: FormData) {
  const nodemailer = await import("nodemailer")

  try {
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const message = formData.get("message") as string

    const transporter = nodemailer.createTransporter({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: "gssj eypy jukv bitg",
      },
    })

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.SMTP_TO,
      cc: "leon.peter@thecoatisolution.com",
      subject: `Neue Nachricht von ${name}`,
      html: `
        <h2>Neue Kontaktanfrage</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>E-Mail:</strong> ${email}</p>
        <p><strong>Nachricht:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
      replyTo: email,
    })

    return { success: true, message: "E-Mail erfolgreich gesendet!" }
  } catch (error) {
    console.error("E-Mail-Fehler:", error)
    return { success: false, message: "Fehler beim E-Mail-Versand" }
  }
}
