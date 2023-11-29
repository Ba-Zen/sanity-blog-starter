import Container from "@/components/container";
import Image from "next/image";
import { SanityDocument, groq } from "next-sanity";
import { client, urlFor } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";
import SanityImageScale from "@/components/sanity-image-scale";
import PageWrapper from "@/components/page-wrapper";
import HomeTicker from "@/components/home-ticker";
import Link from "next/link";
import { bricolage } from "@/styles/fonts";
import Email from "@/components/email";
import BlogCard from "@/components/blog/blog-card";
import BlogPill from "@/components/blog/blog-pill";
import CategoriesIcon from "@/components/categories-icon";
import AttractionCard from "@/components/attraction/attraction-card";
import Carousel from "@/components/carousel";

async function getCats() {
  const query = "*[_type == 'attractionCats']";
  const data = await client.fetch(query);
  return data;
}

const homeQuery = groq`*[_type == 'singletonAttractions'][0]{
_id,title, introImage, introContentHeading, introContentText, introContentImages
}`;
const attractionsCatsQuery = groq`*[_type == 'attractionCats']{
 ..., "id": _id,title, "slug": slug.current, teaserImage
}`;
const attractionQuery = groq`*[_type == 'attraction']{
  ..., "id": _id,title, teaserImage, "slug": slug.current, "category": category->title, "catTitle": category->title, "catPage": category->slug.current
 }`;
const toursQuery = groq`*[_type == 'attraction' && category->slug.current == 'trails-and-tours']{
  ..., "id": _id,title, teaserImage, "slug": slug.current, "category": category->title, "catTitle": category->title, "catPage": category->slug.current
 }`;

export default async function Home() {
  const home = await client.fetch(homeQuery);
  // const attractionCats = await client.fetch(attractionsCatsQuery);
  const attraction = await client.fetch(attractionQuery);
  const tours = await client.fetch(toursQuery);
  const cats = await getCats();
  const attractionCats = await client.fetch(attractionsCatsQuery);

  // console.log(home);
  return (
    <PageWrapper>
      <div className="relative pt-14 md:pt-[65px] lg:md:pt-[90px]">
        <div className="mx-auto px-5 pb-[20px] md:max-w-[83%] md:pb-[30px] lg:max-w-[1220px]">
          {/* <div className="flex w-full space-x-6 border-b border-zinc-200 bg-white pb-4 lg:max-w-[1220px]">
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

            {cats.map((cat: SanityDocument) => (
              <CategoriesIcon cat={cat} key={cat._id} />
            ))}
          </div> */}
          <div className="relative mb-[10vw] p-[5vw] pb-[7vw] pt-8 lg:mb-[15vw] lg:px-0 lg:pb-[5vw] lg:pr-0 lg:pt-[5vw]">
            <div className="relative flex flex-wrap">
              <div className="mb-16 w-full lg:mb-0 lg:w-1/2">
                {home.introContentHeading && (
                  <h1 className="mb-5 max-w-[100%] text-[9.5vw] uppercase leading-none text-[#FF5F38] md:text-[7vw] lg:mb-[2vw] lg:text-[4vw] lg:leading-[0.9] xl:leading-[0.9]">
                    <PortableText value={home.introContentHeading} />
                  </h1>
                )}
                <h1
                  className={`${bricolage.className}  pb-[30px] pt-[20px] text-[36px] font-bold leading-[1.12] md:pb-[40px] md:pt-[30px] md:text-[54px] md:leading-[1.09]`}
                >
                  <span className="text-orange-600">Things to Do</span> in
                  Boston
                </h1>

                {home.introContentText && (
                  <div className="content mb-5 max-w-[530px] text-base leading-tight lg:mb-[3vw] lg:text-lg lg:leading-tight 2xl:max-w-[740px] 2xl:text-2xl 2xl:leading-tight">
                    <PortableText value={home.introContentText} />
                  </div>
                )}
                <div className="relative right-0 top-0 h-[100vw] w-full overflow-hidden rounded-xl lg:absolute  lg:h-[30vw] lg:w-[30vw]">
                  <SanityImageScale
                    image={urlFor(home.introImage).url()}
                    w={500}
                    h={500}
                    alt="change me"
                    p
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <div
              className={`${bricolage.className} pb-[30px] pt-[20px] text-[28px] font-bold leading-[1.12] md:pb-[40px] md:pt-[30px]`}
            >
              Popular Experiences
            </div>
            <div className="flex gap-4 overflow-x-auto py-6 md:grid md:grid-cols-4">
              {attractionCats.map((e: SanityDocument) => (
                <Link
                  href={`/attractions/categories/${e.slug}`}
                  className="group flex min-w-[170px] items-center justify-between rounded-full border px-4 py-1.5 transition-all duration-300 ease-in-out hover:bg-black md:py-3"
                  key={e._id}
                >
                  <h2 className="pr-2 font-semibold leading-[1] transition-all duration-300 ease-in-out group-hover:text-white">
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
          <main className="mx-auto pb-[20px] md:pb-[30px]">
            <div
              className={`${bricolage.className} pb-[30px] pt-[20px] text-[28px] font-bold leading-[1.12] md:pb-[40px] md:pt-[30px]`}
            >
              Ways to tour Boston
            </div>
            <Carousel items={tours} />

            {/* {tours.length ? (
              <div className="pt-14 md:pt-[65px] lg:md:pt-[164px]">
                <div className="flex gap-x-6 whitespace-nowrap ">
                  {tours.map((e: SanityDocument) => (
                    <AttractionCard attraction={e} key={e.id} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="pt-8">
                <p>No articles found in this category</p>
              </div>
            )} */}

            <div
              className={`${bricolage.className} pb-6 pt-[20px] text-[28px] font-bold leading-[1.12] md:pt-[30px]`}
            >
              Top Boston Attractions
            </div>
            {attraction.length ? (
              <div className="">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {attraction.map((e: SanityDocument) => (
                    <AttractionCard attraction={e} key={e.id} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="pt-8">
                <p>No articles found in this category</p>
              </div>
            )}
            {/* <div className="mx-auto my-20 px-5 pb-[20px] md:max-w-[83%] md:pb-[30px] lg:max-w-[1220px]">
              <h5
                className={`${bricolage.className} mb-5 border-y border-zinc-200 bg-yellow-400 py-4 text-center text-[24px] leading-[1.5] md:mb-[30px] md:py-6 md:text-[36px] md:leading-[1] lg:py-8`}
              >
                Sign up for the latest news directly to your inbox
              </h5>
              <Email />
            </div> */}
            <div className="h-screen"></div>
          </main>
        </div>
      </div>
    </PageWrapper>
  );
}
