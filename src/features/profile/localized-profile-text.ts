import type { LocalizedProfileText } from "@/features/profile/profile-data"
import { supportedLanguages, type SupportedLanguage } from "@/features/profile/translations"

export function localizeProfileText(value: LocalizedProfileText | undefined, language: SupportedLanguage) {
  for (const candidate of [language, "en" as const, ...supportedLanguages]) {
    const text = value?.[candidate]?.trim()
    if (text) return { text, language: candidate }
  }
  return undefined
}
