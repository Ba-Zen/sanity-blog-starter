import { SanityDocument, groq } from "next-sanity";
import { client } from "@/lib/sanity";
import Container from "@/components/container";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { bricolage } from "@/styles/fonts";
import BlogCard from "@/components/blog/blog-card";
const attractionSlug = groq`
  *[_type == "attraction"]{
    slug
  }
`;
// const relatedArticles = groq`
// *[_type == "articles" && !slug.current == $slug][0] {
//   _id,
//   title,
//   "category": category->title,
//   "teaserImage": teaserImage.asset->url,
//   body,
//   "slug": slug.current,
// },`;

// const relatedArticlesQuery = groq`*[_type == 'articles' && !slug.current == $slug]{
//   _id,title, introContentHeading, introContentText, introContentImages, textTicker1Words, textTicker2Words
//   }`;

export async function generateStaticParams() {
  const slugs = (await client.fetch(attractionSlug)) as { slug: string }[];
  return slugs.map((attraction) => ({
    params: {
      slug: attraction.slug,
    },
  }));
}

export default async function BlogSlug({ params: { slug } }: any) {
  const query = groq`
    *[_type == "attraction" && slug.current == $slug][0] {
      _id,
      title,
      "category": category->title,
      "catSlug": category->slug.current,
      "teaserImage": teaserImage.asset->url,
      body,
      "slug": slug.current,
    }
   `;
  const moreAttractionsQuery = groq`
  
  *[_type == "attraction" && slug.current != $slug][0..3] {
    _id,
      title,
      "category": category->title,
      "catSlug": category->slug.current,

      "teaserImage": teaserImage.asset->url,
      body,
      "slug": slug.current,
  } 

   `;

  const attraction: SanityDocument = await client.fetch(query, { slug });
  const moreAttractions: SanityDocument = await client.fetch(
    moreAttractionsQuery,
    {
      slug,
    },
  );

  // console.log(article, 'article')
  console.log(attraction);
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
                  <Link href={`/attractions`}>Attractions</Link>/
                  <Link href={`/attractions/categories/${attraction.catSlug}`}>
                    {attraction.category}
                  </Link>
                </div>
                <h1
                  className={`max-w-md pb-4 text-center text-3xl leading-[1] tracking-tight md:max-w-xl md:text-[4vw] lg:pb-16 2xl:text-[3.5rem]`}
                >
                  {attraction.title}
                </h1>
                <p className="pb-4 italic">
                  This is the description of the attraction
                </p>
              </div>
              <Image
                src={attraction.teaserImage}
                width={700}
                height={700}
                alt="change me"
                className="w-full object-cover md:aspect-[1/1] md:w-1/2 xl:pb-8"
              />
            </div>
          </div>
          <div className="flex max-w-xl flex-col gap-y-4 px-2">
            {attraction?.body ? <PortableText value={attraction.body} /> : null}
          </div>
          <div className="mx-auto overflow-hidden px-5 pb-[20px] pt-80 md:max-w-[83%] md:pb-[30px] lg:max-w-[1220px]">
            <div className="flex flex-col gap-y-5 lg:flex-row lg:gap-x-5">
              {moreAttractions.map((e: any, i: number) => (
                <BlogCard article={e} key={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const revalidate = 30;
