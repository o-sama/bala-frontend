import { describe, expect, it } from "vitest"

import { getRecommendedVoices, selectBestVoice } from "@/features/profile/speech-synthesis"

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


describe("recommended reading voices", () => {
  it("excludes novelty and other-language voices and offers at most four choices", () => {
    const voices = [
      createVoice("Boing", "en-CA", true),
      createVoice("Bells", "en-CA"),
      createVoice("Google English Natural", "en-CA"),
      createVoice("Samantha", "en-US"),
      createVoice("Daniel", "en-GB"),
      createVoice("Karen", "en-AU"),
      createVoice("Moira", "en-IE"),
      createVoice("Arabic", "ar-SA"),
    ]
    const choices = getRecommendedVoices(voices, "en-CA")
    expect(choices).toHaveLength(4)
    expect(choices[0].name).toBe("Google English Natural")
    expect(choices.every((voice) => voice.lang.startsWith("en"))).toBe(true)
    expect(choices.map((voice) => voice.name)).not.toContain("Boing")
    expect(selectBestVoice(voices, "en-CA")).toBe(choices[0])
  })

  it("does not fill the shortlist with duplicates or regional variants of one voice", () => {
    const voice = createVoice("Samantha", "en-US")
    expect(getRecommendedVoices([voice, { ...voice, voiceURI: "duplicate" }, createVoice("Samantha (English UK)", "en-GB")], "en-US")).toHaveLength(1)
  })
})
