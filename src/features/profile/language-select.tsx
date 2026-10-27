import { Globe2 } from "lucide-react"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { supportedLanguages, translations, type SupportedLanguage } from "@/features/profile/translations"

interface LanguageSelectProps {
  value: SupportedLanguage
  onChange: (language: SupportedLanguage) => void
}

export function LanguageSelect({ value, onChange }: LanguageSelectProps) {
  return (
    <Select dir={translations[value].direction} value={value} onValueChange={(next) => onChange(next as SupportedLanguage)}>
      <SelectTrigger aria-label="Language">
        <Globe2 className="size-4" />
        <SelectValue />
      </SelectTrigger>
      <SelectContent align="end">
        {supportedLanguages.map((language) => (
          <SelectItem key={language} value={language}>{translations[language].languageName}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
