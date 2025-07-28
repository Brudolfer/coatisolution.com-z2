import ContactForm from "@/components/contact-form"

export default function KontaktPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Kontaktieren Sie uns</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Haben Sie Fragen oder möchten Sie mehr über unsere Dienstleistungen erfahren? Wir freuen uns auf Ihre
          Nachricht!
        </p>
      </div>

      <ContactForm />
    </div>
  )
}
