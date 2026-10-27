import { AlertTriangle } from "lucide-react"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { FoodIcon } from "@/features/profile/food-icon"
import type { AllergenFamilyId, Food } from "@/features/profile/profile-data"
import type { SupportedLanguage } from "@/features/profile/translations"
import { translations } from "@/features/profile/translations"
import { cn } from "@/lib/utils"

interface AllergenSectionProps {
  familyId: AllergenFamilyId
  foods: Food[]
  language: SupportedLanguage
  emphasized?: boolean
}

export function AllergenSection({ familyId, foods, language, emphasized }: AllergenSectionProps) {
  const copy = translations[language]
  const isLegume = familyId === "legumes"

  return (
    <Card
      className={cn(
        "overflow-hidden border border-s-4 border-border border-s-nut-ink bg-card text-foreground shadow-sm",
        isLegume && "border-s-peanut-ink",
      )}
    >
      <CardHeader className={cn("px-5 pt-5", emphasized && "px-6 pt-6")}>
        <div className="flex items-start justify-between gap-3">
          <div className={cn("flex items-center gap-2 text-[0.7rem] font-bold uppercase tracking-[0.1em] text-nut-ink", isLegume && "text-peanut-ink")}>
            <AlertTriangle className="size-4" />
            <span>{copy.families[familyId]}</span>
          </div>
          <span className="whitespace-nowrap rounded-full bg-alert px-2.5 py-1 text-[0.58rem] font-bold uppercase tracking-wide text-white">
            {copy.strictAvoidance}
          </span>
        </div>
      </CardHeader>
      <CardContent className={cn("divide-y divide-border px-5 pb-4", emphasized && "px-6 pb-5")}>
        {foods.map((food) => (
          <div key={food.id} className={cn("flex items-center gap-4 py-3", emphasized && "py-5")}>
            <FoodIcon foodId={food.id} />
            <span className={cn("text-xl font-bold", emphasized && "text-3xl")}>{copy.foods[food.id]}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
