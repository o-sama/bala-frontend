import { Pill, ShieldAlert } from "lucide-react"

import type { MedicineAllergy } from "@/features/profile/profile-data"
import { translations, type SupportedLanguage } from "@/features/profile/translations"

interface StaffMedicineAllergyBoardProps {
  medicineAllergies: MedicineAllergy[]
  language: SupportedLanguage
}

export function StaffMedicineAllergyBoard({ medicineAllergies, language }: StaffMedicineAllergyBoardProps) {
  const copy = translations[language]

  return (
    <section
      className="overflow-hidden rounded-2xl border-2 border-medicine-border bg-medicine-panel text-medicine-ink"
      aria-labelledby="staff-medicine-allergies-heading"
    >
      <header className="border-b border-medicine-border px-5 py-4">
        <h2 id="staff-medicine-allergies-heading" className="flex items-start gap-3 text-xl font-bold leading-tight">
          <Pill className="mt-0.5 size-6 shrink-0" />
          {copy.medicineAllergiesStaffHeading}
        </h2>
      </header>
      <div className="space-y-2 px-5 py-4">
        {medicineAllergies.map((medicineAllergy) => (
          <div key={medicineAllergy.id} className="flex items-center gap-3 rounded-xl bg-white/75 px-4 py-3">
            <ShieldAlert className="size-6 shrink-0" />
            <span className="text-xl font-bold">{copy.medicines[medicineAllergy.id]}</span>
          </div>
        ))}
        <p className="pt-1 text-sm font-semibold leading-5">{copy.medicineEmergencyInstruction}</p>
      </div>
    </section>
  )
}
