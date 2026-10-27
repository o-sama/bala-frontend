import { MilkOff } from "lucide-react"

import type { Sensitivity } from "@/features/profile/profile-data"
import { translations, type SupportedLanguage } from "@/features/profile/translations"

interface StaffSensitivityBoardProps {
  sensitivities: Sensitivity[]
  language: SupportedLanguage
}

export function StaffSensitivityBoard({ sensitivities, language }: StaffSensitivityBoardProps) {
  const copy = translations[language]

  return (
    <section className="rounded-2xl border-2 border-s-[6px] border-sensitivity-border/60 border-s-sensitivity-border bg-card p-5 text-sensitivity-ink shadow-sm" aria-labelledby="staff-sensitivities-heading">
      <h2 id="staff-sensitivities-heading" className="text-lg font-bold leading-tight">
        {copy.sensitivitiesStaffHeading}
      </h2>
      <p className="mt-1 text-xs leading-5 opacity-80">{copy.sensitivityExplanation}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {sensitivities.map((sensitivity) => (
          <span key={sensitivity.id} className="inline-flex items-center gap-2 rounded-xl bg-sensitivity-panel px-4 py-2 font-bold">
            <MilkOff className="size-5" />
            {copy.sensitivities[sensitivity.id]}
          </span>
        ))}
      </div>
    </section>
  )
}
