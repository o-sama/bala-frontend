import { Pill, ShieldAlert } from "lucide-react"

import { MedicineProfileDetails } from "@/features/profile/medicine-profile-details"
import type { MedicineAllergy, PublicProfile } from "@/features/profile/profile-data"
import { translations, type SupportedLanguage } from "@/features/profile/translations"

interface StaffMedicineAllergyBoardProps {
  medicineAllergies: MedicineAllergy[]
  details?: PublicProfile["medicineAllergyDetails"]
  language: SupportedLanguage
}

export function StaffMedicineAllergyBoard({ medicineAllergies, language, details }: StaffMedicineAllergyBoardProps) {
  const copy = translations[language]

  return (
    <section
      className="overflow-hidden rounded-2xl border-2 border-s-[6px] border-medicine-border/60 border-s-medicine-border bg-card text-medicine-ink shadow-sm"
      aria-labelledby="staff-medicine-allergies-heading"
    >
      <header className="border-b border-border px-5 py-4">
        <h2 id="staff-medicine-allergies-heading" className="flex items-start gap-3 text-xl font-bold leading-tight">
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-medicine-panel">
            <Pill className="size-6" />
          </span>
          {copy.medicineAllergiesStaffHeading}
        </h2>
      </header>
      <div className="space-y-2 px-5 py-4">
        {medicineAllergies.map((medicineAllergy) => (
          <div key={medicineAllergy.id} className="rounded-xl bg-medicine-panel px-4 py-3">
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
            <MedicineProfileDetails details={details?.[medicineAllergy.id]} language={language} />
          </div>
        ))}
        <p className="pt-1 text-sm font-semibold leading-5">{copy.medicineEmergencyInstruction}</p>
      </div>
    </section>
  )
}
