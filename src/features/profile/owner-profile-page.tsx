import { ArrowLeft, ArrowUpRight, Milk, Search, Sprout, Wheat } from "lucide-react"
import { useMemo, useState } from "react"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { AppHeader } from "@/features/profile/app-header"
import { FoodCheckboxRow } from "@/features/profile/food-checkbox-row"
import { foods, type FoodId } from "@/features/profile/profile-data"

interface OwnerProfilePageProps {
  selectedFoodIds: FoodId[]
  onSelectedFoodIdsChange: (foodIds: FoodId[]) => void
  onPreview: () => void
}

export function OwnerProfilePage({ selectedFoodIds, onSelectedFoodIdsChange, onPreview }: OwnerProfilePageProps) {
  const [query, setQuery] = useState("")

  const visibleTreeNuts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    return foods.filter(
      (food) =>
        food.familyId === "tree-nuts" &&
        (!normalizedQuery || food.id.toLowerCase().includes(normalizedQuery)),
    )
  }, [query])

  const updateSelection = (foodId: FoodId, checked: boolean) => {
    onSelectedFoodIdsChange(
      checked ? [...selectedFoodIds, foodId] : selectedFoodIds.filter((id) => id !== foodId),
    )
  }

  const selectedTreeNutCount = selectedFoodIds.filter((id) => foods.find((food) => food.id === id)?.familyId === "tree-nuts").length

  return (
    <main className="phone-panel space-y-5" aria-labelledby="owner-heading">
      <AppHeader trailingText="Alex’s profile" />

      <button type="button" className="flex items-center gap-2 text-sm text-secondary-foreground" onClick={onPreview}>
        <ArrowLeft className="size-4" /> Profile settings
      </button>

      <section className="space-y-3">
        <p className="eyebrow">Your food allergies</p>
        <h1 id="owner-heading" className="text-3xl font-bold tracking-tight">Choose each food.</h1>
        <p className="leading-6 text-muted-foreground">Select only the foods you need to avoid. Categories help you find them.</p>
      </section>

      <label className="flex h-11 items-center gap-2 rounded-xl border border-border px-3 focus-within:ring-2 focus-within:ring-ring">
        <Search className="size-4 text-muted-foreground" />
        <span className="sr-only">Search foods</span>
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search foods"
          className="min-w-0 grow bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
      </label>

      <section className="space-y-2" aria-labelledby="tree-nut-heading">
        <div className="flex items-center justify-between">
          <h2 id="tree-nut-heading" className="text-lg font-bold">Tree nuts</h2>
          <span className="text-xs text-muted-foreground">{selectedTreeNutCount} selected</span>
        </div>
        {visibleTreeNuts.length ? (
          visibleTreeNuts.map((food) => (
            <FoodCheckboxRow
              key={food.id}
              foodId={food.id}
              checked={selectedFoodIds.includes(food.id)}
              onCheckedChange={updateSelection}
            />
          ))
        ) : (
          <p className="rounded-xl bg-muted p-4 text-sm text-muted-foreground">No matching tree nuts.</p>
        )}
      </section>

      <Accordion type="multiple" defaultValue={["legumes"]} className="w-full">
        <AccordionItem value="legumes">
          <AccordionTrigger>
            <span className="flex items-center gap-3"><Sprout className="size-5" /> Peanuts &amp; legumes · {selectedFoodIds.includes("peanut") ? 1 : 0} selected</span>
          </AccordionTrigger>
          <AccordionContent>
            <FoodCheckboxRow foodId="peanut" checked={selectedFoodIds.includes("peanut")} onCheckedChange={updateSelection} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="dairy">
          <AccordionTrigger><span className="flex items-center gap-3"><Milk className="size-5" /> Milk &amp; dairy</span></AccordionTrigger>
          <AccordionContent><p className="text-sm text-muted-foreground">Milk allergy selections will appear here.</p></AccordionContent>
        </AccordionItem>
        <AccordionItem value="wheat">
          <AccordionTrigger><span className="flex items-center gap-3"><Wheat className="size-5" /> Wheat</span></AccordionTrigger>
          <AccordionContent><p className="text-sm text-muted-foreground">Wheat allergy selections will appear here.</p></AccordionContent>
        </AccordionItem>
      </Accordion>

      <p className="text-xs leading-5 text-muted-foreground">Celiac disease and intolerances will be managed separately under dietary needs.</p>

      <Button size="lg" className="w-full justify-between" onClick={onPreview}>
        Preview allergy card <ArrowUpRight className="size-5" />
      </Button>
      <p className="text-xs text-muted-foreground">Only selected foods appear on the public card.</p>
    </main>
  )
}
