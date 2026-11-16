import { siteDescription, siteName, siteUrl } from "@/lib/site"

const graph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: siteName,
      url: siteUrl,
      email: "info@bi-ratio.com",
      telephone: "+49-179-2136982",
      logo: `${siteUrl}/images/bi-ratio-icon.png`,
      image: `${siteUrl}/images/bi-ratio-logo.png`,
      description: siteDescription,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Mozartstraße 24",
        postalCode: "73079",
        addressLocality: "Süßen",
        addressCountry: "DE",
      },
      founder: [
        { "@type": "Person", name: "Leon Peter" },
        { "@type": "Person", name: "Simon Frey" },
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: siteName,
      url: siteUrl,
      inLanguage: "de-DE",
      description: siteDescription,
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "SoftwareApplication",
      name: siteName,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: siteUrl,
      description: siteDescription,
      provider: { "@id": `${siteUrl}/#organization` },
      featureList: [
        "Cash-Management",
        "Eingangs- und Ausgangsrechnungen",
        "XRechnung und ZUGFeRD",
        "Budgetierung",
        "Personalwirtschaft",
        "Dashboards",
      ],
    },
  ],
}

export function SiteJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  )
}
