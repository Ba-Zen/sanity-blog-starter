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
const homeQuery = groq`*[_type == 'home'][0]{
_id,title, introContentHeading, introContentText, introContentImages, textTicker1Words, textTicker2Words
}`;
const articlesQuery = groq`*[_type == 'articles']{
 ..., "id": _id,title, teaserImage, "slug": slug.current, "category": category->title
}`;
const attractionsQuery = groq`*[_type == 'attractionCats']{
  ..., "id": _id,title, "slug": slug.current, teaserImage
 }`;

const options = [
  {
    title: "Hotels",
    icon: "/icons/bed.svg",
  },
  {
    title: "Things to Do",
    icon: "/icons/ticket.svg",
  },
  {
    title: "Vacation Rentals",
    icon: "/icons/housekey.svg",
  },
  {
    title: "Restaurants",
    icon: "/icons/eat.svg",
  },
  {
    title: "Forum",
    icon: "/icons/forum.svg",
  },
  {
    title: "Couples",
    icon: "/icons/couple.svg",
  },
  {
    title: "Flights",
    icon: "/icons/plane.svg",
  },
  {
    title: "More",
    icon: "/icons/elipses.svg",
  },
];

export default async function Home() {
  const home = await client.fetch(homeQuery);
  const articles = await client.fetch(articlesQuery);
  const attractionCats = await client.fetch(attractionsQuery);

  // console.log(articles)
  return (
    <PageWrapper>
      <div className="pt-14 md:pt-[65px] lg:md:pt-[164px]">
        <div className="mx-auto px-5 pb-[20px] md:max-w-[100%] md:pb-[30px] lg:max-w-[1220px]">
          <h1
            className={`${bricolage.className}  border-b border-zinc-200 pb-[30px] pt-[20px] text-[36px] font-bold leading-[1.12] md:pb-[40px] md:pt-[30px] md:text-[54px] md:leading-[1.09]`}
          >
            <span className="text-orange-600">Explore</span> Boston
          </h1>
          <div className="flex gap-4 overflow-x-auto py-6 md:grid md:grid-cols-4">
            {attractionCats.map((e: SanityDocument) => (
              <Link
                href={`/attractions/categories/${e.slug}`}
                className="group flex min-w-[150px] items-center justify-between rounded-xl border px-4 py-1 transition-all duration-300 ease-in-out hover:bg-black md:py-3"
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

          <div className="flex flex-col border-b border-zinc-200 pb-[15px] md:pb-[40px] md:pt-[30px] lg:flex-row">
            <Link href={`/blog/${articles[3].slug}`} className="lg:w-[50%]">
              <div className="aspect-[12/9] overflow-hidden rounded-xl bg-zinc-400">
                <Image
                  src={urlFor(articles[3].teaserImage).url()}
                  alt="change me"
                  width={500}
                  height={500}
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </Link>
            <div className="mt-5 flex flex-col lg:ml-[30px] lg:w-[50%]">
              <Link
                href={`/blog/categories/${articles[3].category}`}
                className="text-[11px] font-semibold uppercase text-rose-600 md:text-xs lg:hover:underline"
              >
                {articles[3].category}
              </Link>
              <Link href={`/blog/${articles[3].slug}`}>
                <h2
                  className={`${bricolage.className} mb-4 mt-2.5 text-[22px] font-semibold leading-[1.18] md:mb-5 md:mt-[20px] md:text-[40px] md:leading-[1.1] lg:hover:underline`}
                >
                  {/* <Balancer>{articles[3].title}</Balancer> */}
                  {articles[3].title}
                </h2>
              </Link>
              <p className="text-[19px] leading-[1.32] md:text-[20px] md:leading-[1.3]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem
                expedita magnam omnis tempore ratione delectus adipisci quos
                minima cum sunt mollitia repudiandae.
              </p>
            </div>
          </div>
        </div>
        <div className="mx-auto overflow-hidden px-5 pb-[20px] md:max-w-[83%] md:pb-[30px] lg:max-w-[1220px]">
          <div className="flex flex-col gap-y-5 lg:flex-row lg:gap-x-5">
            {articles.slice(1, 4).map((e: SanityDocument) => (
              <BlogCard article={e} key={e.id} />
            ))}
          </div>
        </div>
      </div>
      <div className="mx-auto px-5 pb-[20px] md:max-w-[83%] md:pb-[30px] lg:max-w-[1220px]">
        <h5
          className={`${bricolage.className} mb-5 border-y border-zinc-200 py-4 text-center text-[24px] leading-[1.5] md:mb-[30px] md:py-6 md:text-[36px] md:leading-[1] lg:py-8`}
        >
          The Latest
        </h5>
        <div className="flex flex-col gap-y-5 lg:px-[100px]">
          {articles.slice(1, 4).map((e: SanityDocument) => (
            <BlogPill article={e} key={e.id} />
          ))}
        </div>
      </div>
      <div className="mx-auto my-20 px-5 pb-[20px] md:max-w-[83%] md:pb-[30px] lg:max-w-[1220px]">
        <h5
          className={`${bricolage.className} mb-5 border-y border-zinc-200 bg-yellow-400 py-4 text-center text-[24px] leading-[1.5] md:mb-[30px] md:py-6 md:text-[36px] md:leading-[1] lg:py-8`}
        >
          Sign up for the latest news directly to your inbox
        </h5>
        <Email />
      </div>

      <div className="mx-auto px-5 pb-[20px] md:max-w-[100%] md:pb-[30px] lg:max-w-[1220px]">
        <div className="relative flex gap-1">
          <div className="aspect-video w-full overflow-hidden rounded-xl lg:h-[30vw] lg:w-1/2">
            <SanityImageScale
              image={urlFor(home.introContentImages[1]).url()}
              w={500}
              h={500}
              alt="change me"
              p
            />
          </div>
          <div className="aspect-video w-full overflow-hidden rounded-xl lg:h-[30vw] lg:w-1/2">
            <SanityImageScale
              image={urlFor(home.introContentImages[0]).url()}
              w={500}
              h={500}
              alt="change me"
              p
            />
          </div>
        </div>
        <div className="relative flex items-center gap-1 pt-1">
          <div className="mb-16 w-full pr-6 lg:mb-0 lg:w-1/2">
            {home.introContentHeading && (
              <div
                className={`${bricolage.className} pb-[30px] pt-[20px] text-[28px] font-bold leading-[1.12] md:pb-[40px] md:pt-[30px]`}
              >
                <PortableText value={home.introContentHeading} />
              </div>
            )}
            {home.introContentText && (
              <div className="content mb-5 max-w-[530px] text-base leading-tight lg:mb-[3vw] lg:text-lg lg:leading-tight 2xl:max-w-[740px] 2xl:text-2xl 2xl:leading-tight">
                <PortableText value={home.introContentText} />
              </div>
            )}
          </div>
          <div className="aspect-video w-full overflow-hidden rounded-xl lg:h-[30vw] lg:w-1/2">
            <SanityImageScale
              image={urlFor(home.introContentImages[2]).url()}
              w={500}
              h={500}
              alt="change me"
              p
            />
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
