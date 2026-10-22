import { Globe2 } from "lucide-react"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { translations, type SupportedLanguage } from "@/features/profile/translations"

interface LanguageSelectProps {
  value: SupportedLanguage
  onChange: (language: SupportedLanguage) => void
}

export function LanguageSelect({ value, onChange }: LanguageSelectProps) {
  return (
    <Select value={value} onValueChange={(next) => onChange(next as SupportedLanguage)}>
      <SelectTrigger aria-label="Language">
        <Globe2 className="size-4" />
        <SelectValue />
      </SelectTrigger>
      <SelectContent align="end">
        <SelectItem value="en">{translations.en.languageName}</SelectItem>
        <SelectItem value="fr">{translations.fr.languageName}</SelectItem>
      </SelectContent>
    </Select>
  )
}
