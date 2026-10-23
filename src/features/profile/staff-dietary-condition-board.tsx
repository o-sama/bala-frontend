import { ShieldAlert, WheatOff } from "lucide-react"

import type { DietaryCondition } from "@/features/profile/profile-data"
import { translations, type SupportedLanguage } from "@/features/profile/translations"

interface StaffDietaryConditionBoardProps {
  dietaryConditions: DietaryCondition[]
  language: SupportedLanguage
}

export function StaffDietaryConditionBoard({ dietaryConditions, language }: StaffDietaryConditionBoardProps) {
  const copy = translations[language]

  return dietaryConditions.map((condition) => (
    <section
      key={condition.id}
      className="overflow-hidden rounded-2xl border-2 border-condition-border bg-condition-panel text-condition-ink"
      aria-labelledby={`staff-condition-${condition.id}`}
    >
      <header className="border-b border-condition-border px-5 py-4">
        <h2 id={`staff-condition-${condition.id}`} className="flex items-start gap-3 text-xl font-bold leading-tight">
          <WheatOff className="mt-0.5 size-6 shrink-0" />
          {copy.celiacStaffHeading}
        </h2>
      </header>
      <div className="space-y-2 px-5 py-4">
        <p className="flex items-start gap-2 text-base font-bold leading-6">
          <ShieldAlert className="mt-0.5 size-5 shrink-0" />
          {copy.celiacAvoidanceInstruction}
        </p>
        <p className="text-xs leading-5 opacity-80">{copy.celiacExplanation}</p>
      </div>
    </section>
  ))
}
