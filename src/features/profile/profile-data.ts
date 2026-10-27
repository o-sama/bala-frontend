export type FoodId =
  | "walnut"
  | "cashew"
  | "pistachio"
  | "almond"
  | "hazelnut"
  | "pecan"
  | "brazil-nut"
  | "macadamia-nut"
  | "peanut"
  | "soy"
export type AllergenFamilyId = "tree-nuts" | "legumes"
export type SensitivityId = "lactose"
export type MedicineAllergyId = "penicillin"
export type DietaryConditionId = "celiac"
export type ProfileLanguage = "en" | "fr" | "es" | "ar" | "tr"

export interface Food {
  id: FoodId
  familyId: AllergenFamilyId
}

export type LocalizedProfileText = Partial<Record<ProfileLanguage, string>>

export interface MedicineAllergyDetails {
  reaction?: LocalizedProfileText
  notes?: LocalizedProfileText
}

export interface PublicProfile {
  id: string
  firstName: string
  fullName: string
  updatedAt: string
  selectedFoodIds: FoodId[]
  sensitivityIds: SensitivityId[]
  medicineAllergyIds: MedicineAllergyId[]
  medicineAllergyDetails?: Partial<Record<MedicineAllergyId, MedicineAllergyDetails>>
  dietaryConditionIds: DietaryConditionId[]
  emergencyInfo?: EmergencyInfo
}

export interface EmergencyInfo {
  carriesEpinephrine?: boolean
  epinephrineLocation?: string
  epinephrineLocationTranslations?: Partial<Record<ProfileLanguage, string>>
  contactName?: string
  contactPhone?: string
  actionPlanUrl?: string
}

export interface Sensitivity {
  id: SensitivityId
}

export interface MedicineAllergy {
  id: MedicineAllergyId
}

export interface DietaryCondition {
  id: DietaryConditionId
}

export const foods: Food[] = [
  { id: "walnut", familyId: "tree-nuts" },
  { id: "cashew", familyId: "tree-nuts" },
  { id: "pistachio", familyId: "tree-nuts" },
  { id: "almond", familyId: "tree-nuts" },
  { id: "hazelnut", familyId: "tree-nuts" },
  { id: "pecan", familyId: "tree-nuts" },
  { id: "brazil-nut", familyId: "tree-nuts" },
  { id: "macadamia-nut", familyId: "tree-nuts" },
  { id: "peanut", familyId: "legumes" },
  { id: "soy", familyId: "legumes" },
]

export const demoProfile: PublicProfile = {
  id: "alex-demo",
  firstName: "Alex",
  fullName: "Alex Morgan",
  updatedAt: "2026-10-26",
  selectedFoodIds: ["walnut", "cashew", "peanut", "soy"],
  sensitivityIds: ["lactose"],
  medicineAllergyIds: ["penicillin"],
  medicineAllergyDetails: {
    penicillin: {
      reaction: {
        en: "Hives and itching", fr: "Urticaire et démangeaisons", es: "Urticaria y picazón",
        ar: "الشَّرَى وَالحَكَّة", tr: "Kurdeşen ve kaşıntı",
      },
      notes: {
        en: "Reaction reported in childhood. These are fictional demo details.",
        fr: "Réaction signalée pendant l’enfance. Informations fictives de démonstration.",
        es: "Reacción notificada en la infancia. Datos ficticios de demostración.",
        ar: "أُبْلِغَ عَنْ رَدِّ الفِعْلِ فِي الطُّفُولَة. هَذِهِ تَفَاصِيلُ خَيَالِيَّةٌ لِلْعَرْض.",
        tr: "Çocuklukta bildirilen reaksiyon. Bunlar kurgusal demo bilgileridir.",
      },
    },
  },
  dietaryConditionIds: ["celiac"],
  emergencyInfo: {
    carriesEpinephrine: true,
    epinephrineLocation: "Front pocket of backpack",
    epinephrineLocationTranslations: {
      en: "Front pocket of backpack",
      fr: "Poche avant du sac à dos",
      es: "Bolsillo delantero de la mochila",
      ar: "الجَيْبُ الأَمَامِيُّ لِحَقِيبَةِ الظَّهْر",
      tr: "Sırt çantasının ön cebi",
    },
    contactName: "Jamie Morgan",
    contactPhone: "+1 416-555-0142",
    actionPlanUrl: "./alex-demo-emergency-plan.html",
  },
}

export const taliaProfile: PublicProfile = {
  id: "talia",
  firstName: "Talia",
  fullName: "Talia",
  updatedAt: "2026-10-22",
  selectedFoodIds: ["walnut", "almond", "pecan", "brazil-nut", "macadamia-nut"],
  sensitivityIds: [],
  medicineAllergyIds: [],
  dietaryConditionIds: [],
}

const profiles: Record<string, PublicProfile> = {
  [demoProfile.id]: demoProfile,
  [taliaProfile.id]: taliaProfile,
}

export const sensitivities: Sensitivity[] = [{ id: "lactose" }]
export const medicineAllergies: MedicineAllergy[] = [{ id: "penicillin" }]
export const dietaryConditions: DietaryCondition[] = [{ id: "celiac" }]

export const familyOrder: AllergenFamilyId[] = ["tree-nuts", "legumes"]

export function groupSelectedFoods(selectedFoodIds: FoodId[]) {
  return familyOrder
    .map((familyId) => ({
      familyId,
      foods: foods.filter((food) => food.familyId === familyId && selectedFoodIds.includes(food.id)),
    }))
    .filter((group) => group.foods.length > 0)
}

export function getSelectedSensitivities(sensitivityIds: SensitivityId[]) {
  return sensitivities.filter((sensitivity) => sensitivityIds.includes(sensitivity.id))
}

export function getSelectedMedicineAllergies(medicineAllergyIds: MedicineAllergyId[]) {
  return medicineAllergies.filter((medicineAllergy) => medicineAllergyIds.includes(medicineAllergy.id))
}

export function getSelectedDietaryConditions(dietaryConditionIds: DietaryConditionId[]) {
  return dietaryConditions.filter((dietaryCondition) => dietaryConditionIds.includes(dietaryCondition.id))
}

export function getProfileById(profileId: string) {
  return profiles[profileId]
}
