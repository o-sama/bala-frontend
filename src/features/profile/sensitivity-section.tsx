import { CircleCheck, MilkOff } from "lucide-react"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import type { Sensitivity } from "@/features/profile/profile-data"
import { translations, type SupportedLanguage } from "@/features/profile/translations"

interface SensitivitySectionProps {
  sensitivities: Sensitivity[]
  language: SupportedLanguage
}

export function SensitivitySection({ sensitivities, language }: SensitivitySectionProps) {
  const copy = translations[language]

  return (
    <Card className="border border-sensitivity-border bg-sensitivity-panel text-sensitivity-ink">
      <CardHeader className="gap-2 px-5 pt-5">
        <h2 className="flex items-center gap-2 text-base font-bold">
          <CircleCheck className="size-5" />
          {copy.sensitivitiesHeading}
        </h2>
        <p className="text-xs leading-5 opacity-80">{copy.sensitivityExplanation}</p>
      </CardHeader>
      <CardContent className="px-5 pb-5">
        <p className="mb-3 text-[0.68rem] font-bold uppercase tracking-[0.11em]">{copy.avoidIfPossible}</p>
        <div className="flex items-center gap-3 rounded-xl bg-white/65 px-4 py-3">
          <MilkOff className="size-6 shrink-0" />
          <div className="flex flex-wrap items-baseline gap-x-2">
            {sensitivities.map((sensitivity) => (
              <span key={sensitivity.id} className="text-lg font-bold">{copy.sensitivities[sensitivity.id]}</span>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
