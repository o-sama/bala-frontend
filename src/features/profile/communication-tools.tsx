import { useEffect, useRef, useState } from "react"
import { AudioLines, Square, Type } from "lucide-react"

import { Button } from "@/components/ui/button"
import { interactionCopy } from "@/features/profile/interaction-copy"
import { getVoicesWhenReady, selectBestVoice, speechRates } from "@/features/profile/speech-synthesis"
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
  const matchingVoices = voices.filter((voice) => voice.lang.replaceAll("_", "-").split("-")[0].toLowerCase() === language)

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
    <section className="space-y-3 rounded-2xl border border-border bg-muted/40 p-3" aria-label={copy.communicationTools}>
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
      </div>
      {matchingVoices.length > 1 && (
        <details className="min-w-0 text-sm">
          <summary className="min-h-6 cursor-pointer font-semibold">{controls.voice}</summary>
          <label className="mt-2 grid min-w-0 gap-1 font-semibold">
            <span className="sr-only">{controls.voice}</span>
          <select className="min-h-11 w-full min-w-0 rounded-lg border border-border bg-background px-2" value={voiceUri} onChange={(event) => {
            stopSpeech()
            setVoiceUri(event.target.value)
            setError("")
          }}>
            <option value="">{controls.automaticVoice}</option>
            {matchingVoices.map((voice) => <option key={voice.voiceURI} value={voice.voiceURI}>{voice.name} ({voice.lang})</option>)}
          </select>
          </label>
        </details>
      )}
      {!canSpeak && <p role="status" className="text-sm text-alert">{controls.noVoice}</p>}
      {error && <p role="alert" className="text-sm font-semibold text-alert">{error}</p>}
    </section>
  )
}
