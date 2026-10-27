import { useEffect, useState } from "react"
import { AudioLines, Square, Type } from "lucide-react"

import { Button } from "@/components/ui/button"
import { translations, type SupportedLanguage } from "@/features/profile/translations"

interface CommunicationToolsProps {
  language: SupportedLanguage
  speechText: string
  isLargeText: boolean
  onLargeTextChange: (enabled: boolean) => void
}

export function CommunicationTools({
  language,
  speechText,
  isLargeText,
  onLargeTextChange,
}: CommunicationToolsProps) {
  const copy = translations[language]
  const [isSpeaking, setIsSpeaking] = useState(false)
  const canSpeak =
    typeof window !== "undefined" &&
    "speechSynthesis" in window &&
    "SpeechSynthesisUtterance" in window

  useEffect(() => () => window.speechSynthesis?.cancel(), [])

  function toggleSpeech() {
    if (!canSpeak) return
    if (isSpeaking) {
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
      return
    }

    const utterance = new SpeechSynthesisUtterance(speechText)
    utterance.lang = copy.locale
    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = () => setIsSpeaking(false)
    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(utterance)
    setIsSpeaking(true)
  }

  return (
    <section className="grid grid-cols-2 gap-2" aria-label={copy.communicationTools}>
      <Button
        variant="outline"
        className="h-12"
        onClick={toggleSpeech}
        disabled={!canSpeak}
        aria-pressed={isSpeaking}
      >
        {isSpeaking ? <Square className="size-4" /> : <AudioLines className="size-5" />}
        {isSpeaking ? copy.stopReading : copy.readAloud}
      </Button>
      <Button
        variant="outline"
        className="h-12"
        onClick={() => onLargeTextChange(!isLargeText)}
        aria-pressed={isLargeText}
      >
        <Type className="size-5" />
        {copy.largeText}
      </Button>
    </section>
  )
}
