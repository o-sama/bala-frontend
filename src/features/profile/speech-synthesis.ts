import type { SupportedLanguage } from "@/features/profile/translations"

const voiceQualityTerms = ["natural", "enhanced", "premium", "neural", "google", "samsung"]

function normalizeLocale(locale: string) {
  return locale.replace("_", "-").toLowerCase()
}

function getLanguage(locale: string) {
  return normalizeLocale(locale).split("-")[0]
}

export function selectBestVoice(voices: readonly SpeechSynthesisVoice[], targetLocale: string) {
  const normalizedTarget = normalizeLocale(targetLocale)
  const targetLanguage = getLanguage(targetLocale)

  return [...voices]
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
    .sort((left, right) => right.score - left.score)[0]?.voice
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
