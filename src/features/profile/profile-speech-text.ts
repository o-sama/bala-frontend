import {
  getSelectedDietaryConditions,
  getSelectedMedicineAllergies,
  getSelectedSensitivities,
  groupSelectedFoods,
  type PublicProfile,
} from "@/features/profile/profile-data"
import type { ProfileSection } from "@/app/use-hash-route"
import { interactionCopy } from "@/features/profile/interaction-copy"
import { localizeProfileText } from "@/features/profile/localized-profile-text"
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
  const detailCopy = interactionCopy[language]
  const listSeparator = language === "ar" ? "، " : ", "
  const foods = groupSelectedFoods(profile.selectedFoodIds).flatMap((group) =>
    group.foods.map((food) => spokenCopy?.foods[food.id] ?? copy.foods[food.id]),
  )
  const conditions = getSelectedDietaryConditions(profile.dietaryConditionIds).map(
    (condition) => spokenCopy?.dietaryConditions[condition.id] ?? copy.dietaryConditions[condition.id],
  )
  const medicines = getSelectedMedicineAllergies(profile.medicineAllergyIds).map(
    (medicine) => {
      const details = profile.medicineAllergyDetails?.[medicine.id]
      const reaction = localizeProfileText(details?.reaction, language)
      const notes = localizeProfileText(details?.notes, language)
      return [
        spokenCopy?.medicines[medicine.id] ?? copy.medicines[medicine.id],
        `${copy.drugFamily}: ${copy.medicineDetails[medicine.id].drugFamily}`,
        `${copy.alsoKnownAs}: ${copy.medicineDetails[medicine.id].alternateNames}`,
        reaction?.language === language ? `${detailCopy.recordedReaction}: ${reaction.text}` : "",
        notes?.language === language ? `${detailCopy.medicineNotes}: ${notes.text}` : "",
      ].filter(Boolean).map(asSentence).join(" ")
    },
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
        emergencyInfo.carriesEpinephrine && epinephrineLocation
          ? `${spokenCopy?.location ?? copy.location}: ${epinephrineLocation}`
          : "",
        emergencyInfo.contactName || emergencyInfo.contactPhone
          ? `${copy.emergencyContact}: ${[emergencyInfo.contactName, emergencyInfo.contactPhone?.replace(/\d/g, "$& ")].filter(Boolean).join(", ")}`
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
        foods.length > 0 ? `${spokenCopy?.foodListLabel ?? copy.foodAllergies}: ${foods.join(listSeparator)}` : "",
        conditions.length > 0 ? conditions.join(listSeparator) : "",
        conditions.length > 0 ? (spokenCopy?.celiacExplanation ?? copy.celiacExplanation) : "",
        conditions.length > 0 ? (spokenCopy?.celiacAvoidanceInstruction ?? copy.celiacAvoidanceInstruction) : "",
        spokenCopy?.avoidCrossContact ?? copy.avoidCrossContact,
        copy.unlistedNotice,
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
