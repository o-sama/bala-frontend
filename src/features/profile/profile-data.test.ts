import { describe, expect, it } from "vitest"

import {
  getProfileById,
  getSelectedMedicineAllergies,
  getSelectedSensitivities,
  groupSelectedFoods,
} from "@/features/profile/profile-data"
import { detectLanguage } from "@/features/profile/translations"

describe("groupSelectedFoods", () => {
  it("keeps exact foods separated into their allergen families", () => {
    const groups = groupSelectedFoods(["walnut", "peanut"])

    expect(groups).toEqual([
      { familyId: "tree-nuts", foods: [{ id: "walnut", familyId: "tree-nuts" }] },
      { familyId: "legumes", foods: [{ id: "peanut", familyId: "legumes" }] },
    ])
  })

  it("does not create empty public sections", () => {
    expect(groupSelectedFoods(["cashew"])).toHaveLength(1)
  })
})

describe("detectLanguage", () => {
  it("uses French when any preferred browser language is French", () => {
    expect(detectLanguage(["en-CA", "fr-CA"])).toBe("fr")
  })

  it.each([
    ["es-MX", "es"],
    ["ar-SA", "ar"],
    ["tr-TR", "tr"],
  ] as const)("maps %s to %s", (browserLanguage, expectedLanguage) => {
    expect(detectLanguage([browserLanguage])).toBe(expectedLanguage)
  })

  it("uses the first supported non-English language", () => {
    expect(detectLanguage(["ar-SA", "tr-TR"])).toBe("ar")
  })

  it("falls back to English for unsupported languages", () => {
    expect(detectLanguage(["de-DE"])).toBe("en")
  })
})

describe("getSelectedSensitivities", () => {
  it("returns only the sensitivities configured on the profile", () => {
    expect(getSelectedSensitivities(["lactose"])).toEqual([{ id: "lactose" }])
  })

  it("returns an empty list when the profile has no sensitivities", () => {
    expect(getSelectedSensitivities([])).toEqual([])
  })
})

describe("getSelectedMedicineAllergies", () => {
  it("returns only configured medicine allergies", () => {
    expect(getSelectedMedicineAllergies(["penicillin"])).toEqual([{ id: "penicillin" }])
  })

  it("returns an empty list when no medicine allergies are configured", () => {
    expect(getSelectedMedicineAllergies([])).toEqual([])
  })
})

describe("getProfileById", () => {
  it("returns Talia's exact tree nut allergies without adding sensitivities", () => {
    expect(getProfileById("talia")).toMatchObject({
      firstName: "Talia",
      fullName: "Talia",
      selectedFoodIds: ["walnut", "almond", "pecan", "brazil-nut", "macadamia-nut"],
      sensitivityIds: [],
      medicineAllergyIds: [],
    })
  })

  it("keeps at least one example from every supported category on Alex's demo", () => {
    expect(getProfileById("alex-demo")).toMatchObject({
      selectedFoodIds: expect.arrayContaining(["walnut", "peanut"]),
      sensitivityIds: ["lactose"],
      medicineAllergyIds: ["penicillin"],
    })
  })
})
