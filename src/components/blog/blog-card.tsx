import Image from "next/image";
import Link from "next/link";
import { bricolage } from "@/styles/fonts";
import { urlFor } from "@/lib/sanity";
import { SanityDocument } from "next-sanity";

interface BlogCardProps {
  article: SanityDocument;
}
const BlogCard = ({ article }: BlogCardProps) => {
  return (
    <div className="col-span-1 flex w-full flex-col">
      <Link href={`/blog/${article.slug}`} className="">
        <div className="aspect-[12/9] w-full overflow-hidden rounded-xl bg-zinc-400">
          {article.teaserImage && (
            <Image
              src={urlFor(article.teaserImage).url()}
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
            href={`/blog/categories/${article.category}`}
            className="text-[11px] font-semibold uppercase text-rose-600 md:text-xs lg:hover:underline"
          >
            {article.category}
          </Link>
          <Link href={`/blog/${article.slug}`} className="w-min">
            <h3
              className={`${bricolage.className} mb-4 mt-2.5 text-[22px] font-semibold leading-[1.18] md:text-[24px] md:leading-[1.2] lg:text-[30px] lg:leading-[1.2] lg:hover:underline`}
            >
              {article.title}
            </h3>

            <p className="text-[19px] leading-[1.32] md:text-[20px] md:leading-[1.3]">
              This is a description of the article.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
