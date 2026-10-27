import {
  getSelectedDietaryConditions,
  getSelectedMedicineAllergies,
  getSelectedSensitivities,
  groupSelectedFoods,
  type PublicProfile,
} from "@/features/profile/profile-data"
import type { ProfileSection } from "@/app/use-hash-route"
import { spokenTranslations } from "@/features/profile/spoken-translations"
import { translations, type SupportedLanguage } from "@/features/profile/translations"

function asSentence(text: string) {
  return /[.!?؟]$/.test(text.trim()) ? text.trim() : `${text.trim()}.`
}

export function getProfileSpeechText(
  profile: PublicProfile,
  language: SupportedLanguage,
  section: ProfileSection = "food",
) {
  const copy = translations[language]
  const spokenCopy = spokenTranslations[language]
  const listSeparator = language === "ar" ? "، " : ", "
  const foods = groupSelectedFoods(profile.selectedFoodIds).flatMap((group) =>
    group.foods.map((food) => spokenCopy?.foods[food.id] ?? copy.foods[food.id]),
  )
  const conditions = getSelectedDietaryConditions(profile.dietaryConditionIds).map(
    (condition) => spokenCopy?.dietaryConditions[condition.id] ?? copy.dietaryConditions[condition.id],
  )
  const medicines = getSelectedMedicineAllergies(profile.medicineAllergyIds).map(
    (medicine) => spokenCopy?.medicines[medicine.id] ?? copy.medicines[medicine.id],
  )
  const sensitivities = getSelectedSensitivities(profile.sensitivityIds).map(
    (sensitivity) => spokenCopy?.sensitivities[sensitivity.id] ?? copy.sensitivities[sensitivity.id],
  )
  const emergencyInfo = profile.emergencyInfo
  const epinephrineLocation =
    emergencyInfo?.epinephrineLocationTranslations?.[language] ?? emergencyInfo?.epinephrineLocation
  const emergencySummary = emergencyInfo
    ? [
        spokenCopy?.emergencyInformation ?? copy.emergencyInformation,
        spokenCopy?.emergencyServicesInstruction ?? copy.emergencyServicesInstruction,
        emergencyInfo.carriesEpinephrine ? (spokenCopy?.carriesEpinephrine ?? copy.carriesEpinephrine) : "",
        epinephrineLocation
          ? `${spokenCopy?.location ?? copy.location}: ${epinephrineLocation}`
          : "",
      ].filter(Boolean).map(asSentence).join(" ")
    : ""

  const sectionSummary = section === "medicine"
    ? [
        spokenCopy?.medicineIntro ?? copy.medicineStaffIntro,
        `${spokenCopy?.medicineListLabel ?? copy.medicineAllergiesHeading}: ${medicines.join(listSeparator)}`,
      ]
    : [
        spokenCopy?.foodIntro ?? copy.staffHeading,
        `${spokenCopy?.foodListLabel ?? copy.foodAllergies}: ${[...foods, ...conditions].join(listSeparator)}`,
        sensitivities.length > 0
          ? `${spokenCopy?.sensitivityListLabel ?? copy.sensitivitiesHeading}: ${sensitivities.join(listSeparator)}`
          : "",
      ]

  return [
    ...sectionSummary,
    emergencySummary,
    section === "medicine"
      ? (spokenCopy?.medicineAlternativeInstruction ?? copy.medicineAlternativeInstruction)
      : (spokenCopy?.cannotAccommodate ?? copy.cannotAccommodate),
  ].filter(Boolean).map(asSentence).join(" ")
}
