import { ShieldAlert } from "lucide-react"

import { FoodIcon } from "@/features/profile/food-icon"
import type { Food } from "@/features/profile/profile-data"
import { translations, type SupportedLanguage } from "@/features/profile/translations"
import { cn } from "@/lib/utils"

interface StaffAllergyBoardProps {
  foods: Food[]
  language: SupportedLanguage
}

export function StaffAllergyBoard({ foods, language }: StaffAllergyBoardProps) {
  const copy = translations[language]

  return (
    <section className="overflow-hidden rounded-3xl bg-primary text-primary-foreground" aria-labelledby="strict-allergies-heading">
      <header className="border-b border-white/20 px-5 py-5">
        <h1 id="strict-allergies-heading" className="flex items-start gap-3 text-2xl font-bold leading-tight">
          <ShieldAlert className="mt-0.5 size-7 shrink-0" />
          {copy.staffAllergiesHeading}
        </h1>
      </header>
      <div className="grid grid-cols-2 gap-px bg-white/20">
        {foods.map((food, index) => (
          <div
            key={food.id}
            className={cn(
              "flex min-h-32 flex-col items-center justify-center gap-2 bg-primary px-3 py-4 text-center",
              foods.length % 2 === 1 && index === foods.length - 1 && "col-span-2",
            )}
          >
            <FoodIcon foodId={food.id} />
            <span className="text-xl font-bold leading-tight">{copy.foods[food.id]}</span>
            <span className="text-[0.62rem] font-semibold uppercase tracking-wider text-white/70">
              {copy.families[food.familyId]}
            </span>
          </div>
        ))}
      </div>
      <p className="bg-alert px-5 py-5 text-center text-xl font-bold leading-tight">
        {copy.staffAvoidanceInstruction}
      </p>
    </section>
  )
}
