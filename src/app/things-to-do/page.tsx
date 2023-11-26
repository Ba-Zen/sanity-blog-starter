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
const homeQuery = groq`*[_type == 'singletonThingsToDo'][0]{
_id,title, introContentHeading, introContentText, introContentImages
}`;
const thingsQuery = groq`*[_type == 'things']{
 ..., "id": _id,title, "slug": slug.current, teaserImage
}`;

export default async function Home() {
  const home = await client.fetch(homeQuery);
  const things = await client.fetch(thingsQuery);
  console.log(things);
  return (
    <PageWrapper>
      <div className="pt-14 md:pt-[65px] lg:md:pt-[164px]">
        <div className="mx-auto px-5 pb-[20px] md:max-w-[83%] md:pb-[30px] lg:max-w-[1220px]">
          <h1
            className={`${bricolage.className} mb-[15px] border-b border-zinc-200 pb-[30px] pt-[20px] text-center text-[32px] uppercase leading-[1.12] md:pb-[40px] md:pt-[30px] md:text-[44px] md:leading-[1.09]`}
          >
            {home.title}
          </h1>
          <div className="mx-auto pb-[20px] md:pb-[30px] lg:max-w-[1220px]">
            <div className="grid grid-cols-2 gap-2 lg:grid-cols-4 lg:gap-6">
              {things.map((e: SanityDocument) => (
                <div
                  className={
                    "relative col-span-1 flex h-full  w-full flex-col items-center justify-center"
                  }
                  key={e._id}
                >
                  {e.teaserImage ? (
                    <Image
                      alt={e.title}
                      src={urlFor(e.teaserImage).url()}
                      width={500}
                      height={500}
                      className="aspect-[12/9] object-cover object-top md:aspect-square"
                    />
                  ) : (
                    <div className="aspect-[12/9] h-full w-full bg-zinc-200 md:aspect-square"></div>
                  )}
                  <h2>{e.title}</h2>
                </div>
              ))}
            </div>
          </div>
          {/* <div className="flex flex-col border-b border-zinc-200 pb-[15px] md:pb-[40px] md:pt-[30px] lg:flex-row">
            <Link href={`/blog/${articles[3].slug}`} className="lg:w-[50%]">
              <div className=" aspect-[12/9] overflow-hidden bg-zinc-400">
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
                   {articles[3].title}
                </h2>
              </Link>
              <p className="text-[19px] leading-[1.32] md:text-[20px] md:leading-[1.3]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem
                expedita magnam omnis tempore ratione delectus adipisci quos
                minima cum sunt mollitia repudiandae.
              </p>
            </div>
          </div> */}
        </div>
        <div className="mx-auto overflow-hidden px-5 pb-[20px] md:max-w-[83%] md:pb-[30px] lg:max-w-[1220px]">
          {/* <div className="flex flex-col gap-y-5 lg:flex-row lg:gap-x-5">
            {things.map((e: SanityDocument) => (
              <BlogCard article={e} key={e.id} />
            ))}
          </div> */}
        </div>
      </div>
      <div className="mx-auto px-5 pb-[20px] md:max-w-[83%] md:pb-[30px] lg:max-w-[1220px]">
        <h5
          className={`${bricolage.className} mb-5 border-y border-zinc-200 py-4 text-center text-[24px] leading-[1.5] md:mb-[30px] md:py-6 md:text-[36px] md:leading-[1] lg:py-8`}
        >
          The Latest
        </h5>
        {/* <div className="flex flex-col gap-y-5 lg:px-[100px]">
          {things.slice(1, 4).map((e: SanityDocument) => (
            <BlogPill article={e} key={e.id} />
          ))}
        </div> */}
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
        <div className="relative mb-[10vw] p-[5vw] pb-[7vw] pt-8 lg:mb-[15vw] lg:px-0 lg:pb-[33vw] lg:pr-0 lg:pt-[5vw]">
          <div className="relative flex flex-wrap">
            <div className="mb-16 w-full lg:mb-0 lg:w-1/2">
              {home.introContentHeading && (
                <h1 className="mb-5 max-w-[100%] text-[9.5vw] uppercase leading-none text-[#FF5F38] md:text-[7vw] lg:mb-[2vw] lg:text-[4vw] lg:leading-[0.9] xl:leading-[0.9]">
                  <PortableText value={home.introContentHeading} />
                </h1>
              )}
              {home.introContentText && (
                <div className="content mb-5 max-w-[530px] text-base leading-tight lg:mb-[3vw] lg:text-lg lg:leading-tight 2xl:max-w-[740px] 2xl:text-2xl 2xl:leading-tight">
                  <PortableText value={home.introContentText} />
                </div>
              )}
            </div>
            {/* <div className="relative right-0 top-0 h-[100vw] w-full lg:absolute lg:h-[30vw] lg:w-[30vw]">
              <SanityImageScale
                image={urlFor(home.introContentImages[2]).url()}
                w={500}
                h={500}
                alt="change me"
                p
              />
            </div> */}
          </div>

          {/* <div className="relative hidden w-full lg:absolute lg:bottom-[-8vw] lg:left-[30vw] lg:block lg:h-[26vw] lg:w-[38vw]">
            <SanityImageScale
              image={urlFor(home.introContentImages[1]).url()}
              w={500}
              h={500}
              alt="change me"
              p
            />
          </div>

          <div className="relative hidden w-full lg:absolute lg:bottom-[8vw] lg:left-0 lg:block lg:h-[19vw] lg:w-[25vw]">
            <SanityImageScale
              image={urlFor(home.introContentImages[0]).url()}
              w={500}
              h={500}
              alt="change me"
              p
            />
          </div> */}
        </div>
      </div>
    </PageWrapper>
  );
}
