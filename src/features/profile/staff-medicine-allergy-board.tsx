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
          <div key={medicineAllergy.id} className="rounded-xl bg-white/75 px-4 py-3">
            <div className="flex items-center gap-3">
              <ShieldAlert className="size-6 shrink-0" />
              <span className="text-xl font-bold">{copy.medicines[medicineAllergy.id]}</span>
            </div>
            <dl className="mt-3 grid gap-2 border-t border-medicine-border/40 pt-3 text-sm">
              <div>
                <dt className="font-bold">{copy.drugFamily}</dt>
                <dd>{copy.medicineDetails[medicineAllergy.id].drugFamily}</dd>
              </div>
              <div>
                <dt className="font-bold">{copy.alsoKnownAs}</dt>
                <dd>{copy.medicineDetails[medicineAllergy.id].alternateNames}</dd>
              </div>
            </dl>
          </div>
        ))}
        <p className="pt-1 text-sm font-semibold leading-5">{copy.medicineEmergencyInstruction}</p>
      </div>
    </section>
  )
}
