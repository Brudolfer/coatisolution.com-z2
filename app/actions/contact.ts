"use server"

import nodemailer from "nodemailer"

export async function sendContactEmail(prevState: any, formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const subject = formData.get("subject") as string
  const message = formData.get("message") as string

  // Validierung
  if (!name || !email || !subject || !message) {
    return {
      success: false,
      message: "Bitte füllen Sie alle Felder aus.",
    }
  }

  // E-Mail-Validierung
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return {
      success: false,
      message: "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
    }
  }

  try {
    // Gmail SMTP Transporter konfigurieren
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number.parseInt(process.env.SMTP_PORT || "587"),
      secure: false, // true für 465, false für andere Ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    // Professionelle E-Mail an Simon Frey
    await transporter.sendMail({
      from: `"Coati Solutions Kontakt" <${process.env.SMTP_FROM}>`,
      to: process.env.SMTP_TO,
      replyTo: email,
      subject: `🚀 Neue Projektanfrage: ${subject}`,
      html: `
        <!DOCTYPE html>
        <html lang="de">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Neue Kontaktanfrage - Coati Solutions</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%); min-height: 100vh;">
          
          <!-- Container -->
          <div style="max-width: 650px; margin: 0 auto; padding: 20px;">
            
            <!-- Header mit Logo und Gradient -->
            <div style="background: linear-gradient(135deg, #3b82f6 0%, #6366f1 50%, #8b5cf6 100%); padding: 40px 30px; border-radius: 20px 20px 0 0; text-align: center; position: relative; overflow: hidden;">
              <!-- Decorative circles -->
              <div style="position: absolute; top: -50px; right: -50px; width: 100px; height: 100px; background: rgba(255,255,255,0.1); border-radius: 50%;"></div>
              <div style="position: absolute; bottom: -30px; left: -30px; width: 60px; height: 60px; background: rgba(255,255,255,0.1); border-radius: 50%;"></div>
              
              <!-- Logo Container -->
              <div style="background: rgba(255,255,255,0.15); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.2); border-radius: 20px; padding: 20px; display: inline-block; margin-bottom: 20px; box-shadow: 0 8px 32px rgba(0,0,0,0.1);">
                <div style="width: 60px; height: 60px; background: white; border-radius: 15px; display: flex; align-items: center; justify-content: center; margin: 0 auto;">
                  <span style="font-size: 32px; font-weight: bold; background: linear-gradient(135deg, #3b82f6, #6366f1); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">🐾</span>
                </div>
              </div>
              
              <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700; text-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                Neue Projektanfrage! 🎉
              </h1>
              <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px; font-weight: 500;">
                Coati Solutions - Data. Science. Business.
              </p>
            </div>
            
            <!-- Main Content -->
            <div style="background: white; padding: 40px 30px; border-radius: 0 0 20px 20px; box-shadow: 0 10px 40px rgba(0,0,0,0.1);">
              
              <!-- Greeting -->
              <div style="text-align: center; margin-bottom: 30px;">
                <h2 style="color: #1e293b; margin: 0 0 10px 0; font-size: 24px; font-weight: 600;">
                  Hallo Simon! 👋
                </h2>
                <p style="color: #64748b; margin: 0; font-size: 16px;">
                  Ein neuer Kunde möchte mit uns arbeiten!
                </p>
              </div>
              
              <!-- Customer Info Card -->
              <div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 1px solid #e2e8f0; border-radius: 16px; padding: 25px; margin-bottom: 25px; position: relative;">
                <div style="position: absolute; top: -10px; left: 20px; background: linear-gradient(135deg, #3b82f6, #6366f1); color: white; padding: 8px 16px; border-radius: 20px; font-size: 14px; font-weight: 600; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);">
                  👤 Kundendaten
                </div>
                
                <div style="margin-top: 15px;">
                  <div style="display: flex; align-items: center; margin-bottom: 15px;">
                    <div style="width: 40px; height: 40px; background: linear-gradient(135deg, #10b981, #059669); border-radius: 10px; display: flex; align-items: center; justify-content: center; margin-right: 15px;">
                      <span style="color: white; font-size: 18px;">👨‍💼</span>
                    </div>
                    <div>
                      <p style="margin: 0; color: #374151; font-weight: 600; font-size: 18px;">${name}</p>
                      <p style="margin: 0; color: #6b7280; font-size: 14px;">Interessent</p>
                    </div>
                  </div>
                  
                  <div style="display: flex; align-items: center;">
                    <div style="width: 40px; height: 40px; background: linear-gradient(135deg, #3b82f6, #2563eb); border-radius: 10px; display: flex; align-items: center; justify-content: center; margin-right: 15px;">
                      <span style="color: white; font-size: 18px;">📧</span>
                    </div>
                    <div>
                      <p style="margin: 0; color: #374151; font-weight: 600; font-size: 16px;">
                        <a href="mailto:${email}" style="color: #3b82f6; text-decoration: none;">${email}</a>
                      </p>
                      <p style="margin: 0; color: #6b7280; font-size: 14px;">E-Mail-Adresse</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Subject Card -->
              <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border: 1px solid #f59e0b; border-radius: 16px; padding: 25px; margin-bottom: 25px; position: relative;">
                <div style="position: absolute; top: -10px; left: 20px; background: linear-gradient(135deg, #f59e0b, #d97706); color: white; padding: 8px 16px; border-radius: 20px; font-size: 14px; font-weight: 600; box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);">
                  📋 Projektbetreff
                </div>
                
                <div style="margin-top: 15px;">
                  <h3 style="color: #92400e; margin: 0; font-size: 20px; font-weight: 700; display: flex; align-items: center;">
                    <span style="margin-right: 10px;">🎯</span>
                    ${subject}
                  </h3>
                </div>
              </div>
              
              <!-- Message Card -->
              <div style="background: linear-gradient(135deg, #ede9fe 0%, #ddd6fe 100%); border: 1px solid #8b5cf6; border-radius: 16px; padding: 25px; margin-bottom: 30px; position: relative;">
                <div style="position: absolute; top: -10px; left: 20px; background: linear-gradient(135deg, #8b5cf6, #7c3aed); color: white; padding: 8px 16px; border-radius: 20px; font-size: 14px; font-weight: 600; box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);">
                  💬 Projektbeschreibung
                </div>
                
                <div style="margin-top: 15px;">
                  <div style="background: white; border-radius: 12px; padding: 20px; border-left: 4px solid #8b5cf6; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                    <p style="margin: 0; color: #374151; line-height: 1.7; font-size: 16px; white-space: pre-wrap;">${message}</p>
                  </div>
                </div>
              </div>
              
              <!-- Action Buttons -->
              <div style="text-align: center; margin: 30px 0;">
                <a href="mailto:${email}" style="display: inline-block; background: linear-gradient(135deg, #3b82f6, #6366f1); color: white; padding: 15px 30px; text-decoration: none; border-radius: 12px; font-weight: 600; font-size: 16px; margin: 0 10px; box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3); transition: all 0.3s ease;">
                  📧 Antworten
                </a>
                <a href="tel:+4912345678" style="display: inline-block; background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 15px 30px; text-decoration: none; border-radius: 12px; font-weight: 600; font-size: 16px; margin: 0 10px; box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3); transition: all 0.3s ease;">
                  📞 Anrufen
                </a>
              </div>
              
              <!-- Timestamp -->
              <div style="background: #f8fafc; border-radius: 12px; padding: 20px; text-align: center; border: 1px solid #e2e8f0;">
                <p style="margin: 0; color: #64748b; font-size: 14px; display: flex; align-items: center; justify-content: center;">
                  <span style="margin-right: 8px;">🕐</span>
                  Eingegangen am: ${new Date().toLocaleString("de-DE", {
                    timeZone: "Europe/Berlin",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              
              <!-- Success Message -->
              <div style="background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%); border: 1px solid #10b981; border-radius: 16px; padding: 20px; margin-top: 25px; text-align: center;">
                <h3 style="color: #065f46; margin: 0 0 10px 0; font-size: 18px; font-weight: 600; display: flex; align-items: center; justify-content: center;">
                  <span style="margin-right: 10px;">🎉</span>
                  Neues Geschäft wartet!
                </h3>
                <p style="color: #047857; margin: 0; font-size: 14px;">
                  Zeit, die Coati-Magie zu entfesseln und ein weiteres erfolgreiches Projekt zu starten! 🚀
                </p>
              </div>
            </div>
            
            <!-- Footer -->
            <div style="text-align: center; margin-top: 30px; padding: 20px;">
              <p style="color: rgba(255,255,255,0.7); font-size: 14px; margin: 0;">
                Diese E-Mail wurde automatisch über das Kontaktformular auf 
                <a href="https://thecoatisolution.com" style="color: #60a5fa; text-decoration: none;">thecoatisolution.com</a> gesendet.
              </p>
              <p style="color: rgba(255,255,255,0.5); font-size: 12px; margin: 10px 0 0 0;">
                © 2025 Coati Solutions - Data. Science. Business.
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    })

    // Bestätigungs-E-Mail an den Absender (auch verbessert)
    await transporter.sendMail({
      from: `"Coati Solutions" <${process.env.SMTP_FROM}>`,
      to: email,
      subject: "✅ Ihre Nachricht wurde erfolgreich gesendet - Coati Solutions",
      html: `
        <!DOCTYPE html>
        <html lang="de">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Nachricht erhalten - Coati Solutions</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%); min-height: 100vh;">
          
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%); padding: 40px 30px; border-radius: 20px 20px 0 0; text-align: center; position: relative; overflow: hidden;">
              <div style="position: absolute; top: -50px; right: -50px; width: 100px; height: 100px; background: rgba(255,255,255,0.1); border-radius: 50%;"></div>
              
              <div style="background: rgba(255,255,255,0.15); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.2); border-radius: 20px; padding: 20px; display: inline-block; margin-bottom: 20px;">
                <span style="font-size: 48px;">✅</span>
              </div>
              
              <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700;">
                Nachricht erfolgreich gesendet!
              </h1>
              <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">
                Coati Solutions
              </p>
            </div>
            
            <!-- Content -->
            <div style="background: white; padding: 40px 30px; border-radius: 0 0 20px 20px; box-shadow: 0 10px 40px rgba(0,0,0,0.1);">
              <p style="color: #374151; line-height: 1.6; margin-bottom: 20px; font-size: 16px;">
                Hallo <strong>${name}</strong>,
              </p>
              
              <p style="color: #374151; line-height: 1.6; margin-bottom: 25px; font-size: 16px;">
                vielen Dank für Ihr Interesse an Coati Solutions! Wir haben Ihre Nachricht erfolgreich erhalten und werden uns innerhalb von <strong>24 Stunden</strong> bei Ihnen melden.
              </p>
              
              <!-- Summary Card -->
              <div style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border: 1px solid #0ea5e9; border-radius: 16px; padding: 25px; margin: 25px 0;">
                <h3 style="color: #0c4a6e; margin: 0 0 15px 0; font-size: 18px; font-weight: 600;">
                  📋 Ihre Anfrage im Überblick:
                </h3>
                <p style="margin: 8px 0; color: #374151;"><strong>Betreff:</strong> ${subject}</p>
                <p style="margin: 8px 0; color: #374151;"><strong>Nachricht:</strong></p>
                <div style="background: white; border-radius: 8px; padding: 15px; margin-top: 10px; border-left: 4px solid #0ea5e9;">
                  <p style="margin: 0; color: #374151; font-style: italic; line-height: 1.5;">"${message}"</p>
                </div>
              </div>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="mailto:simon.frey@thecoatisolution.com" style="display: inline-block; background: linear-gradient(135deg, #3b82f6, #6366f1); color: white; padding: 15px 30px; text-decoration: none; border-radius: 12px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);">
                  📧 Direkt kontaktieren
                </a>
              </div>
              
              <p style="color: #374151; line-height: 1.6; margin-bottom: 0; font-size: 16px;">
                Mit freundlichen Grüßen,<br>
                <strong>Das Coati Solutions Team</strong><br>
                <em style="color: #6366f1;">Data. Science. Business.</em>
              </p>
            </div>
            
            <!-- Footer -->
            <div style="text-align: center; margin-top: 30px; padding: 20px;">
              <p style="color: rgba(255,255,255,0.7); font-size: 14px; margin: 0;">
                © 2025 Coati Solutions - thecoatisolution.com
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    })

    return {
      success: true,
      message:
        "Vielen Dank! Ihre Nachricht wurde erfolgreich gesendet. Sie erhalten eine Bestätigung per E-Mail und wir melden uns innerhalb von 24 Stunden bei Ihnen.",
    }
  } catch (error) {
    console.error("Fehler beim Senden der E-Mail:", error)
    return {
      success: false,
      message:
        "Es gab einen Fehler beim Senden Ihrer Nachricht. Bitte versuchen Sie es später erneut oder kontaktieren Sie uns direkt per E-Mail an simon.frey@thecoatisolution.com.",
    }
  }
}
