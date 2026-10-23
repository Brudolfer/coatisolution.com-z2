"use client"

import { useEffect, useState } from "react"

/*
 * Einblicke in die Plattform: nachgebaute Oberfläche mit Demodaten (keine echten Kundendaten).
 * Die Inhalte sind feste Texte in diesem Bestand, deshalb werden sie als fertiges HTML eingesetzt.
 */

const NAV: [string, string[]][] = [
  ["Personalmanagement", ["Zeiterfassung", "Leistungserfassung", "Auswertung", "Reisekosten"]],
  ["Dashboards", ["Performance", "Ressourcen"]],
  ["Budgetierung", ["Haushalte", "Haushaltsbuch"]],
]

function sidebar(active: string): string {
  const brand = `<div class="brand"><span class="logo"><svg viewBox="0 0 24 24"><path d="M4 17 12 5l8 12" fill="none" stroke="#07111a" stroke-width="2.6" stroke-linejoin="round"/><path d="M8 17h8" stroke="#07111a" stroke-width="2.6" stroke-linecap="round"/></svg></span><div><b>BI-Ratio</b><small>Muster GmbH</small></div></div>`
  const groups = NAV.map(
    ([title, items]) =>
      `<h6>${title}</h6>` + items.map((name) => `<a class="${name === active ? "on" : ""}">${name}</a>`).join(""),
  ).join("")
  return brand + groups
}

function head(title: string, text: string, actions = ""): string {
  return `<div class="mh"><div><h3>${title}</h3><p>${text}</p></div><div style="display:flex;gap:.4rem">${actions}</div></div>`
}

function areaChart(values: number[], width = 520, height = 170): string {
  const max = Math.max(...values) * 1.12
  const min = Math.min(...values) * 0.9
  const step = width / (values.length - 1)
  const points = values.map((v, i) => [i * step, height - ((v - min) / (max - min)) * height])
  const line = points.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" ")
  const grid = [0, 1, 2, 3]
    .map((i) => {
      const y = ((height / 3) * i).toFixed(1)
      return `<line x1="0" x2="${width}" y1="${y}" y2="${y}" stroke="rgba(148,163,184,.14)"/>`
    })
    .join("")
  const dots = points
    .map((p, i) =>
      i % 3 === 2 || i === values.length - 1
        ? `<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="3.4" fill="#06121b" stroke="#00d4ff" stroke-width="2"/>`
        : "",
    )
    .join("")
  return `<svg viewBox="0 0 ${width} ${height + 4}" width="100%" style="display:block"><defs><linearGradient id="bx-area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#00d4ff" stop-opacity=".45"/><stop offset="1" stop-color="#00d4ff" stop-opacity="0"/></linearGradient></defs>${grid}<path d="${line} L${width} ${height} L0 ${height} Z" fill="url(#bx-area)"/><path d="${line}" fill="none" stroke="#00d4ff" stroke-width="2.4" stroke-linejoin="round"/>${dots}</svg>`
}

function bars(values: [string, number][], width = 520, height = 170): string {
  const max = Math.max(...values.map((v) => v[1]))
  const base = Math.min(...values.map((v) => v[1])) - 14
  const slot = width / values.length
  const items = values
    .map(([label, value], i) => {
      const h = ((value - base) / (max - base)) * height
      const x = i * slot
      return (
        `<text x="${(x + slot / 2).toFixed(1)}" y="${(height - h - 6).toFixed(1)}" text-anchor="middle" fill="#d5e1ec" font-size="11" font-weight="600">${value} %</text>` +
        `<rect x="${(x + slot * 0.18).toFixed(1)}" y="${(height - h).toFixed(1)}" width="${(slot * 0.64).toFixed(1)}" height="${h.toFixed(1)}" rx="5" fill="url(#bx-bars)" opacity="${(0.55 + (0.45 * value) / max).toFixed(2)}"/>` +
        `<text x="${(x + slot / 2).toFixed(1)}" y="${height + 15}" text-anchor="middle" fill="#8da2b6" font-size="11">${label}</text>`
      )
    })
    .join("")
  return `<svg viewBox="0 -16 ${width} ${height + 38}" width="100%" style="display:block"><defs><linearGradient id="bx-bars" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#00d4ff"/><stop offset="1" stop-color="#2563eb"/></linearGradient></defs>${items}</svg>`
}

