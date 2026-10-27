import { useEffect, useRef, useState } from "react"
import { AudioLines, SlidersHorizontal, Square, Type } from "lucide-react"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { interactionCopy } from "@/features/profile/interaction-copy"
import { getRecommendedVoices, getVoicesWhenReady, selectBestVoice, speechRates } from "@/features/profile/speech-synthesis"
import { translations, type SupportedLanguage } from "@/features/profile/translations"

interface CommunicationToolsProps {
  language: SupportedLanguage
  speechText: string
  isLargeText: boolean
  onLargeTextChange: (enabled: boolean) => void
}

export function CommunicationTools({ language, speechText, isLargeText, onLargeTextChange }: CommunicationToolsProps) {
  const copy = translations[language]
  const controls = interactionCopy[language]
  const [speakingText, setSpeakingText] = useState<string | null>(null)
  const isSpeaking = speakingText === speechText
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const [voiceUri, setVoiceUri] = useState("")
  const [error, setError] = useState("")
  const speechRequestId = useRef(0)
  const canSpeak = typeof window !== "undefined" && "speechSynthesis" in window && "SpeechSynthesisUtterance" in window
  const matchingVoices = getRecommendedVoices(voices, copy.locale)

  useEffect(() => {
    if (!canSpeak) return
    const synthesis = window.speechSynthesis
    const updateVoices = () => setVoices(synthesis.getVoices())
    updateVoices()
    synthesis.addEventListener("voiceschanged", updateVoices)
    return () => synthesis.removeEventListener("voiceschanged", updateVoices)
  }, [canSpeak])

  // Invalidate callbacks and stop old content before a profile, tab, or language changes.
  useEffect(() => {
    return () => {
      speechRequestId.current += 1
      window.speechSynthesis?.cancel()
    }
  }, [speechText])

  function stopSpeech() {
    speechRequestId.current += 1
    window.speechSynthesis.cancel()
    setSpeakingText(null)
  }

  async function startSpeech() {
    const requestId = ++speechRequestId.current
    setError("")
    setSpeakingText(speechText)
    try {
      window.speechSynthesis.cancel()
      const availableVoices = await getVoicesWhenReady(window.speechSynthesis)
      if (speechRequestId.current !== requestId) return
      const selectedVoice = availableVoices.find((voice) => voice.voiceURI === voiceUri && matchingVoices.some((match) => match.voiceURI === voice.voiceURI))
        ?? selectBestVoice(availableVoices, copy.locale)
      if (!selectedVoice) {
        setError(controls.noVoice)
        setSpeakingText(null)
        return
      }
      const utterance = new SpeechSynthesisUtterance(speechText)
      utterance.voice = selectedVoice
      utterance.lang = selectedVoice.lang
      utterance.rate = speechRates[language]
      utterance.onend = () => {
        if (speechRequestId.current === requestId) setSpeakingText(null)
      }
      utterance.onerror = () => {
        if (speechRequestId.current !== requestId) return
        setSpeakingText(null)
        setError(controls.speechError)
      }
      window.speechSynthesis.speak(utterance)
    } catch (error) {
      if (speechRequestId.current !== requestId) return
      console.warn("Bala speech playback failed.", error)
      setSpeakingText(null)
      setError(controls.speechError)
    }
  }

  return (
    <section className="space-y-2" aria-label={copy.communicationTools}>
      <div className="communication-toolbar">
        <Button variant="outline" className="text-sm" onClick={() => {
          if (!canSpeak) return
          if (isSpeaking) stopSpeech()
          else void startSpeech()
        }} disabled={!canSpeak} aria-pressed={isSpeaking}>
          {isSpeaking ? <Square className="size-4" /> : <AudioLines className="size-4" />}
          {isSpeaking ? copy.stopReading : copy.readAloud}
        </Button>
        <Button variant="outline" className="text-sm" onClick={() => onLargeTextChange(!isLargeText)} aria-pressed={isLargeText}>
          <Type className="size-4" />{copy.largeText}
        </Button>
        {matchingVoices.length > 1 && (
          <Select dir={copy.direction} value={voiceUri || "automatic"} onValueChange={(value) => {
            stopSpeech()
            setVoiceUri(value === "automatic" ? "" : value)
            setError("")
          }}>
            <SelectTrigger aria-label={controls.voice} className="h-11 max-w-full rounded-xl sm:max-w-64">
              <SlidersHorizontal className="size-4 shrink-0" />
              <span className="min-w-0 truncate"><SelectValue /></span>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="automatic">{controls.automaticVoice}</SelectItem>
              {matchingVoices.map((voice) => <SelectItem key={voice.voiceURI} value={voice.voiceURI}>{voice.name} ({voice.lang})</SelectItem>)}
            </SelectContent>
          </Select>
        )}
      </div>
      {!canSpeak && <p role="status" className="text-sm text-alert">{controls.noVoice}</p>}
      {error && <p role="alert" className="text-sm font-semibold text-alert">{error}</p>}
    </section>
  )
}
