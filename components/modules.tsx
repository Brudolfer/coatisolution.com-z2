import type { CSSProperties } from "react"

import { BI_MODULES } from "@/lib/bi-modules"

export function Modules() {
  return (
    <div className="bx">
      <section className="sec">
        <div className="wrap">
          <div className="sec-head">
            <div className="kicker">Plattform</div>
            <h2>
              Ein System. <span className="grad">Sechs Welten.</span>
            </h2>
            <p>Jedes Modul funktioniert für sich und alle greifen auf dasselbe Datenmodell zu.</p>
          </div>
          <div className="mods">
            {BI_MODULES.map((module) => (
              <article
                key={module.title}
                className="mod"
                style={
                  {
                    "--hi": module.colors[0],
                    "--mid": module.colors[1],
                    "--lo": module.colors[2],
                    "--glow": module.colors[3],
                    "--c": module.colors[0],
                  } as CSSProperties
                }
              >
                <div className="orb" />
                <h3>{module.title}</h3>
                <p>{module.summary}</p>
                <ul>
                  {module.points.map(([name]) => (
                    <li key={name}>{name}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
