import { render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

import { demoProfile, taliaProfile } from "@/features/profile/profile-data"
import { PublicProfilePage } from "@/features/profile/public-profile-page"
import { StaffViewPage } from "@/features/profile/staff-view-page"

const handlers = {
  onLanguageChange: vi.fn(),
  onShowToStaff: vi.fn(),
  onBack: vi.fn(),
}

describe("profile priorities", () => {
  it("shows Talia's exact allergy list and no sensitivity section", () => {
    render(
      <PublicProfilePage
        profile={taliaProfile}
        language="en"
        onLanguageChange={handlers.onLanguageChange}
        onShowToStaff={handlers.onShowToStaff}
      />,
    )

    for (const food of ["Walnuts", "Almonds", "Pecans", "Brazil nuts", "Macadamia nuts"]) {
      expect(screen.getByText(food)).toBeInTheDocument()
    }
    expect(screen.getByRole("link", { name: "Bala home" })).toHaveAttribute("href", "#/p/talia")
    expect(screen.queryByRole("heading", { name: "Sensitivities (not allergies)" })).not.toBeInTheDocument()
  })

  it("shows configured sensitivities as a separate, lower-priority request", () => {
    render(
      <PublicProfilePage
        profile={demoProfile}
        language="en"
        onLanguageChange={handlers.onLanguageChange}
        onShowToStaff={handlers.onShowToStaff}
      />,
    )

    expect(screen.getByRole("heading", { name: "Sensitivities (not allergies)" })).toBeInTheDocument()
    expect(screen.getByText("Avoid if possible")).toBeInTheDocument()
    expect(screen.getByText("Lactose")).toBeInTheDocument()
  })

  it("hides the sensitivity section when none are configured", () => {
    render(
      <PublicProfilePage
        profile={{ ...demoProfile, sensitivityIds: [] }}
        language="en"
        onLanguageChange={handlers.onLanguageChange}
        onShowToStaff={handlers.onShowToStaff}
      />,
    )

    expect(screen.queryByRole("heading", { name: "Sensitivities (not allergies)" })).not.toBeInTheDocument()
  })

  it("gives staff an explicit strict-allergy area and a secondary sensitivity area", () => {
    render(
      <StaffViewPage
        profile={demoProfile}
        language="en"
        onLanguageChange={handlers.onLanguageChange}
        onBack={handlers.onBack}
      />,
    )

    expect(screen.getByRole("heading", { name: "Allergies — strict avoidance" })).toBeInTheDocument()
    expect(screen.getByRole("heading", { name: "Sensitivities — avoid if possible" })).toBeInTheDocument()
    expect(screen.getByText("Avoid ingredients and cross-contact")).toBeInTheDocument()
  })
})
