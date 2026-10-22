import type { SupportedLanguage } from "@/features/profile/translations"
import { LanguageSelect } from "@/features/profile/language-select"

interface AppHeaderProps {
  language?: SupportedLanguage
  onLanguageChange?: (language: SupportedLanguage) => void
  trailingText?: string
  homeHref?: string
}

export function AppHeader({ language, onLanguageChange, trailingText, homeHref = "#/p/alex-demo" }: AppHeaderProps) {
  return (
    <header className="flex items-center justify-between gap-4">
      <a href={homeHref} className="text-[1.7rem] font-bold tracking-tight text-primary" aria-label="Bala home">
        Bala <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">app</span>
      </a>
      {language && onLanguageChange ? (
        <LanguageSelect value={language} onChange={onLanguageChange} />
      ) : (
        <span className="text-sm text-muted-foreground">{trailingText}</span>
      )}
    </header>
  )
}
