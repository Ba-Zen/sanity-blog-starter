import { urlFor } from "@/lib/sanity";
import { bricolage } from "@/styles/fonts";
import Image from "next/image";
import { SanityDocument } from "next-sanity";
import React from "react";
import Link from "next/link";
export default function CategoriesIcon({ cat }: any) {
  return (
    <Link
      href={`/attractions/categories/${cat.slug.current}`}
      className={`${bricolage.className} font-semibold first-letter:uppercase`}
    >
      <div
        className={
          "relative flex h-full w-full flex-col items-center justify-center overflow-hidden opacity-50"
        }
      >
        {cat.teaserImage ? (
          <Image
            alt={cat.title}
            src={urlFor(cat.teaserImage).url()}
            width={34}
            height={34}
            className="overflow-hidden object-cover object-center"
          />
        ) : (
          <div className="h-full w-full overflow-hidden bg-zinc-200"></div>
        )}
        <div className="text-[.85rem] font-semibold">{cat.title}</div>
      </div>
    </Link>
  );
}
