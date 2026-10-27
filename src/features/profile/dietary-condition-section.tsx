import { ShieldAlert, ShieldCheck, WheatOff } from "lucide-react"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import type { DietaryCondition } from "@/features/profile/profile-data"
import { translations, type SupportedLanguage } from "@/features/profile/translations"

interface DietaryConditionSectionProps {
  dietaryConditions: DietaryCondition[]
  language: SupportedLanguage
}

export function DietaryConditionSection({ dietaryConditions, language }: DietaryConditionSectionProps) {
  const copy = translations[language]

  return dietaryConditions.map((condition) => (
    <Card key={condition.id} className="overflow-hidden border border-s-4 border-border border-s-condition-border bg-card text-foreground shadow-sm">
      <CardHeader className="px-5 pt-5">
        <div className="flex items-start justify-between gap-3">
          <h2 className="flex items-center gap-2 text-lg font-bold text-condition-ink">
            <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-condition-panel">
              <WheatOff className="size-5" />
            </span>
            {copy.dietaryConditions[condition.id]}
          </h2>
          <p className="inline-flex shrink-0 items-center gap-1 rounded-full bg-alert px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-wide text-white">
            <ShieldCheck className="size-3.5" />
            {copy.strictlyGlutenFree}
          </p>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 px-5 pb-5 text-sm leading-5">
        <p className="text-secondary-foreground">{copy.celiacExplanation}</p>
        <p className="flex gap-2 rounded-xl bg-condition-panel px-4 py-3 font-bold text-condition-ink">
          <ShieldAlert className="mt-0.5 size-5 shrink-0" />
          <span>{copy.celiacAvoidanceInstruction}</span>
        </p>
      </CardContent>
    </Card>
  ))
}
