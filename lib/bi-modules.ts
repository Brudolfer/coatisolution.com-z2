export type BiModule = {
  value: string
  label: string
  title: string
  summary: string
  /** Farben des Planeten: hell, mittel, dunkel, Leuchten */
  colors: [string, string, string, string]
  ring: boolean
  points: [name: string, text: string][]
}

/** Module der Plattform: ein Planet am Globus, eine Karte im Abschnitt "Plattform". */
export const BI_MODULES: BiModule[] = [
  {
    value: "Cash",
    label: "Management",
    title: "Cash-Management",
    summary: "Liquidität im Blick und vorausschauend planen.",
    colors: ["#7dd3fc", "#2563eb", "#0b2a66", "rgba(56,189,248,.55)"],
    ring: false,
    points: [
      ["Liquiditätsübersicht", "Kontostände und Zahlungsströme auf einen Blick"],
      ["Plan-Ist-Vergleich", "Abweichungen zwischen Planung und Realität erkennen"],
      ["Liquiditätsplanung", "Erwartete Ein- und Auszahlungen im Kalender"],
      ["Wasserfall-Analyse", "Veränderungen Schritt für Schritt nachvollziehen"],
    ],
  },
  {
    value: "Budget",
    label: "Planung",
    title: "Budgetierung",
    summary: "Budgets zentral und dezentral planen und auswerten.",
    colors: ["#fde68a", "#d98a0a", "#6a3604", "rgba(251,191,36,.55)"],
    ring: true,
    points: [
      ["Budgetplanung", "Zentral vorgeben, dezentral in den Bereichen planen"],
      ["Budgetauswertung", "Verbrauch und Restbudget je Budgetobjekt"],
      ["Änderungsanträge", "Anpassungen beantragen und freigeben"],
      ["Haushaltsbuch", "Alle Buchungen eines Haushalts nachvollziehbar"],
    ],
  },
  {
    value: "Personal",
    label: "Wirtschaft",
    title: "Personalwirtschaft",
    summary: "Arbeitszeit, Abwesenheit und Reisen an einer Stelle.",
    colors: ["#86efac", "#15935f", "#0a4a35", "rgba(52,211,153,.55)"],
    ring: false,
    points: [
      ["Zeiterfassung", "Arbeitszeit buchen, Zeitkonto und Soll im Blick"],
      ["Urlaub & Abwesenheit", "Anträge stellen, Freigabe und Resturlaub sehen"],
      ["Leistungserfassung", "Stunden auf Projekte und Leistungen buchen"],
      ["Reisekosten", "Belege, Spesen und Abrechnung als PDF"],
    ],
  },
  {
    value: "Dashboard",
    label: "Reporting",
    title: "Dashboarding",
    summary: "Kennzahlen verständlich aufbereitet für jede Ebene.",
    colors: ["#c4b5fd", "#6d46d9", "#2a1668", "rgba(167,139,250,.6)"],
    ring: false,
    points: [
      ["Executive Dashboard", "Die wichtigsten Kennzahlen für die Leitung"],
      ["Strategic Insights", "Entwicklungen und Trends erkennen"],
      ["Operational Excellence", "Abläufe messen und verbessern"],
      ["Benchmarking", "Bereiche und Zeiträume vergleichen"],
    ],
  },
  {
    value: "KI",
    label: "Assistent",
    title: "KI-Assistent",
    summary: "Fragen zu den eigenen Daten in normaler Sprache.",
    colors: ["#99f6e4", "#0f9d93", "#07423f", "rgba(45,212,191,.55)"],
    ring: true,
    points: [
      ["Daten-Agent", "Fragen stellen und Antworten aus den Daten erhalten"],
      ["Automatische Insights", "Auffälligkeiten werden von selbst gemeldet"],
      ["Kommentare", "Kennzahlen im Team besprechen und begründen"],
    ],
  },
  {
    value: "Daten",
    label: "Anbindung",
    title: "Daten & Automatisierung",
    summary: "Daten fließen automatisch und mandantengetrennt.",
    colors: ["#cbd5e1", "#5b7090", "#1c2a40", "rgba(148,163,184,.5)"],
    ring: false,
    points: [
      ["DB-Connector", "Daten aus Fremdsystemen übernehmen"],
      ["Scheduler", "Aktualisierung läuft automatisch zu festen Zeiten"],
      ["Datenmodell", "Einheitliche Struktur für alle Auswertungen"],
      ["Mandanten", "Daten und Rechte je Mandant getrennt"],
    ],
  },
]
