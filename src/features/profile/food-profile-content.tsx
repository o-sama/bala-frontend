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
      <section className="space-y-3">
        {showEyebrow && <p className="eyebrow">{copy.foodAllergies}</p>}
        <h1 id="profile-heading" className="text-3xl font-bold leading-tight tracking-tight text-foreground">
          {copy.profileHeading}
        </h1>
        <p className="text-[0.95rem] leading-6 text-muted-foreground">{copy.profileIntro}</p>
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

      <section className="space-y-3">
        <h2 className="flex items-center gap-2 text-lg font-bold text-foreground">
          <Utensils className="size-5" />
          {copy.preparationHeading}
        </h2>
        <p className="leading-6 text-secondary-foreground">{copy.avoidCrossContact}</p>
        <p className="leading-6 text-secondary-foreground">{copy.cannotAccommodate}</p>
      </section>

      <p
        role="note"
        className="flex gap-3 rounded-xl border border-alert/25 bg-alert/5 px-4 py-3 text-sm font-semibold leading-5 text-alert"
      >
        <Info className="mt-0.5 size-5 shrink-0" />
        {copy.unlistedNotice}
      </p>
    </div>
  )
}
