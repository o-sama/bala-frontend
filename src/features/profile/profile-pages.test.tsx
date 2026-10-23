import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
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
  it("shows Talia's exact allergy list without unconfigured sections", () => {
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
    expect(screen.queryByRole("tab", { name: "Medicine allergies" })).not.toBeInTheDocument()
  })

  it("shows Alex's medicine allergies in a separate tab", async () => {
    const user = userEvent.setup()
    render(
      <PublicProfilePage
        profile={demoProfile}
        language="en"
        onLanguageChange={handlers.onLanguageChange}
        onShowToStaff={handlers.onShowToStaff}
      />,
    )

    expect(screen.getByRole("tab", { name: "Food allergies" })).toHaveAttribute("aria-selected", "true")
    expect(screen.getByRole("tab", { name: "Medicine allergies" })).toHaveAttribute("aria-selected", "false")
    expect(screen.getByText("Legume allergies")).toBeInTheDocument()
    expect(screen.getByText("Soy")).toBeInTheDocument()
    expect(screen.queryByText("Penicillin")).not.toBeInTheDocument()

    await user.click(screen.getByRole("tab", { name: "Medicine allergies" }))

    expect(screen.getByRole("tab", { name: "Medicine allergies" })).toHaveAttribute("aria-selected", "true")
    expect(screen.getByText("Penicillin")).toBeInTheDocument()
    expect(screen.getByText("These medicine allergies are separate from food allergies.")).toBeInTheDocument()
  })

  it("keeps profile metadata at the top and emphasizes the unlisted-food notice", () => {
    render(
      <PublicProfilePage
        profile={demoProfile}
        language="en"
        onLanguageChange={handlers.onLanguageChange}
        onShowToStaff={handlers.onShowToStaff}
      />,
    )

    expect(screen.getByText("Last updated: Oct 22, 2026")).toBeInTheDocument()
    expect(screen.queryByText(/Share with your kitchen/)).not.toBeInTheDocument()
    expect(screen.queryByRole("contentinfo")).not.toBeInTheDocument()
    expect(screen.getByRole("note")).toHaveTextContent("Foods not listed here have not been marked as safe.")
  })

  it("shows Alex's celiac disease as a strict condition rather than a sensitivity", () => {
    render(
      <PublicProfilePage
        profile={demoProfile}
        language="en"
        onLanguageChange={handlers.onLanguageChange}
        onShowToStaff={handlers.onShowToStaff}
      />,
    )

    expect(screen.getByRole("heading", { name: "Celiac disease" })).toBeInTheDocument()
    expect(screen.getByText("Strictly gluten-free")).toBeInTheDocument()
    expect(screen.getByText("Avoid wheat, barley, rye, and cross-contact with gluten.")).toBeInTheDocument()
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

  it("gives staff separate food, medicine, and sensitivity areas", () => {
    render(
      <StaffViewPage
        profile={demoProfile}
        language="en"
        onLanguageChange={handlers.onLanguageChange}
        onBack={handlers.onBack}
      />,
    )

    expect(screen.getByRole("heading", { name: "Allergies — strict avoidance" })).toBeInTheDocument()
    expect(screen.getByRole("heading", { name: "Celiac disease — strict gluten-free" })).toBeInTheDocument()
    expect(screen.getByRole("heading", { name: "Medicine allergy — do not administer" })).toBeInTheDocument()
    expect(screen.getByRole("heading", { name: "Sensitivities — avoid if possible" })).toBeInTheDocument()
    expect(screen.getByText("Avoid ingredients and cross-contact")).toBeInTheDocument()
  })

  it("renders Arabic staff copy with right-to-left direction", () => {
    render(
      <StaffViewPage
        profile={taliaProfile}
        language="ar"
        onLanguageChange={handlers.onLanguageChange}
        onBack={handlers.onBack}
      />,
    )

    expect(screen.getByRole("main")).toHaveAttribute("dir", "rtl")
    expect(screen.getByRole("heading", { name: "الحساسية — تجنّب تام" })).toBeInTheDocument()
    expect(screen.getByText("الجوز")).toBeInTheDocument()
  })
})
