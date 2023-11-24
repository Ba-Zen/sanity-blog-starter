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
      <div className="mx-auto max-w-[1220px]">
        <h5
          className={`${bricolage.className} border-y border-zinc-200 py-4 text-center text-[24px] leading-[1.5] md:py-6 md:text-[36px] md:leading-[1] lg:py-8`}
        >
          The Latest
        </h5>
      </div>
      {/* <main className="relative z-10 bg-white">
        <article>
          <div className="relative mb-[10vw] p-[5vw] pb-[7vw] pt-8 lg:mb-[15vw] lg:pb-[33vw] lg:pr-0 lg:pt-[5vw]">
            <div className="relative flex flex-wrap">
              <div className="mb-16 w-full lg:mb-0 lg:w-1/2">
                {home.introContentHeading && (
                  <h1 className="mb-5 max-w-[100%] text-[9.5vw] uppercase leading-none text-[#FF5F38] lg:mb-[2vw] lg:text-[4vw] lg:leading-[0.9] xl:leading-[0.9]">
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

          <div className="bg-[#f3f3ed] py-[5vw] pr-0 lg:pb-[10vw]">
            <div className="px-[5vw]">
              <h2 className="mb-2 max-w-[550px] text-[9.5vw] leading-none text-[#BDB800] lg:max-w-[100%] lg:text-[6vw] lg:leading-[0.9] xl:text-[5.5vw] xl:leading-[0.9]">
                <span className="block uppercase">Latest</span>
                <span className="block uppercase">News</span>
              </h2>

              <svg
                className="mb-6 w-[50%] text-[#BDB800] lg:mb-[4vw] lg:w-[40%] lg:translate-x-[-2vw] xl:w-[33%]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 332.568 14.617"
              >
                <defs>
                  <clipPath id="a">
                    <path
                      fill="none"
                      d="M0 14.617h332.568V0H0Z"
                      data-name="Path 1260"
                    />
                  </clipPath>
                </defs>
                <g data-name="Group 565">
                  <g clipPath="url(#a)" data-name="Group 564">
                    <g data-name="Group 563">
                      <path
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeWidth="2"
                        d="M331.786.881S138.656 2.527 19.558 13.068c-31.5 2.787-13.2-4.083-15.959-4"
                        data-name="Path 1259"
                      />
                    </g>
                  </g>
                </g>
              </svg>
            </div>

            <div className="mb-[8vw] lg:mb-[5vw]">
              <ArticleCarousel items={articles} />
            </div>
          </div>
        </article>
      </main> */}
    </PageWrapper>
  );
}
