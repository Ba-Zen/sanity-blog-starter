import { SanityDocument, groq } from "next-sanity";
import { client } from "@/lib/sanity";
import Container from "@/components/container";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { bricolage } from "@/styles/fonts";
const articlesSlug = groq`
  *[_type == "article"]{
    slug
  }
`;

export async function generateStaticParams() {
  const slugs = (await client.fetch(articlesSlug)) as { slug: string }[];
  return slugs.map((article) => ({
    params: {
      slug: article.slug,
    },
  }));
}

export default async function BlogSlug({ params: { slug } }: any) {
  const query = groq`
    *[_type == "articles" && slug.current == $slug][0] {
      _id,
      title,
      "category": category->title,
      "teaserImage": teaserImage.asset->url,
      body,
      "slug": slug.current,
    }
  `;

  const article: SanityDocument = await client.fetch(query, { slug });
  // console.log(article, 'article')

  return (
    <div className="">
      <div className="px-5 pt-24 md:pt-[95px] lg:md:pt-[140px]">
        <div className="flex flex-col items-center">
          <div className="mb-20 flex w-full border-b border-zinc-200 md:justify-between">
            <div className="h-fit w-full md:flex md:justify-between">
              <div
                className={`${bricolage.className} flex h-auto flex-col items-center justify-center gap-y-4 md:w-1/2 lg:justify-center`}
              >
                <div
                  className={`flex gap-x-2 pb-4 text-sm font-semibold uppercase text-rose-600`}
                >
                  <Link href={`/blog`}>Blog</Link>/
                  <Link href={`/blog/categories/${article.category}`}>
                    {article.category}
                  </Link>
                </div>
                <h1
                  className={`max-w-md pb-4 text-center text-3xl leading-[1] tracking-tight md:max-w-2xl md:text-[4vw] lg:pb-16 2xl:text-[3.5rem]`}
                >
                  {article.title}
                </h1>
                <p className="pb-4">This is the description of the article</p>
              </div>
              <Image
                src={article.teaserImage}
                width={700}
                height={700}
                alt="change me"
                className="w-full object-cover md:aspect-[1/1] md:w-1/2 xl:pb-8"
              />
            </div>
          </div>
          <div className="flex max-w-xl flex-col gap-y-4 px-2">
            {article?.body ? <PortableText value={article.body} /> : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export const revalidate = 30;