function donut(parts: [string, number, string][]): string {
  const total = parts.reduce((sum, p) => sum + p[1], 0)
  const r = 44
  const c = 2 * Math.PI * r
  let acc = 0
  const arcs = parts
    .map(([, value, color]) => {
      const len = (value / total) * c
      const arc = `<circle cx="60" cy="60" r="${r}" fill="none" stroke="${color}" stroke-width="16" stroke-dasharray="${len.toFixed(1)} ${(c - len).toFixed(1)}" stroke-dashoffset="${(-acc).toFixed(1)}" transform="rotate(-90 60 60)"/>`
      acc += len
      return arc
    })
    .join("")
  return `<svg viewBox="0 0 120 120" width="110" height="110"><circle cx="60" cy="60" r="${r}" fill="none" stroke="rgba(148,163,184,.14)" stroke-width="16"/>${arcs}<text x="60" y="58" text-anchor="middle" fill="#f7fbff" font-size="19" font-weight="700">${Math.round((parts[0][1] / total) * 100)}%</text><text x="60" y="73" text-anchor="middle" fill="#8da2b6" font-size="8">${parts[0][0]}</text></svg>`
}

function timesheet(): string {
  const weekdays = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"]
  const today = 21
  const pool = [8, 8, 7.5, 8, 8.5, 8]
  const cells: string[] = []
  for (let i = 0; i < 35; i += 1) {
    const day = i - 2 // Oktober 2026 beginnt an einem Donnerstag
    if (day < 1 || day > 31) {
      cells.push('<div class="day off"></div>')
      continue
    }
    const weekend = i % 7 >= 5
    const vacation = day >= 12 && day <= 16
    if (weekend) cells.push(`<div class="day off"><small>${day}</small></div>`)
    else if (vacation) cells.push(`<div class="day vac"><small>${day}</small><b>Urlaub</b></div>`)
    else if (day > today) cells.push(`<div class="day"><small>${day}</small></div>`)
    else {
      const hours = pool[day % 6]
      cells.push(
        `<div class="day ok ${day === today ? "today" : ""}" style="--w:${Math.min(100, (hours / 8.5) * 100)}%"><small>${day}</small><b>${String(hours).replace(".", ",")} h</b></div>`,
      )
    }
  }
  return (
    head("Zeiterfassung", "Arbeitszeit buchen und Zeitkonto verfolgen", '<span class="pill">Oktober 2026</span><span class="pill pri">+ Buchung</span>') +
    `<div class="stats"><div class="stat">Soll<b>168,0 h</b></div><div class="stat">Ist<b>154,5 h</b></div><div class="stat">Saldo<b class="up">+ 6,5 h</b></div><div class="stat">Resturlaub<b>17 Tage</b></div></div>` +
    `<div class="cal">${weekdays.map((w) => `<div class="dh">${w}</div>`).join("")}${cells.join("")}</div>`
  )
}

