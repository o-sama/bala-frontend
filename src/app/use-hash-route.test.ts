import { describe, expect, it } from "vitest"

import { buildRouteHash, resolveProfileId, resolveProfileSection, resolveRoute } from "@/app/use-hash-route"

describe("resolveRoute", () => {
  it("keeps the staff route publicly available", () => {
    expect(resolveRoute("#/p/alex-demo/staff", false)).toBe("staff")
    expect(resolveRoute("#/p/staff", false)).toBe("profile")
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
    expect(buildRouteHash("staff", "talia")).toBe("#/p/talia/staff/food")
    expect(buildRouteHash("staff", "alex-demo", "medicine")).toBe("#/p/alex-demo/staff/medicine")
    expect(buildRouteHash("profile", "talia")).toBe("#/p/talia")
    expect(buildRouteHash("profile", "alex-demo", "medicine")).toBe("#/p/alex-demo/medicine")
  })

  it("restores the selected profile section from visitor and staff URLs", () => {
    expect(resolveProfileSection("#/p/alex-demo/medicine")).toBe("medicine")
    expect(resolveProfileSection("#/p/alex-demo/staff/medicine")).toBe("medicine")
    expect(resolveProfileSection("#/p/alex-demo/staff")).toBe("food")
    expect(resolveProfileSection("#/p/medicine")).toBe("food")
  })
})
