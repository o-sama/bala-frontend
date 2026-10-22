import { Checkbox } from "@/components/ui/checkbox"
import { FoodIcon } from "@/features/profile/food-icon"
import type { FoodId } from "@/features/profile/profile-data"
import { translations } from "@/features/profile/translations"
import { cn } from "@/lib/utils"

interface FoodCheckboxRowProps {
  foodId: FoodId
  checked: boolean
  onCheckedChange: (foodId: FoodId, checked: boolean) => void
}

export function FoodCheckboxRow({ foodId, checked, onCheckedChange }: FoodCheckboxRowProps) {
  const labelId = `${foodId}-label`

  return (
    <label
      htmlFor={foodId}
      className={cn(
        "flex min-h-14 cursor-pointer items-center gap-3 rounded-xl px-3 transition-colors hover:bg-muted/70",
        checked && "bg-selected hover:bg-selected",
      )}
    >
      <FoodIcon foodId={foodId} />
      <span id={labelId} className={cn("grow text-sm", checked && "font-bold")}>
        {translations.en.foods[foodId]}
      </span>
      <Checkbox
        id={foodId}
        checked={checked}
        aria-labelledby={labelId}
        onCheckedChange={(value) => onCheckedChange(foodId, value === true)}
      />
    </label>
  )
}
