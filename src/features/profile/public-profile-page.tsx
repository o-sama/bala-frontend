import { useState } from "react"
import { ArrowUpRight, Pill, ShieldAlert } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AppHeader } from "@/features/profile/app-header"
import { CommunicationTools } from "@/features/profile/communication-tools"
import { EmergencyInfoSection } from "@/features/profile/emergency-info-section"
import { FoodProfileContent } from "@/features/profile/food-profile-content"
import { MedicineAllergySection } from "@/features/profile/medicine-allergy-section"
import { getSelectedMedicineAllergies, type PublicProfile } from "@/features/profile/profile-data"
import { getProfileSpeechText } from "@/features/profile/profile-speech-text"
import { translations, type SupportedLanguage } from "@/features/profile/translations"

interface PublicProfilePageProps {
  profile: PublicProfile
  language: SupportedLanguage
  onLanguageChange: (language: SupportedLanguage) => void
  onShowToStaff: () => void
}

export function PublicProfilePage({ profile, language, onLanguageChange, onShowToStaff }: PublicProfilePageProps) {
  const [isLargeText, setIsLargeText] = useState(false)
  const copy = translations[language]
  const medicineAllergies = getSelectedMedicineAllergies(profile.medicineAllergyIds)
  const hasMedicineTab = medicineAllergies.length > 0
  const date = new Intl.DateTimeFormat(copy.locale, { dateStyle: "medium" }).format(
    new Date(`${profile.updatedAt}T12:00:00`),
  )

  return (
    <main
      className={`phone-panel space-y-6 ${isLargeText ? "large-text-mode" : ""}`}
      dir={copy.direction}
      aria-label={copy.allergyProfile}
    >
      <AppHeader language={language} onLanguageChange={onLanguageChange} homeHref={`#/p/${profile.id}`} />

      <section className="flex items-center gap-3" aria-label="Profile owner">
        <div className="grid size-11 place-items-center rounded-full bg-muted text-lg font-bold text-primary">
          {profile.firstName.at(0)}
        </div>
        <div>
          <p className="font-bold text-foreground">{profile.fullName}</p>
          <p className="text-xs text-muted-foreground">{copy.lastUpdated}: {date}</p>
        </div>
      </section>

      <CommunicationTools
        language={language}
        speechText={getProfileSpeechText(profile, language)}
        isLargeText={isLargeText}
        onLargeTextChange={setIsLargeText}
      />

      {profile.emergencyInfo && <EmergencyInfoSection emergencyInfo={profile.emergencyInfo} language={language} />}

      {hasMedicineTab ? (
        <Tabs defaultValue="food">
          <TabsList aria-label={copy.allergyProfile}>
            <TabsTrigger
              value="food"
              className="border-primary/30 bg-primary/5 text-primary data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <ShieldAlert className="size-5 shrink-0" />
              <span>{copy.foodAllergies}</span>
            </TabsTrigger>
            <TabsTrigger
              value="medicine"
              className="border-medicine-border bg-medicine-panel text-medicine-ink data-[state=active]:border-medicine-ink data-[state=active]:bg-medicine-ink data-[state=active]:text-white"
            >
              <Pill className="size-5 shrink-0" />
              <span>{copy.medicineAllergiesHeading}</span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="food">
            <FoodProfileContent profile={profile} language={language} showEyebrow={false} />
          </TabsContent>
          <TabsContent value="medicine">
            <MedicineAllergySection medicineAllergies={medicineAllergies} language={language} />
          </TabsContent>
        </Tabs>
      ) : (
        <FoodProfileContent profile={profile} language={language} showEyebrow />
      )}

      <Button size="lg" className="w-full justify-between" onClick={onShowToStaff}>
        {copy.showToStaff}
        <ArrowUpRight className="size-5" />
      </Button>

    </main>
  )
}
