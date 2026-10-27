import { describe, expect, it } from "vitest"

import { demoProfile } from "@/features/profile/profile-data"
import { getProfileSpeechText } from "@/features/profile/profile-speech-text"

describe("getProfileSpeechText", () => {
  it("uses pronunciation-focused Arabic without inserting English location text", () => {
    const speechText = getProfileSpeechText(demoProfile, "ar", "food")

    expect(speechText).toContain("لَدَيَّ حَسَاسِيَّةٌ شَدِيدَةٌ")
    expect(speechText).toContain("الجَيْبُ الأَمَامِيُّ لِحَقِيبَةِ الظَّهْر")
    expect(speechText).not.toContain("البِنْسِلِين")
    expect(speechText).not.toContain("Front pocket of backpack")
  })

  it("uses the Arabic medicine pronunciation in medicine mode", () => {
    const speechText = getProfileSpeechText(demoProfile, "ar", "medicine")

    expect(speechText).toContain("البِنْسِلِين")
    expect(speechText).toContain("لَا تُعْطِنِي هَذَا الدَّوَاء")
  })
})
