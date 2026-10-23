"use client"

import { ArrowRight } from "lucide-react"

import { GlobeStage } from "@/components/globe-stage"

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
}

export function Hero() {
  return (
    <div className="bx">
      <section className="hero">
        <div className="grid-bg" />
        <div className="wrap hero-in">
          <div>
            <h1>
              <span className="grad">Data. Science. Business.</span>
              <br />
              Daten mit dem richtigen Dreh
            </h1>

            <p className="lead">
              Wir entwickeln modernste Webanwendungen und beeindruckende Dashboards, die Ihr Unternehmen transformieren.
              Von der Idee bis zur Umsetzung - wir machen es möglich.
            </p>

            <p className="tag-sub">Aus Zahlen wird Klarheit. Aus Klarheit wird Vorsprung.</p>

            <div className="cta">
              <button type="button" className="btn btn-pri" onClick={() => scrollTo("contact")}>
                Projekt starten
                <ArrowRight className="h-5 w-5" />
              </button>
              <button type="button" className="btn btn-ghost" onClick={() => scrollTo("insights")}>
                Einblicke ansehen
              </button>
            </div>

            <div className="chips">
              <span>Web Design</span>
              <span>Dashboards</span>
              <span>Individuelle Lösungen</span>
            </div>
          </div>

          <GlobeStage />
        </div>
      </section>
    </div>
  )
}
