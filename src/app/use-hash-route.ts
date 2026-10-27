import { useEffect, useState } from "react"

export type AppRoute = "profile" | "staff" | "owner"
export type ProfileSection = "food" | "medicine"

const defaultProfileId = "alex-demo"

export function resolveProfileId(hash: string) {
  return hash.match(/^#\/(?:p|owner)\/([^/]+)/)?.[1] ?? defaultProfileId
}

export function resolveProfileSection(hash: string): ProfileSection {
  const segments = hash.replace(/^#\//, "").split("/")
  const section = segments[2] === "staff" ? segments[3] : segments[2]
  return section === "medicine" ? "medicine" : "food"
}

export function buildRouteHash(route: AppRoute, profileId: string, section: ProfileSection = "food") {
  const encodedProfileId = encodeURIComponent(profileId)
  if (route === "staff") return `#/p/${encodedProfileId}/staff/${section}`
  if (route === "owner") return `#/owner/${encodedProfileId}`
  if (section === "medicine") return `#/p/${encodedProfileId}/medicine`
  return `#/p/${encodedProfileId}`
}

export function resolveRoute(hash: string, ownerSetupEnabled: boolean): AppRoute {
  if (/^#\/p\/[^/]+\/staff(?:\/|$)/.test(hash)) return "staff"
  if (/^#\/owner\//.test(hash) && ownerSetupEnabled) return "owner"
  return "profile"
}

export function useHashRoute(ownerSetupEnabled: boolean) {
  const [route, setRoute] = useState<AppRoute>(() => resolveRoute(window.location.hash, ownerSetupEnabled))
  const [profileId, setProfileId] = useState(() => resolveProfileId(window.location.hash))
  const [profileSection, setProfileSection] = useState<ProfileSection>(() => resolveProfileSection(window.location.hash))

  useEffect(() => {
    const normalizeRoute = () => {
      const hash = window.location.hash
      if (!hash || (!ownerSetupEnabled && /^#\/owner\//.test(hash))) {
        window.history.replaceState(null, "", buildRouteHash("profile", resolveProfileId(hash)))
      }
      setRoute(resolveRoute(window.location.hash, ownerSetupEnabled))
      setProfileId(resolveProfileId(window.location.hash))
      setProfileSection(resolveProfileSection(window.location.hash))
    }

    normalizeRoute()
    window.addEventListener("hashchange", normalizeRoute)
    return () => window.removeEventListener("hashchange", normalizeRoute)
  }, [ownerSetupEnabled])

  const navigate = (nextRoute: AppRoute, section: ProfileSection = "food") => {
    window.location.hash = buildRouteHash(nextRoute, profileId, section)
  }

  return { route, profileId, profileSection, navigate }
}
