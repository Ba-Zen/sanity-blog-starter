import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity";

export const RichTextComponents = {
  types: {
    image: ({ value }: any) => {
      return (
        <div className="relative m-10 mx-auto h-96 w-full">
          <Image
            className="object-contain"
            src={urlFor(value).url()}
            alt="change me"
            fill
          />
        </div>
      );
    },
  },
};
