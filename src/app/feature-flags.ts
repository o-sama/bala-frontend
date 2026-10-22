export const featureFlags = {
  ownerSetup: import.meta.env.VITE_ENABLE_OWNER_SETUP === "true",
} as const
