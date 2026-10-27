import { act, fireEvent, render, screen, waitFor } from "@testing-library/react"
import { afterEach, describe, expect, it, vi } from "vitest"

import { CommunicationTools } from "@/features/profile/communication-tools"

const englishVoice = { name: "English", lang: "en-CA", voiceURI: "en", default: true } as SpeechSynthesisVoice
const arabicVoice = { name: "Arabic", lang: "ar-SA", voiceURI: "ar", default: false } as SpeechSynthesisVoice

function mockSpeech(voices = [englishVoice, arabicVoice]) {
  const synthesis = Object.assign(new EventTarget(), {
    cancel: vi.fn(), speak: vi.fn(), getVoices: () => voices,
  })
  vi.stubGlobal("speechSynthesis", synthesis)
  vi.stubGlobal("SpeechSynthesisUtterance", class { constructor(public text: string) {} })
  return synthesis
}

afterEach(() => vi.unstubAllGlobals())
const props = { language: "en" as const, speechText: "Food instructions.", isLargeText: false, onLargeTextChange: vi.fn() }

describe("communication playback", () => {
  it("uses a voice in the requested language", async () => {
    const synthesis = mockSpeech()
    render(<CommunicationTools {...props} language="ar" />)
    fireEvent.click(screen.getByRole("button", { name: "قراءة بصوت عالٍ" }))
    await waitFor(() => expect(synthesis.speak).toHaveBeenCalled())
    expect(synthesis.speak.mock.calls[0][0]).toMatchObject({ lang: "ar-SA", voice: arabicVoice })
  })

  it("cancels old narration when content changes", async () => {
    const synthesis = mockSpeech()
    const { rerender } = render(<CommunicationTools {...props} />)
    fireEvent.click(screen.getByRole("button", { name: "Read aloud" }))
    await waitFor(() => expect(synthesis.speak).toHaveBeenCalledTimes(1))
    synthesis.cancel.mockClear()
    rerender(<CommunicationTools {...props} speechText="Medicine instructions." />)
    expect(synthesis.cancel).toHaveBeenCalledTimes(1)
  })

  it("shows an actionable error rather than selecting the wrong language", async () => {
    const synthesis = mockSpeech([englishVoice])
    render(<CommunicationTools {...props} language="ar" />)
    fireEvent.click(screen.getByRole("button", { name: "قراءة بصوت عالٍ" }))
    expect(await screen.findByRole("alert")).toHaveTextContent("لا يوجد صوت متاح لهذه اللغة")
    expect(synthesis.speak).not.toHaveBeenCalled()
  })

  it("reports playback failure and allows another attempt", async () => {
    const synthesis = mockSpeech()
    render(<CommunicationTools {...props} />)
    fireEvent.click(screen.getByRole("button", { name: "Read aloud" }))
    await waitFor(() => expect(synthesis.speak).toHaveBeenCalled())
    const utterance = synthesis.speak.mock.calls[0][0]
    act(() => utterance.onerror({ error: "synthesis-failed" }))
    expect(screen.getByRole("alert")).toHaveTextContent("Reading could not start")
    fireEvent.click(screen.getByRole("button", { name: "Read aloud" }))
    await waitFor(() => expect(synthesis.speak).toHaveBeenCalledTimes(2))
  })
})
