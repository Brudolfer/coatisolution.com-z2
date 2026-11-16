"use client"

import { useEffect, useRef, useState } from "react"

/*
 * Einblicke in die Plattform: nachgebaute Oberfläche mit Demodaten (keine echten Kundendaten).
 * Die Inhalte sind feste Texte in diesem Bestand, deshalb werden sie als fertiges HTML eingesetzt.
 */

const NAV: [string, string[]][] = [
  ["Personalmanagement", ["Zeiterfassung", "Leistungserfassung", "Auswertung", "Reisekosten"]],
  ["Rechnungen", ["Eingang", "Ausgang"]],
  ["Cash-Management", ["Liquidität"]],
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

const hoursText = (value: number, sign = false) =>
  `${sign && value > 0 ? "+ " : sign && value < 0 ? "− " : ""}${Math.abs(value).toFixed(1).replace(".", ",")} h`

function timesheet(): string {
  const weekdays = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"]
  // Aktuelle Woche: Montag 19. bis Sonntag 25. Oktober 2026, heute ist der 21.
  const today = 21
  const soll = 8
  const booked: Record<number, number> = { 19: 8.5, 20: 9, 21: 8.5 }
  const cells: string[] = []
  let ist = 0
  let sollToDate = 0
  for (let day = 19; day <= 25; day += 1) {
    const weekend = day >= 24
    const date = (locked: boolean) => `<span class="d-date"><b>${day}</b><i>${day}.10.</i>${locked ? '<em title="freigegeben">✓</em>' : ""}</span>`
    if (weekend) {
      cells.push(`<div class="td free">${date(false)}<span class="d-label">frei</span><span class="d-soll">&nbsp;</span></div>`)
    } else if (day > today) {
      cells.push(`<div class="td fut">${date(false)}<span class="d-label">—</span><span class="d-soll">Soll ${hoursText(soll)}</span><span class="d-meter"><i style="width:0"></i></span></div>`)
    } else {
      const hours = booked[day]
      ist += hours
      sollToDate += soll
      cells.push(
        `<div class="td ok${day === today ? " today" : ""}">${date(day < today)}<span class="d-label">${hoursText(hours)}</span><span class="d-soll">Soll ${hoursText(soll)}</span><span class="d-meter"><i style="width:${Math.min(100, (hours / soll) * 100)}%"></i></span></div>`,
      )
    }
  }
  const saldo = ist - sollToDate
  const share = Math.min(100, (ist / sollToDate) * 100)
  const tabs = ["Erfassung", "Anträge", "Zeitkonto"]
    .map((name, i) => `<span class="${i === 0 ? "on" : ""}">${name}</span>`)
    .join("")
  const periods = ["Aktuelle Woche", "Letzte Woche", "Aktueller Monat", "Letzter Monat"]
    .map((name) => `<span class="${name === "Aktuelle Woche" ? "on" : ""}">${name}</span>`)
    .join("")
  return (
    `<div class="mh ts-head"><div><h3>Zeiterfassung</h3>` +
    `<ul class="ts-stats"><li class="plus"><span>Zeitkonto</span><b>${hoursText(14.5, true)}</b></li><li><span>Resturlaub</span><b>17 Tage</b></li></ul></div>` +
    `<div style="display:flex;gap:.5rem"><span class="pill">Urlaub / Abwesenheit</span><span class="pill pri">+ Zeit buchen</span></div></div>` +
    `<div class="ts-tabs">${tabs}</div>` +
    `<div class="ts-filter"><div class="seg">${periods}</div><span class="range">19.10.2026 – 25.10.2026</span></div>` +
    `<div class="ts-kpis">` +
    `<div class="tk lead"><small>Gearbeitet</small><b>${hoursText(ist)}</b><div class="prog"><i style="width:${share.toFixed(0)}%"></i></div><em>von ${hoursText(sollToDate)} Soll bis heute</em></div>` +
    `<div class="tk"><small>Saldo</small><b>${hoursText(saldo, true)}</b><em class="${saldo >= 0 ? "up" : "down"}">${saldo >= 0 ? "über dem Soll" : "unter dem Soll"}</em></div>` +
    `<div class="tk"><small>Offene Tage</small><b>0</b><em class="up">alles gebucht</em></div>` +
    `<div class="tk"><small>Abwesend</small><b>0</b><em>Tage · Soll gesamt ${hoursText(40)}</em></div>` +
    `</div>` +
    `<div class="ts-card"><div class="ts-bar"><h5>Kalendertage <span class="cnt">7</span></h5>` +
    `<ul class="ts-legend"><li class="ok">gebucht</li><li class="opn">offen</li><li class="abs">Urlaub / Abwesenheit</li><li class="free">frei</li></ul></div>` +
    `<div class="ts-cal">${weekdays.map((w) => `<span class="wd">${w}</span>`).join("")}${cells.join("")}</div></div>`
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

function tag(kind: string, text: string): string {
  return `<span class="tag is-${kind}">${text}</span>`
}

/** Formate, die das BMF als E-Rechnung nach EN 16931 anerkennt. */
function standards(): string {
  return `<div class="std"><b>E-Rechnung</b><span>XRechnung</span><span>ZUGFeRD</span><span>Factur-X</span><em>EN 16931, bereit für 2027</em></div>`
}

function inbox(): string {
  const rows: [string, string, string, string, string, string, string][] = [
    ["Bürobedarf Holm", "ER-8831", "18.10.2026", "428,40 €", "Postfach", "ZUGFeRD", "wait"],
    ["Cloudhost Nord", "2026-441", "16.10.2026", "1.190,00 €", "Postfach", "XRechnung", "wait"],
    ["Bahn AG", "R-10221", "14.10.2026", "186,20 €", "Upload", "Factur-X", "wait"],
    ["Energie Stadt", "77120", "02.10.2026", "640,00 €", "Postfach", "XRechnung", "book"],
  ]
  const filters = [
    ["Zu prüfen", "4", true],
    ["Verbucht", "18", false],
    ["Dubletten", "1", false],
    ["Alle", "", false],
  ]
    .map(([name, count, on]) => `<span class="${on ? "on" : ""}">${name}${count ? `<em>${count}</em>` : ""}</span>`)
    .join("")
  return (
    head("Eingangsrechnungen", "XRechnung, ZUGFeRD und Factur-X werden direkt gelesen.", '<span class="pill">Oktober 2026</span>') +
    standards() +
    `<div class="drop"><span class="drop-mark">⇪</span><div><b>Rechnungen hochladen</b><p>XML, ZUGFeRD, Factur-X oder PDF – mehrere Dateien auf einmal</p></div></div>` +
    `<div class="seg inv-seg">${filters}</div>` +
    `<div class="kpis inv-kpis">` +
    `<div class="kpi"><small>Offen</small><b>12.480 €</b><i class="up">4 Belege zu prüfen</i></div>` +
    `<div class="kpi"><small>Diese Woche fällig</small><b>2</b><i class="down">1.618 €</i></div>` +
    `<div class="kpi"><small>Strukturiert gelesen</small><b>92 %</b><i class="up">ohne Abtippen</i></div>` +
    `<div class="kpi"><small>Verbucht im Oktober</small><b>18</b><i class="up">48.220 €</i></div></div>` +
    `<div class="panel" style="padding:.35rem"><table><thead><tr><th>Lieferant</th><th>Nr.</th><th>Datum</th><th class="n">Betrag</th><th>Herkunft</th><th>Status</th></tr></thead><tbody>` +
    rows
      .map(
        ([supplier, number, date, amount, source, method, state]) =>
          `<tr><td><b class="who-name">${supplier}</b><span class="fine">${method}</span></td><td>${number}</td><td>${date}</td><td class="n">${amount}</td><td>${source}</td><td>${tag(state, state === "book" ? "Verbucht" : "Zu prüfen")}</td></tr>`,
      )
      .join("") +
    `</tbody></table></div>`
  )
}

function outgoing(): string {
  const list: [string, string, string, string, string, string, boolean][] = [
    ["RE-2026-0142", "Nordlicht AG", "12.10.2026", "5.045,60 €", "ready", "XRechnung", true],
    ["RE-2026-0138", "Hafenwerk GmbH", "09.10.2026", "2.180,00 €", "draft", "ZUGFeRD", false],
    ["RE-2026-0131", "Stadtwerke Muster", "02.10.2026", "8.920,00 €", "ready", "Factur-X", false],
    ["RE-2026-0126", "Küstenklinik", "28.09.2026", "1.428,00 €", "draft", "XRechnung", false],
  ]
  return (
    head("Ausgangsrechnungen", "Als XRechnung, ZUGFeRD oder Factur-X ausstellen.", '<span class="pill pri">Neue Rechnung</span>') +
    standards() +
    `<div class="kpis inv-kpis">` +
    `<div class="kpi"><small>Offener Betrag</small><b>17.574 €</b><i class="up">4 Rechnungen</i></div>` +
    `<div class="kpi"><small>E-Rechnungen</small><b>4</b><i class="up">EN 16931</i></div>` +
    `<div class="kpi"><small>Entwürfe</small><b>2</b><i>noch offen</i></div>` +
    `<div class="kpi"><small>Diesen Monat</small><b>13.966 €</b><i class="up">▲ 11 %</i></div></div>` +
    `<div class="inv-split">` +
    `<div class="panel inv-list">${list
      .map(
        ([number, customer, date, amount, state, format, on]) =>
          `<div class="inv-row${on ? " on" : ""}"><div><b>${number}</b><span>${customer} · ${date} · ${format}</span></div><div class="inv-side"><em>${amount}</em>${tag(state, state === "ready" ? "Bereit" : "Entwurf")}</div></div>`,
      )
      .join("")}</div>` +
    `<article class="paper">` +
    `<div class="gold"></div>` +
    `<header class="inv-head"><p class="brand">Muster GmbH</p><h4>Rechnung</h4><div class="meta"><strong>Nr. RE-2026-0142</strong><p>12.10.2026</p></div></header>` +
    `<div class="addrs"><div><h5>Kunde</h5><p>Nordlicht AG</p><p>Hafenstraße 12</p><p>20457 Hamburg</p></div>` +
    `<div><h5>Rechnungssteller</h5><p>Muster GmbH</p><p>Kai 4</p><p>20457 Hamburg</p><p>USt-IdNr.: DE123456789</p></div></div>` +
    `<section class="pos"><h5>Positionen</h5><table><thead><tr><th>Pos.</th><th>Leistung</th><th class="n">Menge</th><th class="n">Preis</th><th class="n">USt.</th><th class="n">Summe</th></tr></thead><tbody>` +
    `<tr><td>1</td><td>Beratung Controlling</td><td class="n">12 Std</td><td class="n">120,00 €</td><td class="n">19 %</td><td class="n">1.440,00 €</td></tr>` +
    `<tr><td>2</td><td>Dashboard Vertrieb</td><td class="n">1 Pauschale</td><td class="n">2.800,00 €</td><td class="n">19 %</td><td class="n">2.800,00 €</td></tr>` +
    `</tbody></table></section>` +
    `<div class="sum"><table><tbody><tr><td>Netto</td><td>4.240,00 €</td></tr><tr><td>USt 19 %</td><td>805,60 €</td></tr><tr class="total"><td>Gesamtbetrag</td><td>5.045,60 €</td></tr></tbody></table></div>` +
    `<div class="pay"><h5>Zahlungsinformation</h5><p>Bitte überweisen Sie <strong>5.045,60 €</strong> bis spätestens <strong>11.11.2026</strong> unter Angabe des Verwendungszwecks „<strong>RE-2026-0142</strong>“ an IBAN <strong>DE89 3704 0044 0532 0130 00</strong>.</p><p>Überweisung · XRechnung</p></div>` +
    `<footer>Muster GmbH · USt-IdNr.: DE123456789 · Bankverbindung: DE89 3704 0044 0532 0130 00</footer>` +
    `</article></div>`
  )
}

function cash(): string {
  const days: [string, string, string][] = [
    ["Mo", "42", "up"],
    ["Di", "18", "down"],
    ["Mi", "61", "up"],
    ["Do", "9", "down"],
    ["Fr", "24", "up"],
    ["Mo", "15", "plan"],
  ]
  const tabs = ["Übersicht", "Bankkonten", "Journal", "Zahlungsverfolgung"]
    .map((name, i) => `<span class="${i === 0 ? "on" : ""}">${name}</span>`)
    .join("")
  return (
    head("Cash-Management", "Bestand, tägliche Zahlungen und Vorschau.", '<span class="pill">13.10. – 21.10.2026</span>') +
    `<div class="ts-tabs">${tabs}</div>` +
    `<div class="kpis inv-kpis">` +
    `<div class="kpi"><small>Liquidität am 21.10.</small><b>4,82 Mio.</b><i class="up">▲ 1,8 % gegenüber Plan</i></div>` +
    `<div class="kpi"><small>Netto-Cashflow</small><b>+186 T€</b><i class="up">über Plan</i></div>` +
    `<div class="kpi"><small>Tiefststand 30 Tage</small><b>4,41 Mio.</b><i>am 04.11.</i></div>` +
    `<div class="kpi"><small>Reichweite</small><b>64 Tage</b><i class="up">im Rahmen</i></div></div>` +
    `<div class="panel"><h5>Liquiditätsentwicklung</h5><div class="sub">Ist bis heute, danach schraffiert der Plan. Zahl am Balken in Tausend Euro.</div>` +
    `<div class="wf-sum"><span>Anfang <b>4,62 Mio.</b></span><span>Veränderung <b class="up">+0,20 Mio.</b></span><span>Ende <b>4,82 Mio.</b></span></div>` +
    `<div class="wf">${days
      .map(([label, value, kind]) => `<div class="${kind}"><em>${kind === "down" ? "−" : "+"}${value}</em><i style="height:${value}%"></i><span>${label}</span></div>`)
      .join("")}</div></div>`
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
  { tab: "Eingangsrechnungen", nav: "Eingang", title: "Eingangsrechnungen", html: inbox },
  { tab: "Ausgangsrechnungen", nav: "Ausgang", title: "Ausgangsrechnungen", html: outgoing },
  { tab: "Cash-Management", nav: "Liquidität", title: "Cash-Management", html: cash },
  {
    tab: "KI-Assistent",
    nav: "Performance",
    title: "Daten-Agent",
    html: () =>
      head("Daten-Agent", "Fragen zu den eigenen Daten in normaler Sprache", '<span class="pill">Neuer Chat</span>') +
      `<div class="chat">
        <div class="msg q">Wie hat sich die Auslastung im Team Süd in den letzten sechs Monaten entwickelt?</div>
        <div class="msg a"><div class="who">Daten-Agent</div>Die Auslastung im Team Süd ist seit Mai von 74 % auf 85 % gestiegen. Der größte Sprung liegt im August, nachdem zwei Projekte gestartet sind.
          <div style="margin-top:.8rem">${bars([["Mai", 74], ["Jun", 76], ["Jul", 78], ["Aug", 84], ["Sep", 85], ["Okt", 85]], 440, 60)}</div></div>
        <div class="msg q">Welche Projekte tragen dazu am meisten bei?</div>
        <div class="msg a"><div class="who">Daten-Agent</div>Dashboard Vertrieb (P-1042) mit 412 Stunden und Datenanbindung ERP (P-1017) mit 268 Stunden.</div></div>`,
  },
]

export function Showcase() {
  const [current, setCurrent] = useState(0)
  // nach einem Klick auf einen Reiter läuft der Wechsel von dort aus weiter
  const [tick, setTick] = useState(0)
  const tabsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const section = document.getElementById("insights")
    let timer = 0
    const stop = () => window.clearInterval(timer)
    const start = () => {
      stop()
      timer = window.setInterval(() => setCurrent((index) => (index + 1) % SCREENS.length), 7000)
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) start()
      else stop()
    })
    if (section) observer.observe(section)
    else start()
    return () => {
      stop()
      observer.disconnect()
    }
  }, [tick])

  useEffect(() => {
    const list = tabsRef.current
    const tab = list?.querySelector<HTMLButtonElement>('[aria-selected="true"]')
    if (!list || !tab) return
    const left = tab.offsetLeft - (list.clientWidth - tab.offsetWidth) / 2
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    list.scrollTo({ left: Math.max(0, left), behavior: reduce ? "auto" : "smooth" })
  }, [current])

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

          <div className="tabs" role="tablist" ref={tabsRef}>
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
        </div>
      </section>
    </div>
  )
}
