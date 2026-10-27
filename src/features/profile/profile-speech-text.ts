import {
  getSelectedDietaryConditions,
  getSelectedMedicineAllergies,
  getSelectedSensitivities,
  groupSelectedFoods,
  type PublicProfile,
} from "@/features/profile/profile-data"
import type { ProfileSection } from "@/app/use-hash-route"
import { translations, type SupportedLanguage } from "@/features/profile/translations"

export function getProfileSpeechText(
  profile: PublicProfile,
  language: SupportedLanguage,
  section: ProfileSection = "food",
) {
  const copy = translations[language]
  const foods = groupSelectedFoods(profile.selectedFoodIds).flatMap((group) =>
    group.foods.map((food) => copy.foods[food.id]),
  )
  const conditions = getSelectedDietaryConditions(profile.dietaryConditionIds).map(
    (condition) => copy.dietaryConditions[condition.id],
  )
  const medicines = getSelectedMedicineAllergies(profile.medicineAllergyIds).map(
    (medicine) => copy.medicines[medicine.id],
  )
  const sensitivities = getSelectedSensitivities(profile.sensitivityIds).map(
    (sensitivity) => copy.sensitivities[sensitivity.id],
  )
  const emergencyInfo = profile.emergencyInfo
  const emergencySummary = emergencyInfo
    ? [
        copy.emergencyInformation,
        copy.emergencyServicesInstruction,
        emergencyInfo.carriesEpinephrine ? copy.carriesEpinephrine : "",
        emergencyInfo.epinephrineLocation
          ? `${copy.location}: ${emergencyInfo.epinephrineLocation}.`
          : "",
      ].filter(Boolean).join(". ")
    : ""

  const sectionSummary = section === "medicine"
    ? [copy.medicineStaffIntro, `${copy.medicineAllergiesHeading}: ${medicines.join(", ")}.`]
    : [
        copy.staffHeading,
        `${copy.foodAllergies}: ${[...foods, ...conditions].join(", ")}.`,
        sensitivities.length > 0 ? `${copy.sensitivitiesHeading}: ${sensitivities.join(", ")}.` : "",
      ]

  return [
    ...sectionSummary,
    emergencySummary,
    section === "medicine" ? copy.medicineAlternativeInstruction : copy.cannotAccommodate,
  ].filter(Boolean).join(" ")
}
