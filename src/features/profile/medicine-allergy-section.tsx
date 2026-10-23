import { Pill, ShieldAlert } from "lucide-react"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import type { MedicineAllergy } from "@/features/profile/profile-data"
import { translations, type SupportedLanguage } from "@/features/profile/translations"

interface MedicineAllergySectionProps {
  medicineAllergies: MedicineAllergy[]
  language: SupportedLanguage
}

export function MedicineAllergySection({ medicineAllergies, language }: MedicineAllergySectionProps) {
  const copy = translations[language]

  return (
    <Card className="border border-medicine-border bg-medicine-panel text-medicine-ink">
      <CardHeader className="gap-2 px-5 pt-5">
        <h2 className="flex items-center gap-2 text-lg font-bold">
          <Pill className="size-5" />
          {copy.medicineAllergiesHeading}
        </h2>
        <p className="text-xs leading-5 opacity-80">{copy.medicineAllergyExplanation}</p>
      </CardHeader>
      <CardContent className="space-y-3 px-5 pb-5">
        {medicineAllergies.map((medicineAllergy) => (
          <div key={medicineAllergy.id} className="flex items-center gap-3 rounded-xl bg-white/70 px-4 py-3">
            <ShieldAlert className="size-6 shrink-0" />
            <span className="text-lg font-bold">{copy.medicines[medicineAllergy.id]}</span>
          </div>
        ))}
        <p className="text-xs font-semibold leading-5">{copy.medicineEmergencyInstruction}</p>
      </CardContent>
    </Card>
  )
}
