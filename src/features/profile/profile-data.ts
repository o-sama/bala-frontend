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
export type AllergenFamilyId = "tree-nuts" | "legumes"
export type SensitivityId = "lactose"
export type MedicineAllergyId = "penicillin"

export interface Food {
  id: FoodId
  familyId: AllergenFamilyId
}

export interface PublicProfile {
  id: string
  firstName: string
  fullName: string
  updatedAt: string
  selectedFoodIds: FoodId[]
  sensitivityIds: SensitivityId[]
  medicineAllergyIds: MedicineAllergyId[]
}

export interface Sensitivity {
  id: SensitivityId
}

export interface MedicineAllergy {
  id: MedicineAllergyId
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
]

export const demoProfile: PublicProfile = {
  id: "alex-demo",
  firstName: "Alex",
  fullName: "Alex Morgan",
  updatedAt: "2026-10-22",
  selectedFoodIds: ["walnut", "cashew", "peanut"],
  sensitivityIds: ["lactose"],
  medicineAllergyIds: ["penicillin"],
}

export const taliaProfile: PublicProfile = {
  id: "talia",
  firstName: "Talia",
  fullName: "Talia",
  updatedAt: "2026-10-22",
  selectedFoodIds: ["walnut", "almond", "pecan", "brazil-nut", "macadamia-nut"],
  sensitivityIds: [],
  medicineAllergyIds: [],
}

const profiles: Record<string, PublicProfile> = {
  [demoProfile.id]: demoProfile,
  [taliaProfile.id]: taliaProfile,
}

export const sensitivities: Sensitivity[] = [{ id: "lactose" }]
export const medicineAllergies: MedicineAllergy[] = [{ id: "penicillin" }]

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

export function getProfileById(profileId: string) {
  return profiles[profileId]
}
