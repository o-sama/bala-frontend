import { describe, expect, it } from "vitest"

import { demoProfile } from "@/features/profile/profile-data"
import { getProfileSpeechText } from "@/features/profile/profile-speech-text"

describe("getProfileSpeechText", () => {
  it("uses pronunciation-focused Arabic without inserting English location text", () => {
    const speechText = getProfileSpeechText(demoProfile, "ar", "food")

    expect(speechText).toContain("لَدَيَّ حَسَاسِيَّةٌ")
    expect(speechText).toContain("الجَيْبُ الأَمَامِيُّ لِحَقِيبَةِ الظَّهْر")
    expect(speechText).not.toContain("البِنْسِلِين")
    expect(speechText).not.toContain("Front pocket of backpack")
  })

  it("reads strict requirements separately from allergies without inventing severity", () => {
    const text = getProfileSpeechText(demoProfile, "en")
    expect(text).toContain("Avoid wheat, barley, rye, and cross-contact with gluten.")
    expect(text).toContain("Please avoid these ingredients and cross-contact with them.")
    expect(text).toContain("Foods not listed here have not been marked as safe.")
    expect(text).not.toContain("Food allergies: Walnuts, Cashews, Peanuts, Soy, Celiac")
    expect(getProfileSpeechText(demoProfile, "ar")).not.toContain("شَدِيدَةٌ")
  })

  it("reads configured medicine details only in medicine mode", () => {
    const text = getProfileSpeechText(demoProfile, "en", "medicine")
    expect(text).toContain("Recorded reaction: Hives and itching")
    expect(text).toContain("Profile notes: Reaction reported in childhood")
    expect(text).not.toContain("Walnuts")
    expect(getProfileSpeechText(demoProfile, "en")).not.toContain("Hives")
  })

  it("uses the Arabic medicine pronunciation in medicine mode", () => {
    const speechText = getProfileSpeechText(demoProfile, "ar", "medicine")

    expect(speechText).toContain("البِنْسِلِين")
    expect(speechText).toContain("لَا تُعْطِنِي هَذَا الدَّوَاء")
  })
})
