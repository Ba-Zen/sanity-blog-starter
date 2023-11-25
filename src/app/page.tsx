import Container from "@/components/container";
import Image from "next/image";
import { groq } from "next-sanity";
import { client, urlFor } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";
import SanityImageScale from "@/components/sanity-image-scale";
import PageWrapper from "@/components/page-wrapper";
import HomeTicker from "@/components/home-ticker";
import ArticleCarousel from "@/components/article-carousel";
import Link from "next/link";
import { bricolage } from "@/styles/fonts";
import Email from "@/components/email";
const homeQuery = groq`*[_type == 'home'][0]{
_id,title, introContentHeading, introContentText, introContentImages, textTicker1Words, textTicker2Words
}`;
const articlesQuery = groq`*[_type == 'articles']{
 ..., _id,title, teaserImage, "slug": slug.current, "category": category->title
}`;

export default async function Home() {
  const home = await client.fetch(homeQuery);
  const articles = await client.fetch(articlesQuery);
  // console.log(articles)
  return (
    <PageWrapper>
      <div className="pt-14 md:pt-[65px] lg:md:pt-[164px]">
        <div className="mx-auto px-5 pb-[20px] md:max-w-[83%] md:pb-[30px] lg:max-w-[1220px]">
          <h1
            className={`${bricolage.className} mb-[15px] border-b border-zinc-200 pb-[30px] pt-[20px] text-center text-[32px] uppercase leading-[1.12] md:pb-[40px] md:pt-[30px] md:text-[44px] md:leading-[1.09]`}
          >
            Blog Title
          </h1>
          <div className="flex flex-col border-b border-zinc-200 pb-[15px] md:pb-[40px] md:pt-[30px] lg:flex-row">
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
          </div>
        </div>
        <div className="mx-auto overflow-hidden px-5 pb-[20px] md:max-w-[83%] md:pb-[30px] lg:max-w-[1220px]">
          <div className="flex flex-col gap-y-5 lg:flex-row lg:gap-x-5">
            {articles.slice(1, 4).map((e: any, i: number) => (
              <div className="flex w-full lg:w-1/3 lg:flex-col">
                <Link
                  href={`/blog/${e.slug}`}
                  key={i}
                  className="w-[50%] lg:w-full"
                >
                  <div className="aspect-[12/9] w-full overflow-hidden bg-zinc-400">
                    {e.teaserImage && (
                      <Image
                        src={urlFor(e.teaserImage).url()}
                        alt="change me"
                        width={960}
                        height={708}
                        className="h-full w-full object-cover object-center"
                      />
                    )}
                  </div>
                </Link>
                <div className="ml-5 flex w-[100%] flex-col lg:ml-0 lg:mt-5">
                  <Link
                    href={`/blog/categories/${e.category}`}
                    className="text-[11px] font-semibold uppercase text-rose-600 md:text-xs lg:hover:underline"
                  >
                    {e.category}
                  </Link>
                  <div className="">
                    <Link href={`/blog/${e.slug}`}>
                      <h3
                        className={`${bricolage.className} mb-4 mt-2.5 text-[22px] font-semibold leading-[1.18] md:text-[24px] md:leading-[1.2] lg:text-[30px] lg:leading-[1.2] lg:hover:underline`}
                      >
                        {e.title}
                      </h3>
                      <p className="text-[19px] leading-[1.32] md:text-[20px] md:leading-[1.3]">
                        This is a description of the article.
                      </p>
                    </Link>
                  </div>
                </div>
              </div>
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
          {articles.slice(1, 4).map((e: any, i: number) => (
            <div className="flex w-full" key={i}>
              <Link href={`/blog/${e.slug}`} key={i} className="w-[50%]">
                <div className="aspect-[12/9] w-full overflow-hidden bg-zinc-400">
                  {e.teaserImage && (
                    <Image
                      src={urlFor(e.teaserImage).url()}
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
                  href={`/blog/categories/${e.category}`}
                  className="text-[11px] font-semibold uppercase text-rose-600 md:text-xs lg:hover:underline"
                >
                  {e.category}
                </Link>
                <div className="">
                  <Link href={`/blog/${e.slug}`}>
                    <h3
                      className={`${bricolage.className} mb-4 mt-2.5 text-[22px] font-semibold leading-[1.18] md:text-[24px] md:leading-[1.2] lg:text-[30px] lg:leading-[1.2] lg:hover:underline`}
                    >
                      {e.title}
                    </h3>
                    <p className="text-[19px] leading-[1.32] md:text-[20px] md:leading-[1.3]">
                      This is a description of the article.
                    </p>
                  </Link>
                </div>
              </div>
            </div>
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
            <div className="relative right-0 top-0 h-[100vw] w-full lg:absolute lg:h-[30vw] lg:w-[30vw]">
              <SanityImageScale
                image={urlFor(home.introContentImages[2]).url()}
                w={500}
                h={500}
                alt="change me"
                p
              />
            </div>
          </div>

          <div className="relative hidden w-full lg:absolute lg:bottom-[-8vw] lg:left-[30vw] lg:block lg:h-[26vw] lg:w-[38vw]">
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
          </div>
        </div>
      </div>

      {/* <div className="mb-[8vw] lg:mb-[5vw]">
        <ArticleCarousel items={articles} />
      </div> */}
    </PageWrapper>
  );
}
