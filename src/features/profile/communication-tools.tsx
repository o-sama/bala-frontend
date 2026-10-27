import { useEffect, useRef, useState } from "react"
import { AudioLines, Square, Type } from "lucide-react"

import { Button } from "@/components/ui/button"
import { getVoicesWhenReady, selectBestVoice, speechRates } from "@/features/profile/speech-synthesis"
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
  const speechRequestId = useRef(0)
  const canSpeak =
    typeof window !== "undefined" &&
    "speechSynthesis" in window &&
    "SpeechSynthesisUtterance" in window

  useEffect(() => () => {
    speechRequestId.current += 1
    window.speechSynthesis?.cancel()
  }, [])

  async function toggleSpeech() {
    if (!canSpeak) return
    if (isSpeaking) {
      speechRequestId.current += 1
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
      return
    }

    const requestId = speechRequestId.current + 1
    speechRequestId.current = requestId
    setIsSpeaking(true)
    window.speechSynthesis.cancel()

    const voices = await getVoicesWhenReady(window.speechSynthesis)
    if (speechRequestId.current !== requestId) return

    const utterance = new SpeechSynthesisUtterance(speechText)
    const selectedVoice = selectBestVoice(voices, copy.locale)
    if (selectedVoice) utterance.voice = selectedVoice
    utterance.lang = selectedVoice?.lang ?? copy.locale
    utterance.rate = speechRates[language]
    utterance.pitch = 1
    utterance.volume = 1
    utterance.onend = () => {
      if (speechRequestId.current === requestId) setIsSpeaking(false)
    }
    utterance.onerror = () => {
      if (speechRequestId.current === requestId) setIsSpeaking(false)
    }
    window.speechSynthesis.speak(utterance)
  }

  return (
    <section className="flex items-center justify-end gap-2" aria-label={copy.communicationTools}>
      <Button
        variant="outline"
        className="h-10 px-3 text-xs"
        onClick={toggleSpeech}
        disabled={!canSpeak}
        aria-pressed={isSpeaking}
      >
        {isSpeaking ? <Square className="size-3.5" /> : <AudioLines className="size-4" />}
        {isSpeaking ? copy.stopReading : copy.readAloud}
      </Button>
      <Button
        variant="outline"
        className="h-10 px-3 text-xs"
        onClick={() => onLargeTextChange(!isLargeText)}
        aria-pressed={isLargeText}
      >
        <Type className="size-4" />
        {copy.largeText}
      </Button>
    </section>
  )
}
