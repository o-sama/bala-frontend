import type { FoodId } from "@/features/profile/profile-data"
import { cn } from "@/lib/utils"

const paths: Record<FoodId, string> = {
  walnut: "M16 4C11 1 5 5 5 10c-4 3-2 9 1 10 0 6 7 9 10 6 4 3 10-1 10-5 4-4 3-9 0-11 0-6-6-9-10-6ZM16 5v20M10 7c-3 3 2 4 0 7-3 2 0 6 2 6M22 7c3 3-2 4 0 7 3 2 0 6-2 8",
  cashew: "M20 4c9 1 10 11 6 18-4 7-14 8-20 2-4-4-2-10 2-10 3 0 4 2 4 5 3 4 9-1 8-5-1-3-5-2-5-6 0-3 2-5 5-4ZM22 9c4 7-1 15-8 16",
  pistachio: "M16 3C4 7 2 19 10 26c3 4 12 2 16-4 4-8-1-16-10-19ZM16 4c-3 8-3 16-6 22M16 4c5 7 8 13 10 18",
  almond: "M17 3c13 9 12 19 2 25C8 29 2 22 5 14c3-6 7-9 12-11ZM17 7c-7 8-8 13-4 18M20 10c-3 6-4 11-2 15",
  hazelnut: "M8 11c-5 6-2 15 7 17 9 0 13-8 10-15L8 11ZM6 11c3-6 8-6 11-4 4-2 9 2 10 6ZM17 7l1-4",
  pecan: "M17 3c9 0 11 9 7 18-3 8-11 10-16 5-6-6-2-16 2-20 2-2 5-3 7-3ZM17 6c-7 7-7 16-4 20M20 7c-5 6-5 13-3 18",
  "brazil-nut": "M8 25 5 14 13 5l12 5 2 12-10 7-9-4ZM13 5l4 24M6 14l20 8M10 11l12 14",
  "macadamia-nut": "M16 4c8 0 13 5 13 12s-5 12-13 12S3 23 3 16 8 4 16 4Zm0 4c-5 0-9 3-9 8s4 8 9 8 9-3 9-8-4-8-9-8Zm-4 3c3-2 7-1 9 2 2 4 0 7-4 8",
  peanut: "M12 4c-5 0-7 4-6 8 1 3 4 4 3 7-1 4 1 9 6 9s8-4 7-8c-1-3-4-4-3-7 1-4-2-9-7-9ZM10 7c4 3 5 6 2 9-2 3 0 7 4 10M16 7c-3 3-4 6-1 9 3 3 3 6 1 10M8 12l10 1M10 20h11",
}

interface FoodIconProps {
  foodId: FoodId
  className?: string
}

export function FoodIcon({ foodId, className }: FoodIconProps) {
  const isPeanut = foodId === "peanut"

  return (
    <span
      aria-hidden="true"
      className={cn(
        "grid size-10 shrink-0 place-items-center rounded-xl bg-nut-icon text-nut-ink",
        isPeanut && "bg-peanut-icon text-peanut-ink",
        className,
      )}
    >
      <svg viewBox="0 0 32 32" className="size-7" fill="none">
        <path d={paths[foodId]} stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  )
}