function evaluation(): string {
  const rows: [string, string, number, number, number][] = [
    ["Anna Weber", "Projekt", 152, 92, 3],
    ["Jonas Becker", "Beratung", 148, 88, 5],
    ["Mara Lindner", "Projekt", 159, 95, 2],
    ["Tim Köhler", "Entwicklung", 141, 84, 8],
    ["Sofia Neumann", "Beratung", 155, 93, 4],
    ["Paul Richter", "Entwicklung", 146, 87, 6],
  ]
  return (
    head("Auswertung", "Stunden und Urlaub des Teams im Überblick", '<span class="pill">Oktober 2026</span><span class="pill pri">Als Excel</span>') +
    `<div class="kpis"><div class="kpi"><small>Mitarbeitende</small><b>24</b><i class="up">▲ 2</i></div><div class="kpi"><small>Ist-Stunden</small><b>3.612</b><i class="up">▲ 4,1 %</i></div><div class="kpi"><small>Überstunden</small><b>126 h</b><i class="down">▼ 12 h</i></div><div class="kpi"><small>Urlaubstage</small><b>61</b><i class="up">im Plan</i></div></div>` +
    `<div class="panel" style="padding:.4rem"><table><thead><tr><th>Mitarbeiter</th><th>Team</th><th class="n">Ist</th><th>Erfüllung</th><th class="n">Urlaub</th></tr></thead><tbody>` +
    rows
      .map(
        ([name, team, hours, share, vacation]) =>
          `<tr><td>${name}</td><td>${team}</td><td class="n">${hours} h</td><td><div class="bar"><i style="width:${share}%"></i></div></td><td class="n">${vacation} Tage</td></tr>`,
      )
      .join("") +
    `</tbody></table></div>`
  )
}

type Screen = { tab: string; nav: string; title: string; html: () => string }

const SCREENS: Screen[] = [
  {
    tab: "Dashboards",
    nav: "Performance",
    title: "Performance",
    html: () =>
      head("Performance", "Auslastung und Leistung des Unternehmens im Überblick", '<span class="pill">2026</span><span class="pill pri">Exportieren</span>') +
      `<div class="kpis">
        <div class="kpi"><small>Auslastung</small><b>82,4 %</b><i class="up">▲ 3,1 % ggü. Vorjahr</i></div>
        <div class="kpi"><small>Abrechenbare Std.</small><b>12.480</b><i class="up">▲ 6,2 %</i></div>
        <div class="kpi"><small>Ertrag je Stunde</small><b>94 €</b><i class="up">▲ 2 €</i></div>
        <div class="kpi"><small>Abwesenheit</small><b>3,1 %</b><i class="down">▼ 0,4 %</i></div></div>
      <div class="cols"><div class="panel"><h5>Auslastung nach Monat</h5><div class="sub">Abrechenbare Stunden in Prozent der Sollzeit</div>${areaChart([71, 73, 72, 76, 78, 77, 80, 79, 82, 84, 83, 86])}</div>
      <div class="panel"><h5>Verteilung der Stunden</h5><div class="sub">Gesamtjahr</div><div class="donut-wrap">${donut([["Projekt", 62, "#00d4ff"], ["Intern", 21, "#2563eb"], ["Beratung", 17, "#818cf8"]])}<div class="legend"><span><i style="background:#00d4ff"></i>Projekt 62 %</span><span><i style="background:#2563eb"></i>Intern 21 %</span><span><i style="background:#818cf8"></i>Beratung 17 %</span></div></div></div></div>`,
  },
  { tab: "Zeiterfassung", nav: "Zeiterfassung", title: "Zeiterfassung", html: timesheet },
  {
    tab: "Leistungserfassung",
    nav: "Leistungserfassung",
    title: "Leistungserfassung",
    html: () =>
      head("Leistungserfassung", "Stunden auf Projekte und Leistungen buchen", '<span class="pill">Neueste zuerst</span><span class="pill pri">+ Buchung</span>') +
      `<div class="days">
        <div class="dcard"><div class="dt"><b>Mi, 21.10.</b><small>2026</small><em>8,0 h</em></div><div>
          <div class="entry"><div><div class="l1"><span class="code">P-1042</span><b>Dashboard Vertrieb</b></div><p>Kennzahlenmodell erweitert, Abstimmung mit Fachbereich</p></div><div class="tm">4,5 h</div></div>
          <div class="entry"><div><div class="l1"><span class="code">P-1017</span><b>Datenanbindung ERP</b></div><p>Schnittstelle für Buchungsdaten getestet</p></div><div class="tm">3,5 h</div></div></div></div>
        <div class="dcard"><div class="dt"><b>Di, 20.10.</b><small>2026</small><em>8,5 h</em></div><div>
          <div class="entry"><div><div class="l1"><span class="code">P-1042</span><b>Dashboard Vertrieb</b></div><p>Visualisierung Umsatz nach Region</p></div><div class="tm">6,0 h</div></div>
          <div class="entry"><div><div class="l1"><span class="code">I-0001</span><b>Interne Abstimmung</b></div><p>Wochenplanung Team</p></div><div class="tm">2,5 h</div></div></div></div>
        <div class="dcard"><div class="dt"><b>Mo, 19.10.</b><small>2026</small><em>7,5 h</em></div><div>
          <div class="entry"><div><div class="l1"><span class="code">P-1023</span><b>Budgetplanung 2027</b></div><p>Planungsmaske für dezentrale Bereiche</p></div><div class="tm">7,5 h</div></div></div></div></div>`,
  },
  { tab: "Auswertung", nav: "Auswertung", title: "Auswertung", html: evaluation },
  {
    tab: "KI-Assistent",
    nav: "Performance",
    title: "Daten-Agent",
    html: () =>
      head("Daten-Agent", "Fragen zu den eigenen Daten in normaler Sprache", '<span class="pill">Neuer Chat</span>') +
      `<div class="chat">
        <div class="msg q">Wie hat sich die Auslastung im Team Süd in den letzten sechs Monaten entwickelt?</div>
        <div class="msg a"><div class="who">Daten-Agent</div>Die Auslastung im Team Süd ist seit Mai von 74 % auf 85 % gestiegen. Der größte Sprung liegt im August, nachdem zwei Projekte gestartet sind.
          <div style="margin-top:.8rem">${bars([["Mai", 74], ["Jun", 76], ["Jul", 78], ["Aug", 84], ["Sep", 85], ["Okt", 85]], 440, 90)}</div></div>
        <div class="msg q">Welche Projekte tragen dazu am meisten bei?</div>
        <div class="msg a"><div class="who">Daten-Agent</div>Dashboard Vertrieb (P-1042) mit 412 Stunden und Datenanbindung ERP (P-1017) mit 268 Stunden.</div></div>`,
  },
]

