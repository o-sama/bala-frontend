import { ShieldCheck, WheatOff } from "lucide-react"

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
    <Card key={condition.id} className="border border-condition-border bg-condition-panel text-condition-ink">
      <CardHeader className="gap-2 px-5 pt-5">
        <h2 className="flex items-center gap-2 text-lg font-bold">
          <WheatOff className="size-5" />
          {copy.dietaryConditions[condition.id]}
        </h2>
        <p className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white/70 px-3 py-1 text-xs font-bold">
          <ShieldCheck className="size-4" />
          {copy.strictlyGlutenFree}
        </p>
      </CardHeader>
      <CardContent className="space-y-2 px-5 pb-5 text-sm leading-5">
        <p className="opacity-80">{copy.celiacExplanation}</p>
        <p className="font-semibold">{copy.celiacAvoidanceInstruction}</p>
      </CardContent>
    </Card>
  ))
}
