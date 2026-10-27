import { describe, expect, it } from "vitest"

import { selectBestVoice } from "@/features/profile/speech-synthesis"

function createVoice(name: string, lang: string, isDefault = false) {
  return {
    name,
    lang,
    default: isDefault,
    localService: true,
    voiceURI: name,
  } as SpeechSynthesisVoice
}

describe("selectBestVoice", () => {
  it("prefers an exact regional voice over a different regional variant", () => {
    const egyptianVoice = createVoice("Google العربية", "ar-EG", true)
    const saudiVoice = createVoice("Arabic Saudi", "ar-SA")

    expect(selectBestVoice([egyptianVoice, saudiVoice], "ar-SA")).toBe(saudiVoice)
  })

  it("falls back to a quality voice in the same language", () => {
    const genericVoice = createVoice("Arabic", "ar-EG", true)
    const enhancedVoice = createVoice("Google Arabic Natural", "ar-AE")

    expect(selectBestVoice([genericVoice, enhancedVoice], "ar-SA")).toBe(enhancedVoice)
  })

  it("does not select a voice from another language", () => {
    expect(selectBestVoice([createVoice("English", "en-US")], "ar-SA")).toBeUndefined()
  })
})