export function Showcase() {
  const [current, setCurrent] = useState(0)
  // nach einem Klick auf einen Reiter läuft der Wechsel von dort aus weiter
  const [tick, setTick] = useState(0)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const timer = window.setInterval(() => setCurrent((i) => (i + 1) % SCREENS.length), 7000)
    return () => window.clearInterval(timer)
  }, [tick])

  const screen = SCREENS[current]

  return (
    <div className="bx">
      <section className="sec" id="insights">
        <div className="wrap">
          <div className="sec-head">
            <div className="kicker">Einblicke</div>
            <h2>
              So fühlt sich <span className="grad">BI-Ratio</span> an
            </h2>
            <p>
              Aufgeräumte Oberflächen, die das Wichtigste zuerst zeigen – für Leitung, Controlling und jeden Mitarbeiter.
            </p>
          </div>

          <div className="tabs" role="tablist">
            {SCREENS.map((s, index) => (
              <button
                key={s.tab}
                type="button"
                role="tab"
                aria-selected={index === current}
                className={index === current ? "tab on" : "tab"}
                onClick={() => {
                  setCurrent(index)
                  setTick((n) => n + 1)
                }}
              >
                {s.tab}
              </button>
            ))}
          </div>

          <div className="showcase">
            <div className="win">
              <div className="win-top">
                <i />
                <i />
                <i />
                <span>BI-Ratio · {screen.title}</span>
              </div>
              <div className="app">
                <aside className="side" dangerouslySetInnerHTML={{ __html: sidebar(screen.nav) }} />
                <div className="main" dangerouslySetInnerHTML={{ __html: screen.html() }} />
              </div>
            </div>
          </div>
          <p className="note">Darstellung mit Demodaten.</p>
        </div>
      </section>
    </div>
  )
}
