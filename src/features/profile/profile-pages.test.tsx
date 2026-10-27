import { useState, type ComponentProps } from "react"
import { render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import { demoProfile, taliaProfile } from "@/features/profile/profile-data"
import { PublicProfilePage as BasePublicProfilePage } from "@/features/profile/public-profile-page"
import { StaffViewPage } from "@/features/profile/staff-view-page"

const handlers = {
  onLanguageChange: vi.fn(),
  onShowToStaff: vi.fn(),
  onBack: vi.fn(),
}

type TestPublicProfilePageProps = Omit<
  ComponentProps<typeof BasePublicProfilePage>,
  "activeSection" | "onActiveSectionChange"
>

function PublicProfilePage(props: TestPublicProfilePageProps) {
  const [activeSection, setActiveSection] = useState<"food" | "medicine">("food")
  return (
    <BasePublicProfilePage
      {...props}
      activeSection={activeSection}
      onActiveSectionChange={setActiveSection}
    />
  )
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
    expect(screen.getByText("Penicillin antibiotics")).toBeInTheDocument()
    expect(screen.getByText("Penicillin G, penicillin V")).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "Open emergency care plan" })).toHaveAttribute(
      "href",
      "./alex-demo-emergency-plan.html",
    )
  })

  it("opens staff mode for the currently selected visitor tab", async () => {
    const user = userEvent.setup()
    const onShowToStaff = vi.fn()
    render(
      <PublicProfilePage
        profile={demoProfile}
        language="en"
        onLanguageChange={handlers.onLanguageChange}
        onShowToStaff={onShowToStaff}
      />,
    )

    await user.click(screen.getByRole("tab", { name: "Medicine allergies" }))
    await user.click(screen.getByRole("button", { name: "Show to staff" }))

    expect(onShowToStaff).toHaveBeenCalledWith("medicine")
  })

  it("shows optional profile medicine details in visitor and staff views", async () => {
    const user = userEvent.setup()
    const { unmount } = render(
      <PublicProfilePage profile={demoProfile} language="en" onLanguageChange={handlers.onLanguageChange} onShowToStaff={handlers.onShowToStaff} />,
    )
    await user.click(screen.getByRole("tab", { name: "Medicine allergies" }))
    expect(screen.getByText("Recorded reaction")).toBeInTheDocument()
    expect(screen.getByText("Hives and itching")).toBeInTheDocument()
    unmount()
    render(<StaffViewPage profile={demoProfile} language="en" section="medicine" onLanguageChange={handlers.onLanguageChange} onBack={handlers.onBack} />)
    expect(screen.getByText("Hives and itching")).toBeInTheDocument()
  })

  it("omits optional medicine fields when not configured", () => {
    render(<StaffViewPage profile={{ ...demoProfile, medicineAllergyDetails: undefined }} language="en" section="medicine" onLanguageChange={handlers.onLanguageChange} onBack={handlers.onBack} />)
    expect(screen.queryByText("Recorded reaction")).not.toBeInTheDocument()
    expect(screen.queryByText("Profile notes")).not.toBeInTheDocument()
  })

  it("shows configured emergency information while allowing every PII field to be omitted", () => {
    const profileWithoutEmergencyPii = {
      ...demoProfile,
      emergencyInfo: { carriesEpinephrine: true, epinephrineLocation: "Medical bag" },
    }

    render(
      <PublicProfilePage
        profile={profileWithoutEmergencyPii}
        language="en"
        onLanguageChange={handlers.onLanguageChange}
        onShowToStaff={handlers.onShowToStaff}
      />,
    )

    expect(screen.getByRole("heading", { name: "Emergency information" })).toBeInTheDocument()
    expect(screen.getByText("Location: Medical bag")).toBeInTheDocument()
    expect(screen.queryByText("Emergency contact")).not.toBeInTheDocument()
    expect(screen.queryByRole("link", { name: "Open emergency care plan" })).not.toBeInTheDocument()
  })

  it("hides emergency information when it is not configured", () => {
    render(
      <PublicProfilePage
        profile={taliaProfile}
        language="en"
        onLanguageChange={handlers.onLanguageChange}
        onShowToStaff={handlers.onShowToStaff}
      />,
    )

    expect(screen.queryByRole("heading", { name: "Emergency information" })).not.toBeInTheDocument()
  })

  it("lets a visitor enable large text", async () => {
    const user = userEvent.setup()
    render(
      <PublicProfilePage
        profile={demoProfile}
        language="en"
        onLanguageChange={handlers.onLanguageChange}
        onShowToStaff={handlers.onShowToStaff}
      />,
    )

    const largeTextButton = screen.getByRole("button", { name: "Large text" })
    expect(largeTextButton).toHaveAttribute("aria-pressed", "false")
    await user.click(largeTextButton)
    expect(largeTextButton).toHaveAttribute("aria-pressed", "true")
    expect(screen.getByRole("main")).toHaveClass("large-text-mode")
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

    expect(screen.getByText("Last updated: Oct 26, 2026")).toBeInTheDocument()
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

    const strictFoodNeeds = screen.getByRole("group", { name: "Food allergies" })
    expect(within(strictFoodNeeds).getByRole("heading", { name: "Celiac disease" })).toBeInTheDocument()
    expect(screen.getByText("Strictly gluten-free")).toBeInTheDocument()
    expect(
      screen.getByText("Serious autoimmune condition. Even small amounts of gluten or cross-contact can make food unsafe."),
    ).toBeInTheDocument()
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

  it("shows only food-related information and the preparation checklist in food staff mode", () => {
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
    expect(screen.queryByRole("heading", { name: "Medicine allergy — do not administer" })).not.toBeInTheDocument()
    expect(screen.getByRole("heading", { name: "Sensitivities — avoid if possible" })).toBeInTheDocument()
    expect(screen.getByText("Avoid ingredients and cross-contact")).toBeInTheDocument()
    expect(screen.getByRole("heading", { name: "Safe preparation checklist" })).toBeInTheDocument()
  })

  it("shows only medicine information in medicine staff mode", () => {
    render(
      <StaffViewPage
        profile={demoProfile}
        language="en"
        section="medicine"
        onLanguageChange={handlers.onLanguageChange}
        onBack={handlers.onBack}
      />,
    )

    expect(screen.getByText("Please show medical personnel")).toBeInTheDocument()
    expect(screen.getByRole("heading", { name: "Medicine allergy — do not administer" })).toBeInTheDocument()
    expect(screen.queryByRole("heading", { name: "Allergies — strict avoidance" })).not.toBeInTheDocument()
    expect(screen.queryByRole("heading", { name: "Celiac disease — strict gluten-free" })).not.toBeInTheDocument()
    expect(screen.queryByRole("heading", { name: "Safe preparation checklist" })).not.toBeInTheDocument()
    expect(screen.getByText("Do not administer the listed medicine. Confirm a safe alternative with qualified medical personnel.")).toBeInTheDocument()
    expect(screen.queryByText("Tell me if my meal cannot be prepared to meet these needs.")).not.toBeInTheDocument()
  })

  it("gives staff an interactive preparation checklist", async () => {
    const user = userEvent.setup()
    render(
      <StaffViewPage
        profile={demoProfile}
        language="en"
        onLanguageChange={handlers.onLanguageChange}
        onBack={handlers.onBack}
      />,
    )

    const ingredientCheck = screen.getByRole("checkbox", {
      name: "Check every ingredient and label for the listed allergens.",
    })
    expect(ingredientCheck).not.toBeChecked()
    await user.click(ingredientCheck)
    expect(ingredientCheck).toBeChecked()
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
