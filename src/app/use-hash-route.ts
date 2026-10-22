import { useEffect, useState } from "react"

export type AppRoute = "profile" | "staff" | "owner"

const defaultProfileId = "alex-demo"

export function resolveProfileId(hash: string) {
  return hash.match(/^#\/(?:p|owner)\/([^/]+)/)?.[1] ?? defaultProfileId
}

export function buildRouteHash(route: AppRoute, profileId: string) {
  const encodedProfileId = encodeURIComponent(profileId)
  if (route === "staff") return `#/p/${encodedProfileId}/staff`
  if (route === "owner") return `#/owner/${encodedProfileId}`
  return `#/p/${encodedProfileId}`
}

export function resolveRoute(hash: string, ownerSetupEnabled: boolean): AppRoute {
  if (hash.includes("/staff")) return "staff"
  if (hash.includes("/owner") && ownerSetupEnabled) return "owner"
  return "profile"
}

export function useHashRoute(ownerSetupEnabled: boolean) {
  const [route, setRoute] = useState<AppRoute>(() => resolveRoute(window.location.hash, ownerSetupEnabled))
  const [profileId, setProfileId] = useState(() => resolveProfileId(window.location.hash))

  useEffect(() => {
    const normalizeRoute = () => {
      const hash = window.location.hash
      if (!hash || (!ownerSetupEnabled && hash.includes("/owner"))) {
        window.history.replaceState(null, "", buildRouteHash("profile", resolveProfileId(hash)))
      }
      setRoute(resolveRoute(window.location.hash, ownerSetupEnabled))
      setProfileId(resolveProfileId(window.location.hash))
    }

    normalizeRoute()
    window.addEventListener("hashchange", normalizeRoute)
    return () => window.removeEventListener("hashchange", normalizeRoute)
  }, [ownerSetupEnabled])

  const navigate = (nextRoute: AppRoute) => {
    window.location.hash = buildRouteHash(nextRoute, profileId)
  }

  return { route, profileId, navigate }
}
