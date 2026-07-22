"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

export function ProductAccordion({ items }: { items: Array<{ question: string; answer: string }> }) {
  return (
    <AccordionPrimitive.Root className="faq-list" type="single" collapsible>
      {items.map((item, index) => (
        <AccordionPrimitive.Item className="faq-item" value={`item-${index}`} key={item.question}>
          <AccordionPrimitive.Header>
            <AccordionPrimitive.Trigger className="faq-trigger">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{item.question}</strong>
              <ChevronDown size={18} aria-hidden />
            </AccordionPrimitive.Trigger>
          </AccordionPrimitive.Header>
          <AccordionPrimitive.Content className="faq-content">
            <p>{item.answer}</p>
          </AccordionPrimitive.Content>
        </AccordionPrimitive.Item>
      ))}
    </AccordionPrimitive.Root>
  );
}
