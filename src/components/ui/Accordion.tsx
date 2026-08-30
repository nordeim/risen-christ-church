import { useId, useState, type KeyboardEvent } from "react";
import { ChevronDown } from "lucide-react";
import type { FaqItem } from "@/data/content";
import { cn } from "@/utils/cn";

export function Accordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  function onKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const last = items.length - 1;
    let next = index;
    if (event.key === "ArrowDown") next = index === last ? 0 : index + 1;
    else if (event.key === "ArrowUp") next = index === 0 ? last : index - 1;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = last;
    else return;
    event.preventDefault();
    document.getElementById(`${baseId}-btn-${next}`)?.focus();
  }

  return (
    <div className="divide-y divide-shrine-stone border-y border-shrine-stone">
      {items.map((item, index) => {
        const isOpen = open === index;
        const panelId = `${baseId}-panel-${index}`;
        const buttonId = `${baseId}-btn-${index}`;
        return (
          <div key={item.question}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : index)}
                onKeyDown={(event) => onKey(event, index)}
                className="flex w-full items-center justify-between gap-4 py-5 text-left font-display text-xl text-shrine-maroon-700"
              >
                {item.question}
                <ChevronDown
                  className={cn(
                    "h-5 w-5 shrink-0 text-shrine-gold-600 transition-transform duration-300",
                    isOpen && "rotate-180",
                  )}
                  aria-hidden="true"
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              aria-hidden={isOpen ? undefined : true}
              inert={isOpen ? undefined : true}
              className={cn(
                "grid transition-[grid-template-rows] duration-300 ease-out",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <p className="pb-5 leading-relaxed text-shrine-charcoal/85">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
