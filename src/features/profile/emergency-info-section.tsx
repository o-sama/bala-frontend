import { ExternalLink, HeartPulse, Phone, Syringe } from "lucide-react"

import type { EmergencyInfo } from "@/features/profile/profile-data"
import { translations, type SupportedLanguage } from "@/features/profile/translations"

interface EmergencyInfoSectionProps {
  emergencyInfo: EmergencyInfo
  language: SupportedLanguage
}

export function EmergencyInfoSection({ emergencyInfo, language }: EmergencyInfoSectionProps) {
  const copy = translations[language]
  const hasContact = Boolean(emergencyInfo.contactName || emergencyInfo.contactPhone)

  return (
    <section className="overflow-hidden rounded-2xl border border-s-4 border-border border-s-alert bg-card shadow-sm" aria-labelledby="emergency-heading">
      <header className="flex items-center gap-3 border-b border-border px-5 py-4 text-alert">
        <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-alert/10">
          <HeartPulse className="size-5" />
        </span>
        <div>
          <h2 id="emergency-heading" className="text-lg font-bold">{copy.emergencyInformation}</h2>
          <p className="text-xs font-semibold">{copy.emergencyServicesInstruction}</p>
        </div>
      </header>
      <div className="grid gap-4 px-5 py-4 text-foreground sm:grid-cols-2">
        {emergencyInfo.carriesEpinephrine && (
          <div className="flex items-start gap-3">
            <Syringe className="mt-0.5 size-5 shrink-0 text-alert" />
            <div>
              <p className="font-bold">{copy.carriesEpinephrine}</p>
              {emergencyInfo.epinephrineLocation && (
                <p className="text-sm text-secondary-foreground">
                  {copy.location}: {emergencyInfo.epinephrineLocation}
                </p>
              )}
            </div>
          </div>
        )}

        {hasContact && (
          <div className="flex items-start gap-3">
            <Phone className="mt-0.5 size-5 shrink-0 text-alert" />
            <div>
              <p className="font-bold">{copy.emergencyContact}</p>
              {emergencyInfo.contactName && <p className="text-sm">{emergencyInfo.contactName}</p>}
              {emergencyInfo.contactPhone && (
                <a className="text-sm font-bold text-primary underline underline-offset-2" href={`tel:${emergencyInfo.contactPhone}`}>
                  {emergencyInfo.contactPhone}
                </a>
              )}
            </div>
          </div>
        )}

        {emergencyInfo.actionPlanUrl && (
          <a
            className="flex items-center gap-2 rounded-xl bg-alert/5 px-4 py-3 text-sm font-bold text-alert sm:col-span-2"
            href={emergencyInfo.actionPlanUrl}
            target="_blank"
            rel="noreferrer"
          >
            <ExternalLink className="size-4" />
            {copy.openEmergencyPlan}
          </a>
        )}
      </div>
    </section>
  )
}
