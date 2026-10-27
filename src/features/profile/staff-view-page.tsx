import { useState } from "react"
import { ArrowLeft, TriangleAlert } from "lucide-react"

import type { ProfileSection } from "@/app/use-hash-route"
import { Button } from "@/components/ui/button"
import { CommunicationTools } from "@/features/profile/communication-tools"
import { EmergencyInfoSection } from "@/features/profile/emergency-info-section"
import { LanguageSelect } from "@/features/profile/language-select"
import {
  getSelectedDietaryConditions,
  getSelectedMedicineAllergies,
  getSelectedSensitivities,
  groupSelectedFoods,
  type PublicProfile,
} from "@/features/profile/profile-data"
import { StaffAllergyBoard } from "@/features/profile/staff-allergy-board"
import { StaffDietaryConditionBoard } from "@/features/profile/staff-dietary-condition-board"
import { StaffMedicineAllergyBoard } from "@/features/profile/staff-medicine-allergy-board"
import { getProfileSpeechText } from "@/features/profile/profile-speech-text"
import { StaffPreparationChecklist } from "@/features/profile/staff-preparation-checklist"
import { StaffSensitivityBoard } from "@/features/profile/staff-sensitivity-board"
import { translations, type SupportedLanguage } from "@/features/profile/translations"

interface StaffViewPageProps {
  profile: PublicProfile
  language: SupportedLanguage
  onLanguageChange: (language: SupportedLanguage) => void
  section?: ProfileSection
  onBack: () => void
}

export function StaffViewPage({ profile, language, onLanguageChange, section = "food", onBack }: StaffViewPageProps) {
  const [isLargeText, setIsLargeText] = useState(false)
  const [checkedItems, setCheckedItems] = useState<string[]>([])
  const copy = translations[language]
  const groups = groupSelectedFoods(profile.selectedFoodIds)
  const selectedFoods = groups.flatMap((group) => group.foods)
  const dietaryConditions = getSelectedDietaryConditions(profile.dietaryConditionIds)
  const medicineAllergies = getSelectedMedicineAllergies(profile.medicineAllergyIds)
  const sensitivities = getSelectedSensitivities(profile.sensitivityIds)
  const visibleSection = section === "medicine" && medicineAllergies.length > 0 ? "medicine" : "food"

  return (
    <main
      className={`phone-panel bg-warm-white space-y-6 ${isLargeText ? "large-text-mode" : ""}`}
      dir={copy.direction}
      aria-labelledby="staff-heading"
    >
      <header className="flex items-center justify-between">
        <Button variant="ghost" className="-ms-3" onClick={onBack}>
          <ArrowLeft className="size-4 rtl:rotate-180" />
          {copy.back}
        </Button>
        <LanguageSelect value={language} onChange={onLanguageChange} />
      </header>

      <section className="space-y-2">
        <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.1em] text-alert">
          <TriangleAlert className="size-5" />
          {visibleSection === "medicine" ? copy.medicalStaffEyebrow : copy.staffEyebrow}
        </p>
        <p id="staff-heading" className="text-lg font-bold text-foreground">{profile.fullName}</p>
      </section>

      <CommunicationTools
        language={language}
        speechText={getProfileSpeechText(profile, language, visibleSection)}
        isLargeText={isLargeText}
        onLargeTextChange={setIsLargeText}
      />

      {profile.emergencyInfo && <EmergencyInfoSection emergencyInfo={profile.emergencyInfo} language={language} />}

      {visibleSection === "food" && <StaffAllergyBoard foods={selectedFoods} language={language} />}

      {visibleSection === "food" && dietaryConditions.length > 0 && (
        <StaffDietaryConditionBoard dietaryConditions={dietaryConditions} language={language} />
      )}

      {visibleSection === "medicine" && (
        <StaffMedicineAllergyBoard medicineAllergies={medicineAllergies} language={language} />
      )}

      {visibleSection === "food" && sensitivities.length > 0 && (
        <StaffSensitivityBoard sensitivities={sensitivities} language={language} />
      )}

      {visibleSection === "food" && (
        <StaffPreparationChecklist
          language={language}
          checkedItems={checkedItems}
          onCheckedItemsChange={setCheckedItems}
        />
      )}

      <p className="rounded-2xl border border-border bg-background px-5 py-4 text-lg font-bold leading-6 text-secondary-foreground">
        {visibleSection === "medicine" ? copy.medicineAlternativeInstruction : copy.cannotAccommodate}
      </p>

      <footer className="flex items-center justify-between border-t border-border pt-6 font-bold text-foreground">
        <span>{copy.thankYou}</span>
        <span>Bala <span className="text-[0.6rem] uppercase tracking-widest text-muted-foreground">app</span></span>
      </footer>
    </main>
  )
}
