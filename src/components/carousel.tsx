"use client";

import { EmblaCarouselType } from "embla-carousel-react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Article } from "../../interface";
import { urlFor } from "@/lib/sanity";
import IconArrow from "../../public/icons/arrow.svg";
import AttractionCard from "./attraction/attraction-card";
import { SanityDocument } from "next-sanity";
import { bricolage } from "@/styles/fonts";

export default function Carousel({ items }: any) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
  });
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  //   const scrollPrev = useCallback(() => {
  //     if (emblaApi) emblaApi.scrollPrev();
  //   }, [emblaApi]);
  const scrollPrev = useCallback(() => {
    if (emblaApi) {
      const currentIndex = emblaApi.selectedScrollSnap();
      const distanceToScroll = 2; // Adjust this value based on how many items you want to skip
      const newIndex = currentIndex - distanceToScroll;

      emblaApi.scrollTo(newIndex);
    }
  }, [emblaApi]);
  //   const scrollNext = useCallback(() => {
  //     if (emblaApi) emblaApi.scrollNext();
  //   }, [emblaApi]);
  const scrollNext = useCallback(() => {
    if (emblaApi) {
      const currentIndex = emblaApi.selectedScrollSnap();
      const distanceToScroll = 2; // Adjust this value based on how many items you want to skip
      const newIndex = currentIndex + distanceToScroll;

      emblaApi.scrollTo(newIndex);
    }
  }, [emblaApi]);
  const onInit = useCallback((emblaApi: any) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi: any) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on("reInit", onInit);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);

    // Cleanup event listeners when the component unmounts
    return () => {
      emblaApi.off("reInit", onInit);
      emblaApi.off("reInit", onSelect);
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onInit, onSelect]);

  return (
    <div className="relative">
      <button
        aria-label="Move Carousel Items Along Backwards"
        onClick={scrollPrev}
        className={`a11y-focus absolute -left-[3%] top-[25vw] z-10 hidden h-[50px] w-[50px] items-center justify-center rounded-full bg-black md:top-[12vw] md:flex lg:top-[6vw] lg:h-[50px] lg:w-[50px] lg:hover:scale-[1.15] xl:-left-12  ${
          prevBtnDisabled ? "opacity-0" : "opacity-100"
        } duration-[330ms] transition-all ease-in-out`}
      >
        <IconArrow className="block w-[20%] rotate-[-90deg] invert" />
      </button>

      <button
        aria-label="Move Carousel Items Along"
        onClick={scrollNext}
        className={`a11y-focus absolute -right-[3%] top-[25vw] z-10 hidden h-[50px] w-[50px] items-center justify-center rounded-full bg-black md:top-[12vw] md:flex lg:top-[6vw] lg:h-[50px] lg:w-[50px] lg:hover:scale-[1.15] xl:-right-12 ${
          nextBtnDisabled ? "opacity-0" : "opacity-100"
        } duration-[330ms] transition-all ease-in-out`}
      >
        <IconArrow className="block w-[20%] rotate-90 invert" />
      </button>

      <div className="embla relative mb-12 lg:mb-16 2xl:mb-20" ref={emblaRef}>
        <div className="embla__container gap-x-6">
          {items.map((e: SanityDocument) => (
            <Card attraction={e} key={e.id} />
          ))}
        </div>
      </div>
    </div>
  );
}

interface CardProps {
  attraction: SanityDocument;
}
const Card = ({ attraction }: CardProps) => {
  return (
    <div className="flex w-full min-w-[276px] flex-col">
      <Link href={`/attractions/${attraction.slug}`} className="">
        <div className="aspect-[12/9] w-full overflow-hidden rounded-xl bg-zinc-400">
          {attraction.teaserImage && (
            <Image
              src={urlFor(attraction.teaserImage).url()}
              alt="change me"
              width={960}
              height={708}
              className="h-full w-full object-cover object-center"
            />
          )}
        </div>
      </Link>
      <div className="mt-2 flex flex-col lg:mt-3">
        <div className="">
          <Link
            href={`/attractions/categories/${attraction.catPage}`}
            className="text-[11px] font-semibold uppercase text-rose-600 md:text-xs lg:hover:underline"
          >
            {attraction.category}
          </Link>
          <Link href={`/attractions/${attraction.slug}`} className="w-min">
            <h3
              className={`${bricolage.className} mb-4 mt-2.5 text-[22px] font-semibold leading-[1.18] md:text-[24px] md:leading-[1.2] lg:text-[30px] lg:leading-[1.2] lg:hover:underline`}
            >
              {attraction.title}
            </h3>

            {/* <p className="text-[19px] leading-[1.32] md:text-[20px] md:leading-[1.3]">
                This is a description of the attraction.
              </p> */}
          </Link>
        </div>
      </div>
    </div>
  );
};
