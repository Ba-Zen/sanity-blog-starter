import { client, urlFor } from "@/lib/sanity";
import Container from "@/components/container";
import { SanityDocument, groq } from "next-sanity";
import Link from "next/link";
import BlogCard from "@/components/blog/blog-card";
import { bricolage } from "@/styles/fonts";
import { PortableText } from "@portabletext/react";
import Image from "next/image";

const catsQuery = groq`*[_type == 'categories']{
  ..., "id": _id,title, "slug": slug.current, teaserImage
 }`;
const categoryTitlesQuery = groq`*[_type == "categories"].title`;
export async function generateStaticParams() {
  const titles = (await client.fetch(categoryTitlesQuery)) as string[];
  return titles.map((title) => ({ category: title }));
}
async function getArticles(category: string) {
  const query = `*[_type == 'articles' && category->title == "${category}"]{
    ..., "id": _id,title, teaserImage, "slug": slug.current, "category": category->title,"catPage": category->slug.current 
  }
`;
  const data = await client.fetch(query);
  return data;
}
export const dynamicParams = false;
export default async function CategoryPage({ params }: { params: any }) {
  const articles: SanityDocument = await getArticles(params.category);
  const cats = await client.fetch(catsQuery);

  // console.log(cats);
  return (
    <div className="relative pt-14 md:pt-[65px] lg:md:pt-[90px]">
      <div className="mx-auto px-5 pb-[20px] md:max-w-[83%] md:pb-[30px] lg:max-w-[1220px]">
        <h1
          className={`${bricolage.className} border-b  border-zinc-200 pb-[30px] pt-[20px] text-[36px] font-bold leading-[1.12] first-letter:uppercase md:pb-[40px] md:pt-[30px] md:text-[54px] md:leading-[1.09]`}
        >
          {params.category}
        </h1>
        <div className="flex justify-center space-x-4 pt-8 md:pb-16">
          {/* <Link
            href={`/blog`}
            className={`${bricolage.className} font-semibold first-letter:uppercase`}
          >
            <div
              className={
                "relative flex h-full w-full flex-col items-center justify-center overflow-hidden opacity-50"
              }
            >
              <Image
                alt={`Blog Home`}
                src={"/icons/pin.svg"}
                // src={urlFor(e.teaserImage).url()}
                width={34}
                height={34}
                className="overflow-hidden object-cover object-center"
              />

              <div className="text-[.85rem] font-semibold">All</div>
            </div>
          </Link> */}
          <div className="flex gap-4 overflow-x-auto py-6 md:grid md:grid-cols-4">
            <Link
              href={`/blog`}
              className="group flex min-w-[170px] items-center justify-between rounded-full border px-4 py-1.5 transition-all duration-300 ease-in-out hover:bg-black md:py-3"
            >
              <h2 className="pr-2 font-semibold leading-[1] transition-all duration-300 ease-in-out first-letter:uppercase group-hover:text-white">
                Blog Home
              </h2>
              <Image
                alt={`Blog Home`}
                src={"/icons/pin.svg"}
                width={26}
                height={26}
                className="transition-all duration-300 ease-in-out group-hover:invert"
              />
            </Link>
            {cats.map((e: SanityDocument) => (
              <Link
                href={`/blog/categories/${e.slug}`}
                className="group flex min-w-[170px] items-center justify-between rounded-full border px-4 py-1.5 transition-all duration-300 ease-in-out hover:bg-black md:py-3"
                key={e._id}
              >
                <h2 className="pr-2 font-semibold leading-[1] transition-all duration-300 ease-in-out first-letter:uppercase group-hover:text-white">
                  {e.title}
                </h2>
                <Image
                  alt={`${e.title} icon`}
                  src={urlFor(e.teaserImage).url()}
                  width={26}
                  height={26}
                  className="transition-all duration-300 ease-in-out group-hover:invert"
                />
              </Link>
            ))}
          </div>
        </div>
        {articles.length ? (
          <div className="">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((e: SanityDocument) => (
                <BlogCard article={e} key={e._id} />
              ))}
            </div>
          </div>
        ) : (
          <div className="pt-8">
            <p>No articles found in this category</p>
          </div>
        )}
      </div>
    </div>
  );
}
