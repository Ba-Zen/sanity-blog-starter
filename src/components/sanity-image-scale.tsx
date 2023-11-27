"use client";
import { m, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

interface SanityImageScaleProps {
  image: string;
  p?: boolean;
  w: number;
  h: number;
  alt?: string;

  hoverState?: string;
}

export default function SanityImageScale({
  image,
  p,
  w,
  h,
  alt,
  hoverState,
}: SanityImageScaleProps) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end 33%"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1], {
    clamp: true,
  });

  return (
    <div className="relative h-full w-full overflow-hidden">
      <m.div
        style={{ scale: scale }}
        className="absolute inset-0 h-full w-full overflow-hidden object-cover object-center will-change-transform"
      >
        <div ref={ref} className="absolute inset-0 h-full w-full">
          <Image
            priority={p ? true : false}
            src={image}
            width={w}
            height={h}
            alt={alt ? alt : "No image description"}
            className={`duration-[1000ms] z-1 absolute inset-0 h-full w-full object-cover object-center transition-all ease-in-out will-change-transform ${
              hoverState ? hoverState : ""
            }`}
          />
        </div>
      </m.div>
    </div>
  );
}
