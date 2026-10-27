import { act, renderHook } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

import { useLargeText, useViewerLanguage } from "@/app/viewer-preferences"

describe("viewer preferences", () => {
  it("remembers language across remounts and ignores invalid saved values", () => {
    window.localStorage.setItem("bala.language", "unsupported")
    const { result, unmount } = renderHook(useViewerLanguage)
    act(() => result.current[1]("ar"))
    unmount()
    expect(renderHook(useViewerLanguage).result.current[0]).toBe("ar")
  })

  it("remembers large text when moving between pages", () => {
    const { result, unmount } = renderHook(useLargeText)
    act(() => result.current[1](true))
    unmount()
    expect(renderHook(useLargeText).result.current[0]).toBe(true)
  })

  it("still updates preferences when browser storage is blocked", () => {
    const storage = vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => { throw new Error("Storage blocked") })
    const warning = vi.spyOn(console, "warn").mockImplementation(() => {})
    try {
      const { result } = renderHook(useLargeText)
      act(() => result.current[1](true))
      expect(result.current[0]).toBe(true)
      expect(warning).toHaveBeenCalled()
    } finally {
      storage.mockRestore()
      warning.mockRestore()
    }
  })
})
