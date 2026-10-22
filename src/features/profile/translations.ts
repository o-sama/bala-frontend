import type { AllergenFamilyId, FoodId, SensitivityId } from "@/features/profile/profile-data"

export type SupportedLanguage = "en" | "fr"

interface Copy {
  languageName: string
  allergyProfile: string
  shareWithKitchen: string
  foodAllergies: string
  profileHeading: string
  profileIntro: string
  showToStaff: string
  preparationHeading: string
  avoidCrossContact: string
  cannotAccommodate: string
  unlistedNotice: string
  profileOwner: string
  updated: string
  staffEyebrow: string
  staffHeading: string
  back: string
  thankYou: string
  staffAllergiesHeading: string
  staffAvoidanceInstruction: string
  sensitivitiesHeading: string
  sensitivitiesStaffHeading: string
  avoidIfPossible: string
  sensitivityExplanation: string
  families: Record<AllergenFamilyId, string>
  foods: Record<FoodId, string>
  sensitivities: Record<SensitivityId, string>
}

export const translations: Record<SupportedLanguage, Copy> = {
  en: {
    languageName: "English",
    allergyProfile: "Food allergy profile",
    shareWithKitchen: "Share with your kitchen",
    foodAllergies: "Food allergies",
    profileHeading: "Please check my food allergies.",
    profileIntro: "Please check these specific ingredients before preparing or serving my food.",
    showToStaff: "Show to staff",
    preparationHeading: "When preparing my food",
    avoidCrossContact: "Please avoid these ingredients and cross-contact with them.",
    cannotAccommodate: "Tell me if my meal cannot be prepared to meet these needs.",
    unlistedNotice: "Foods not listed here have not been marked as safe.",
    profileOwner: "Profile owner",
    updated: "Updated",
    staffEyebrow: "Please show the kitchen",
    staffHeading: "I am allergic to these foods.",
    back: "Back",
    thankYou: "Thank you for checking.",
    staffAllergiesHeading: "Allergies — strict avoidance",
    staffAvoidanceInstruction: "Avoid ingredients and cross-contact",
    sensitivitiesHeading: "Sensitivities (not allergies)",
    sensitivitiesStaffHeading: "Sensitivities — avoid if possible",
    avoidIfPossible: "Avoid if possible",
    sensitivityExplanation: "These are preferences for comfort and are not food allergies.",
    families: { "tree-nuts": "Tree nut allergies", legumes: "Peanut allergy" },
    foods: {
      walnut: "Walnuts",
      cashew: "Cashews",
      pistachio: "Pistachios",
      almond: "Almonds",
      hazelnut: "Hazelnuts",
      pecan: "Pecans",
      "brazil-nut": "Brazil nuts",
      "macadamia-nut": "Macadamia nuts",
      peanut: "Peanuts",
    },
    sensitivities: { lactose: "Lactose" },
  },
  fr: {
    languageName: "Français",
    allergyProfile: "Profil d’allergies alimentaires",
    shareWithKitchen: "À partager avec la cuisine",
    foodAllergies: "Allergies alimentaires",
    profileHeading: "Veuillez vérifier mes allergies alimentaires.",
    profileIntro: "Veuillez vérifier ces ingrédients précis avant de préparer ou de servir mon repas.",
    showToStaff: "Montrer au personnel",
    preparationHeading: "Lors de la préparation",
    avoidCrossContact: "Veuillez éviter ces ingrédients et tout contact croisé avec ceux-ci.",
    cannotAccommodate: "Dites-moi si mon repas ne peut pas être préparé selon ces besoins.",
    unlistedNotice: "Les aliments absents de cette liste ne sont pas indiqués comme sûrs.",
    profileOwner: "Titulaire du profil",
    updated: "Mis à jour",
    staffEyebrow: "Veuillez montrer à la cuisine",
    staffHeading: "Je suis allergique à ces aliments.",
    back: "Retour",
    thankYou: "Merci d’avoir vérifié.",
    staffAllergiesHeading: "Allergies — évitement strict",
    staffAvoidanceInstruction: "Éviter les ingrédients et tout contact croisé",
    sensitivitiesHeading: "Sensibilités (pas des allergies)",
    sensitivitiesStaffHeading: "Sensibilités — à éviter si possible",
    avoidIfPossible: "À éviter si possible",
    sensitivityExplanation: "Ce sont des préférences pour le confort et non des allergies alimentaires.",
    families: { "tree-nuts": "Allergies aux noix", legumes: "Allergie aux arachides" },
    foods: {
      walnut: "Noix de Grenoble",
      cashew: "Noix de cajou",
      pistachio: "Pistaches",
      almond: "Amandes",
      hazelnut: "Noisettes",
      pecan: "Noix de pécan",
      "brazil-nut": "Noix du Brésil",
      "macadamia-nut": "Noix de macadamia",
      peanut: "Arachides",
    },
    sensitivities: { lactose: "Lactose" },
  },
}

export function detectLanguage(languages: readonly string[] = navigator.languages): SupportedLanguage {
  return languages.some((language) => language.toLowerCase().startsWith("fr")) ? "fr" : "en"
}
