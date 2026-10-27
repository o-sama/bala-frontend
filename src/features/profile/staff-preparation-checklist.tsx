import { Check, ClipboardCheck } from "lucide-react"

import { Checkbox } from "@/components/ui/checkbox"
import { translations, type SupportedLanguage } from "@/features/profile/translations"

interface StaffPreparationChecklistProps {
  language: SupportedLanguage
  checkedItems: string[]
  onCheckedItemsChange: (items: string[]) => void
}

const checklistIds = ["ingredients", "equipment", "crossContact", "finalCheck"] as const

export function StaffPreparationChecklist({
  language,
  checkedItems,
  onCheckedItemsChange,
}: StaffPreparationChecklistProps) {
  const copy = translations[language]

  function toggleItem(itemId: string, checked: boolean) {
    if (checked && !checkedItems.includes(itemId)) {
      onCheckedItemsChange([...checkedItems, itemId])
      return
    }

    if (!checked) {
      onCheckedItemsChange(checkedItems.filter((checkedItem) => checkedItem !== itemId))
    }
  }

  return (
    <section className="overflow-hidden rounded-2xl border-2 border-primary/30 bg-primary/5" aria-labelledby="checklist-heading">
      <header className="flex items-start gap-3 border-b border-primary/15 px-5 py-4">
        <ClipboardCheck className="mt-0.5 size-6 shrink-0 text-primary" />
        <div>
          <h2 id="checklist-heading" className="text-xl font-bold text-foreground">{copy.staffChecklistHeading}</h2>
          <p className="text-sm leading-5 text-secondary-foreground">{copy.staffChecklistIntro}</p>
        </div>
      </header>
      <div className="space-y-2 px-4 py-4">
        {checklistIds.map((itemId) => {
          const id = `staff-check-${itemId}`
          const checked = checkedItems.includes(itemId)
          return (
            <label
              key={itemId}
              htmlFor={id}
              className="flex min-h-14 cursor-pointer items-start gap-3 rounded-xl border border-border bg-white px-4 py-3 text-sm font-semibold leading-5"
            >
              <Checkbox id={id} checked={checked} onCheckedChange={(value) => toggleItem(itemId, value === true)} />
              <span className="flex-1">{copy.staffChecklistItems[itemId]}</span>
              {checked && <Check className="size-5 shrink-0 text-primary" aria-hidden="true" />}
            </label>
          )
        })}
      </div>
    </section>
  )
}
