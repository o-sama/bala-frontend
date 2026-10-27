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
      className="overflow-hidden rounded-2xl border-2 border-s-[6px] border-condition-border/60 border-s-condition-border bg-card text-condition-ink shadow-sm"
      aria-labelledby={`staff-condition-${condition.id}`}
    >
      <header className="border-b border-border px-5 py-4">
        <h2 id={`staff-condition-${condition.id}`} className="flex items-start gap-3 text-xl font-bold leading-tight">
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-condition-panel">
            <WheatOff className="size-6" />
          </span>
          {copy.celiacStaffHeading}
        </h2>
      </header>
      <div className="space-y-3 px-5 py-4">
        <p className="flex items-start gap-2 rounded-xl bg-condition-panel px-4 py-3 text-base font-bold leading-6">
          <ShieldAlert className="mt-0.5 size-5 shrink-0" />
          {copy.celiacAvoidanceInstruction}
        </p>
        <p className="text-xs leading-5 opacity-80">{copy.celiacExplanation}</p>
      </div>
    </section>
  ))
}
