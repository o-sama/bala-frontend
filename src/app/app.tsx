import { useEffect, useState } from "react"

import { featureFlags } from "@/app/feature-flags"
import { OwnerProfilePage } from "@/features/profile/owner-profile-page"
import { demoProfile, getProfileById, type FoodId } from "@/features/profile/profile-data"
import { PublicProfilePage } from "@/features/profile/public-profile-page"
import { StaffViewPage } from "@/features/profile/staff-view-page"
import { detectLanguage, type SupportedLanguage } from "@/features/profile/translations"
import { useHashRoute } from "@/app/use-hash-route"

export function App() {
  const { route, profileId, navigate } = useHashRoute(featureFlags.ownerSetup)
  const [language, setLanguage] = useState<SupportedLanguage>(detectLanguage)
  const baseProfile = getProfileById(profileId) ?? demoProfile
  const [profileSelections, setProfileSelections] = useState<Record<string, FoodId[]>>({})
  const selectedFoodIds = profileSelections[baseProfile.id] ?? baseProfile.selectedFoodIds
  const profile = { ...baseProfile, selectedFoodIds }

  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  return (
    <div className="min-h-svh bg-canvas px-3 py-5 sm:px-6 sm:py-8">
      {route === "profile" && (
        <PublicProfilePage
          profile={profile}
          language={language}
          onLanguageChange={setLanguage}
          onShowToStaff={() => navigate("staff")}
        />
      )}
      {route === "staff" && (
        <StaffViewPage
          profile={profile}
          language={language}
          onLanguageChange={setLanguage}
          onBack={() => navigate("profile")}
        />
      )}
      {featureFlags.ownerSetup && route === "owner" && (
        <OwnerProfilePage
          selectedFoodIds={selectedFoodIds}
          onSelectedFoodIdsChange={(foodIds) => {
            setProfileSelections((current) => ({ ...current, [baseProfile.id]: foodIds }))
          }}
          onPreview={() => navigate("profile")}
        />
      )}
    </div>
  )
}
