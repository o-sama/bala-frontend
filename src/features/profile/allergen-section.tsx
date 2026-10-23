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
    <Card className={cn("bg-nut-panel text-nut-ink", isLegume && "bg-peanut-panel text-peanut-ink")}>
      <CardHeader className={cn("px-5 pt-5", emphasized && "px-6 pt-6")}>
        <div className="flex items-center gap-2 text-[0.7rem] font-bold uppercase tracking-[0.1em]">
          <AlertTriangle className="size-4" />
          <span>{copy.families[familyId]}</span>
        </div>
      </CardHeader>
      <CardContent className={cn("divide-y divide-current/15 px-5 pb-4", emphasized && "px-6 pb-5")}>
        {foods.map((food) => (
          <div key={food.id} className={cn("flex items-center gap-4 py-3", emphasized && "py-5")}>
            <FoodIcon foodId={food.id} />
            <span className={cn("text-2xl font-bold", emphasized && "text-3xl")}>{copy.foods[food.id]}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
