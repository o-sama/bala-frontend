import { Info, Utensils } from "lucide-react"

import { AllergenSection } from "@/features/profile/allergen-section"
import { DietaryConditionSection } from "@/features/profile/dietary-condition-section"
import {
  getSelectedDietaryConditions,
  getSelectedSensitivities,
  groupSelectedFoods,
  type PublicProfile,
} from "@/features/profile/profile-data"
import { SensitivitySection } from "@/features/profile/sensitivity-section"
import { translations, type SupportedLanguage } from "@/features/profile/translations"

interface FoodProfileContentProps {
  profile: PublicProfile
  language: SupportedLanguage
  showEyebrow: boolean
}

export function FoodProfileContent({ profile, language, showEyebrow }: FoodProfileContentProps) {
  const copy = translations[language]
  const groups = groupSelectedFoods(profile.selectedFoodIds)
  const dietaryConditions = getSelectedDietaryConditions(profile.dietaryConditionIds)
  const sensitivities = getSelectedSensitivities(profile.sensitivityIds)

  return (
    <div className="space-y-6">
      <section className="space-y-2">
        {showEyebrow && <p className="eyebrow">{copy.foodAllergies}</p>}
        <h1 id="profile-heading" className="text-3xl font-bold leading-tight tracking-tight text-foreground">
          {copy.profileHeading}
        </h1>
        <p className="text-sm leading-6 text-muted-foreground">{copy.profileIntro}</p>
      </section>

      <div className="space-y-4" role="group" aria-label={copy.foodAllergies}>
        {groups.map((group) => (
          <AllergenSection key={group.familyId} {...group} language={language} />
        ))}

        {dietaryConditions.length > 0 && (
          <DietaryConditionSection dietaryConditions={dietaryConditions} language={language} />
        )}
      </div>

      {sensitivities.length > 0 && <SensitivitySection sensitivities={sensitivities} language={language} />}

      <section className="overflow-hidden rounded-2xl border border-s-4 border-border border-s-primary bg-card shadow-sm">
        <div className="space-y-2 px-5 py-4">
          <h2 className="flex items-center gap-2 text-lg font-bold text-foreground">
            <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-muted">
              <Utensils className="size-5" />
            </span>
            {copy.preparationHeading}
          </h2>
          <p className="text-sm leading-6 text-secondary-foreground">{copy.avoidCrossContact} {copy.cannotAccommodate}</p>
        </div>
        <p role="note" className="flex gap-3 border-t border-alert/15 bg-alert/5 px-5 py-3 text-sm font-semibold leading-5 text-alert">
          <Info className="mt-0.5 size-5 shrink-0" />
          {copy.unlistedNotice}
        </p>
      </section>
    </div>
  )
}
