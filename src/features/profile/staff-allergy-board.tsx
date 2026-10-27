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
    <section className="overflow-hidden rounded-2xl border-2 border-s-[6px] border-primary/30 border-s-primary bg-card shadow-sm" aria-labelledby="strict-allergies-heading">
      <header className="border-b border-border px-5 py-5">
        <h1 id="strict-allergies-heading" className="flex items-start gap-3 text-2xl font-bold leading-tight text-primary">
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground">
            <ShieldAlert className="size-6" />
          </span>
          {copy.staffAllergiesHeading}
        </h1>
      </header>
      <div className="grid grid-cols-2 gap-px bg-border">
        {foods.map((food, index) => (
          <div
            key={food.id}
            className={cn(
              "flex min-h-32 flex-col items-center justify-center gap-2 bg-card px-3 py-4 text-center text-foreground",
              foods.length % 2 === 1 && index === foods.length - 1 && "col-span-2",
            )}
          >
            <FoodIcon foodId={food.id} />
            <span className="text-xl font-bold leading-tight">{copy.foods[food.id]}</span>
            <span className="text-[0.62rem] font-semibold uppercase tracking-wider text-muted-foreground">
              {copy.families[food.familyId]}
            </span>
          </div>
        ))}
      </div>
      <p className="border-t border-alert/20 bg-alert/5 px-5 py-4 text-center text-lg font-bold leading-tight text-alert">
        {copy.staffAvoidanceInstruction}
      </p>
    </section>
  )
}
