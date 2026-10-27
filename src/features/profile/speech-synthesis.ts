import type { SupportedLanguage } from "@/features/profile/translations"

const voiceQualityTerms = ["natural", "enhanced", "premium", "neural", "google", "samsung"]

function normalizeLocale(locale: string) {
  return locale.replace("_", "-").toLowerCase()
}

function getLanguage(locale: string) {
  return normalizeLocale(locale).split("-")[0]
}

const characterVoiceNames = new Set([
  "albert", "bad news", "bahh", "bells", "boing", "bubbles", "cellos", "fred", "good news",
  "grandma", "grandpa", "jester", "junior", "organ", "ralph", "superstar", "trinoids", "whisper", "wobble", "zarvox",
])
const maxRecommendedVoices = 4

export function getRecommendedVoices(voices: readonly SpeechSynthesisVoice[], targetLocale: string) {
  const normalizedTarget = normalizeLocale(targetLocale)
  const targetLanguage = getLanguage(targetLocale)

  const ranked = [...voices]
    .filter((voice) => !characterVoiceNames.has(voice.name.toLowerCase().split(" (")[0]))
    .map((voice) => {
      const voiceLocale = normalizeLocale(voice.lang)
      const voiceName = voice.name.toLowerCase()
      const localeScore = voiceLocale === normalizedTarget
        ? 100
        : getLanguage(voiceLocale) === targetLanguage
          ? 60
          : 0
      const qualityScore = voiceQualityTerms.some((term) => voiceName.includes(term)) ? 12 : 0
      const defaultScore = voice.default ? 3 : 0
      return { voice, score: localeScore + qualityScore + defaultScore }
    })
    .filter(({ score }) => score >= 60)
    .sort((left, right) => right.score - left.score)
    .map(({ voice }) => voice)

  return ranked.filter((voice, index) => ranked.findIndex((candidate) =>
    candidate.name.toLowerCase().split(" (")[0] === voice.name.toLowerCase().split(" (")[0],
  ) === index).slice(0, maxRecommendedVoices)
}

export function selectBestVoice(voices: readonly SpeechSynthesisVoice[], targetLocale: string) {
  return getRecommendedVoices(voices, targetLocale)[0]
}

export async function getVoicesWhenReady(synthesis: SpeechSynthesis, timeoutMs = 800) {
  const availableVoices = synthesis.getVoices()
  if (availableVoices.length > 0) return availableVoices

  return new Promise<SpeechSynthesisVoice[]>((resolve) => {
    let timeoutId = 0
    const finish = () => {
      window.clearTimeout(timeoutId)
      synthesis.removeEventListener("voiceschanged", finish)
      resolve(synthesis.getVoices())
    }

    synthesis.addEventListener("voiceschanged", finish, { once: true })
    timeoutId = window.setTimeout(finish, timeoutMs)
  })
}

export const speechRates: Record<SupportedLanguage, number> = {
  en: 0.95,
  fr: 0.9,
  es: 0.9,
  ar: 0.86,
  tr: 0.9,
}
