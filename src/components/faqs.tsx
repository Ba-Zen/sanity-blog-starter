"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Faqs() {
  return (
    <Accordion type="single" collapsible className="">
      <AccordionItem value="item-1">
        <AccordionTrigger>
          What&apos;s the best time to visit Boston?
        </AccordionTrigger>
        <AccordionContent className="max-w-md">
          The best times to come to Boston are the Summer for the amount of
          activities always going on. Boston is famous for it&apos;s Autumn
          season. The fall is a great time to come to the area because the
          natural beauty when the leaves turn brown.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
