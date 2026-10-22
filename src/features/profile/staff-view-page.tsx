import { ArrowLeft, TriangleAlert } from "lucide-react"

import { Button } from "@/components/ui/button"
import { LanguageSelect } from "@/features/profile/language-select"
import { getSelectedSensitivities, groupSelectedFoods, type PublicProfile } from "@/features/profile/profile-data"
import { StaffAllergyBoard } from "@/features/profile/staff-allergy-board"
import { StaffSensitivityBoard } from "@/features/profile/staff-sensitivity-board"
import { translations, type SupportedLanguage } from "@/features/profile/translations"

interface StaffViewPageProps {
  profile: PublicProfile
  language: SupportedLanguage
  onLanguageChange: (language: SupportedLanguage) => void
  onBack: () => void
}

export function StaffViewPage({ profile, language, onLanguageChange, onBack }: StaffViewPageProps) {
  const copy = translations[language]
  const groups = groupSelectedFoods(profile.selectedFoodIds)
  const selectedFoods = groups.flatMap((group) => group.foods)
  const sensitivities = getSelectedSensitivities(profile.sensitivityIds)

  return (
    <main className="phone-panel bg-warm-white space-y-6" dir={copy.direction} aria-labelledby="staff-heading">
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
          {copy.staffEyebrow}
        </p>
        <p id="staff-heading" className="text-lg font-bold text-foreground">{profile.fullName}</p>
      </section>

      <StaffAllergyBoard foods={selectedFoods} language={language} />

      {sensitivities.length > 0 && <StaffSensitivityBoard sensitivities={sensitivities} language={language} />}

      <p className="rounded-2xl border border-border bg-background px-5 py-4 text-lg font-bold leading-6 text-secondary-foreground">
        {copy.cannotAccommodate}
      </p>

      <footer className="flex items-center justify-between border-t border-border pt-6 font-bold text-foreground">
        <span>{copy.thankYou}</span>
        <span>Bala <span className="text-[0.6rem] uppercase tracking-widest text-muted-foreground">app</span></span>
      </footer>
    </main>
  )
}
