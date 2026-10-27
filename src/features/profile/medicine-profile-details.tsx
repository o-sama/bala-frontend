import type { MedicineAllergyDetails } from "@/features/profile/profile-data"
import { localizeProfileText } from "@/features/profile/localized-profile-text"
import { interactionCopy } from "@/features/profile/interaction-copy"
import type { SupportedLanguage } from "@/features/profile/translations"

interface MedicineProfileDetailsProps {
  details?: MedicineAllergyDetails
  language: SupportedLanguage
}

export function MedicineProfileDetails({ details, language }: MedicineProfileDetailsProps) {
  const copy = interactionCopy[language]
  const fields = [
    { label: copy.recordedReaction, value: localizeProfileText(details?.reaction, language) },
    { label: copy.medicineNotes, value: localizeProfileText(details?.notes, language) },
  ]
  if (!fields.some((field) => field.value)) return null

  return (
    <dl className="mt-3 space-y-3 border-t border-medicine-border/40 pt-3 text-sm">
      {fields.map(({ label, value }) => value && (
        <div key={label}>
          <dt className="font-bold">{label}</dt>
          <dd lang={value.language} dir="auto">{value.text}</dd>
        </div>
      ))}
    </dl>
  )
}
