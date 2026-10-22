import { describe, expect, it } from "vitest"

import { buildRouteHash, resolveProfileId, resolveRoute } from "@/app/use-hash-route"

describe("resolveRoute", () => {
  it("keeps the staff route publicly available", () => {
    expect(resolveRoute("#/p/alex-demo/staff", false)).toBe("staff")
  })

  it("gates owner setup when the feature is disabled", () => {
    expect(resolveRoute("#/owner/alex-demo", false)).toBe("profile")
  })

  it("allows owner setup only when its feature is enabled", () => {
    expect(resolveRoute("#/owner/alex-demo", true)).toBe("owner")
  })
})

describe("profile routes", () => {
  it("reads the profile id from visitor and staff URLs", () => {
    expect(resolveProfileId("#/p/talia")).toBe("talia")
    expect(resolveProfileId("#/p/talia/staff")).toBe("talia")
  })

  it("keeps navigation scoped to the active profile", () => {
    expect(buildRouteHash("staff", "talia")).toBe("#/p/talia/staff")
    expect(buildRouteHash("profile", "talia")).toBe("#/p/talia")
  })
})
