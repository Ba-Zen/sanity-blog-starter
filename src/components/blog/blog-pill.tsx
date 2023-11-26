import Image from "next/image";
import Link from "next/link";
import { bricolage } from "@/styles/fonts";
import { urlFor } from "@/lib/sanity";
import { SanityDocument } from "next-sanity";
// import PostCardContent from "./postCardContent";

// interface PostCardProps {
//   post: PostWithAuthorAndCategory;
//
//   reverse?: boolean;
// }
interface BlogPillProps {
  article: SanityDocument;
}
const BlogPill = ({ article }: BlogPillProps) => {
  return (
    <div className="flex w-full">
      <Link href={`/blog/${article.slug}`} className="w-[50%]">
        <div className="aspect-[12/9] w-full overflow-hidden bg-zinc-400">
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
      <div className="ml-5 flex w-[100%] flex-col lg:mt-5">
        <Link
          href={`/blog/categories/${article.category}`}
          className="text-[11px] font-semibold uppercase text-rose-600 md:text-xs lg:hover:underline"
        >
          {article.category}
        </Link>
        <div className="">
          <Link href={`/blog/${article.slug}`}>
            <h3
              className={`${bricolage.className} mb-4 mt-2.5 text-[22px] font-semibold leading-[1.18] md:text-[24px] md:leading-[1.2] lg:text-[30px] lg:leading-[1.2] lg:hover:underline`}
            >
              {article.title}
            </h3>
            <p className="text-[19px] leading-[1.32] md:text-[20px] md:leading-[1.3]">
              This is a description of the articlarticle.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogPill;
