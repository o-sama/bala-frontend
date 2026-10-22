import { ArrowUpRight, Info, Utensils } from "lucide-react"

import { Button } from "@/components/ui/button"
import { AllergenSection } from "@/features/profile/allergen-section"
import { AppHeader } from "@/features/profile/app-header"
import { getSelectedSensitivities, groupSelectedFoods, type PublicProfile } from "@/features/profile/profile-data"
import { SensitivitySection } from "@/features/profile/sensitivity-section"
import { translations, type SupportedLanguage } from "@/features/profile/translations"

interface PublicProfilePageProps {
  profile: PublicProfile
  language: SupportedLanguage
  onLanguageChange: (language: SupportedLanguage) => void
  onShowToStaff: () => void
}

export function PublicProfilePage({ profile, language, onLanguageChange, onShowToStaff }: PublicProfilePageProps) {
  const copy = translations[language]
  const groups = groupSelectedFoods(profile.selectedFoodIds)
  const sensitivities = getSelectedSensitivities(profile.sensitivityIds)
  const date = new Intl.DateTimeFormat(copy.locale, { dateStyle: "medium" }).format(
    new Date(`${profile.updatedAt}T12:00:00`),
  )

  return (
    <main className="phone-panel space-y-6" dir={copy.direction} aria-labelledby="profile-heading">
      <AppHeader language={language} onLanguageChange={onLanguageChange} homeHref={`#/p/${profile.id}`} />

      <section className="flex items-center gap-3" aria-label="Profile owner">
        <div className="grid size-11 place-items-center rounded-full bg-muted text-lg font-bold text-primary">
          {profile.firstName.at(0)}
        </div>
        <div>
          <p className="font-bold text-foreground">{profile.fullName}</p>
          <p className="text-xs text-muted-foreground">{copy.allergyProfile} · {copy.shareWithKitchen}</p>
        </div>
      </section>

      <section className="space-y-3">
        <p className="eyebrow">{copy.foodAllergies}</p>
        <h1 id="profile-heading" className="text-3xl font-bold leading-tight tracking-tight text-foreground">
          {copy.profileHeading}
        </h1>
        <p className="text-[0.95rem] leading-6 text-muted-foreground">{copy.profileIntro}</p>
      </section>

      <div className="space-y-4">
        {groups.map((group) => (
          <AllergenSection key={group.familyId} {...group} language={language} />
        ))}
      </div>

      {sensitivities.length > 0 && <SensitivitySection sensitivities={sensitivities} language={language} />}

      <Button size="lg" className="w-full justify-between" onClick={onShowToStaff}>
        {copy.showToStaff}
        <ArrowUpRight className="size-5" />
      </Button>

      <section className="space-y-3">
        <h2 className="flex items-center gap-2 text-lg font-bold text-foreground">
          <Utensils className="size-5" />
          {copy.preparationHeading}
        </h2>
        <p className="leading-6 text-secondary-foreground">{copy.avoidCrossContact}</p>
        <p className="leading-6 text-secondary-foreground">{copy.cannotAccommodate}</p>
      </section>

      <p className="flex gap-2 text-xs leading-5 text-muted-foreground">
        <Info className="mt-0.5 size-4 shrink-0" />
        {copy.unlistedNotice}
      </p>

      <footer className="border-t border-border pt-5 text-[0.7rem] text-muted-foreground">
        {copy.profileOwner}: {profile.fullName} · {copy.updated}: {date}
      </footer>
    </main>
  )
}
