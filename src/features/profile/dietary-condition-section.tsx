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
    <Card key={condition.id} className="border-2 border-alert/60 bg-alert/5 text-foreground">
      <CardHeader className="gap-2 px-5 pt-5">
        <h2 className="flex items-center gap-2 text-lg font-bold text-alert">
          <WheatOff className="size-5" />
          {copy.dietaryConditions[condition.id]}
        </h2>
        <p className="inline-flex w-fit items-center gap-1.5 rounded-full bg-alert px-3 py-1 text-xs font-bold text-white">
          <ShieldCheck className="size-4" />
          {copy.strictlyGlutenFree}
        </p>
      </CardHeader>
      <CardContent className="space-y-3 px-5 pb-5 text-sm leading-5">
        <p className="font-semibold text-alert">{copy.celiacExplanation}</p>
        <p className="flex gap-2 rounded-xl border border-alert/25 bg-white/80 px-4 py-3 font-bold">
          <ShieldAlert className="mt-0.5 size-5 shrink-0 text-alert" />
          <span>{copy.celiacAvoidanceInstruction}</span>
        </p>
      </CardContent>
    </Card>
  ))
}
