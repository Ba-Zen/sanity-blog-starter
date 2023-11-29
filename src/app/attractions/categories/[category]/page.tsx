import { client, urlFor } from "@/lib/sanity";
import Container from "@/components/container";
import { SanityDocument, groq } from "next-sanity";
import Link from "next/link";
import BlogCard from "@/components/blog/blog-card";
import { bricolage } from "@/styles/fonts";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import AttractionCard from "@/components/attraction/attraction-card";

async function getCats() {
  const query = "*[_type == 'attractionCats']";
  const data = await client.fetch(query);
  return data;
}
const categorySlugsQuery = groq`*[_type == "attractionCats"].slug.current`;

export async function generateStaticParams() {
  const slugs = (await client.fetch(categorySlugsQuery)) as string[];
  return slugs.map((slug) => ({ slug: slug }));
}

async function getAttractions(slug: string) {
  const query = `*[_type == 'attraction' && category->slug.current == "${slug}"]{
    ..., "id": _id,title, teaserImage, "slug": slug.current, "category": category->title, "catPage": category->slug.current 
  }
`;
  const data = await client.fetch(query);
  return data;
}
export const dynamicParams = false;
export default async function CategoryPage({ params }: { params: any }) {
  const attractions: SanityDocument = await getAttractions(params.category);

  const cats = await getCats();

  return (
    <div className="pt-14 md:pt-[65px] lg:md:pt-[164px]">
      <div className="mx-auto px-5 pb-[20px] md:max-w-[83%] md:pb-[30px] lg:max-w-[1220px]">
        <h1
          className={`${bricolage.className} mb-[15px] border-b border-zinc-200 pb-[30px] pt-[20px] text-center text-[32px] uppercase leading-[1.12] md:pb-[40px] md:pt-[30px] md:text-[44px] md:leading-[1.09]`}
        >
          {params.category}
        </h1>
        <div className="mx-auto pb-[20px] md:pb-[30px] lg:max-w-[1220px]">
          <div className="absolute top-0 flex w-full space-x-6 border-b border-zinc-200 bg-white pb-4 pt-14 md:pt-[65px] lg:md:pt-[90px] lg:max-w-[1220px]">
            <Link
              href={`/attractions`}
              className={`${bricolage.className} font-semibold first-letter:uppercase`}
            >
              <div
                className={
                  "relative flex h-full w-full flex-col items-center justify-center overflow-hidden opacity-50"
                }
              >
                <Image
                  alt={`All Attractions`}
                  src={"/icons/pin.svg"}
                  // src={urlFor(e.teaserImage).url()}
                  width={34}
                  height={34}
                  className="overflow-hidden object-cover object-center"
                />

                <div className="text-[.85rem] font-semibold">All</div>
              </div>
            </Link>
            {cats.map((e: SanityDocument) => (
              <Link
                href={`/attractions/categories/${e.slug.current}`}
                key={e._id}
              >
                <div
                  className={
                    "relative flex h-full w-full flex-col items-center justify-center overflow-hidden opacity-50"
                  }
                  key={e._id}
                >
                  {e.teaserImage ? (
                    <Image
                      alt={e.title}
                      src={urlFor(e.teaserImage).url()}
                      width={34}
                      height={34}
                      className="overflow-hidden object-cover object-center"
                    />
                  ) : (
                    <div className="h-full w-full overflow-hidden bg-zinc-200"></div>
                  )}
                  <div className="text-[.85rem] font-semibold">{e.title}</div>
                </div>
              </Link>
            ))}
          </div>
          {attractions.length ? (
            <div className="">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {attractions.map((e: SanityDocument) => (
                  <AttractionCard attraction={e} key={e.id} />
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
    </div>
  );
}
