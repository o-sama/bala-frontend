import { useState } from "react"

import { detectLanguage, supportedLanguages, type SupportedLanguage } from "@/features/profile/translations"

function readPreference(key: string): string | null {
  try {
    return window.localStorage.getItem(key)
  } catch (error) {
    console.warn("Bala could not read viewer preferences.", error)
    return null
  }
}

function writePreference(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value)
  } catch (error) {
    console.warn("Bala could not save viewer preferences.", error)
  }
}

export function useViewerLanguage() {
  const [language, setLanguage] = useState<SupportedLanguage>(() => {
    const saved = readPreference("bala.language")
    return supportedLanguages.find((language) => language === saved) ?? detectLanguage()
  })

  function updateLanguage(next: SupportedLanguage) {
    setLanguage(next)
    writePreference("bala.language", next)
  }

  return [language, updateLanguage] as const
}

export function useLargeText() {
  const [enabled, setEnabled] = useState(() => readPreference("bala.largeText") === "true")

  function updateEnabled(next: boolean) {
    setEnabled(next)
    writePreference("bala.largeText", String(next))
  }

  return [enabled, updateEnabled] as const
}
