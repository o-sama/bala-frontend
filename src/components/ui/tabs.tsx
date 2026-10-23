import * as TabsPrimitive from "@radix-ui/react-tabs"
import type { ComponentProps } from "react"

import { cn } from "@/lib/utils"

const Tabs = TabsPrimitive.Root

function TabsList({ className, ...props }: ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      className={cn("grid w-full grid-cols-2 gap-1 rounded-xl bg-muted p-1", className)}
      {...props}
    />
  )
}

function TabsTrigger({ className, ...props }: ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      className={cn(
        "min-h-10 rounded-lg px-3 py-2 text-sm font-bold text-muted-foreground outline-none transition-colors",
        "focus-visible:ring-2 focus-visible:ring-ring data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm",
        className,
      )}
      {...props}
    />
  )
}

function TabsContent({ className, ...props }: ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      className={cn("mt-5 space-y-6 outline-none focus-visible:ring-2 focus-visible:ring-ring", className)}
      {...props}
    />
  )
}

export { Tabs, TabsContent, TabsList, TabsTrigger }
