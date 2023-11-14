import Container from '@/components/container'
import Image from 'next/image'
import { groq } from 'next-sanity'
import { client, urlFor } from '@/lib/sanity'
import { PortableText } from '@portabletext/react'
import SanityImageScale from '@/components/sanity-image-scale'
import PageWrapper from '@/components/page-wrapper'
import HomeTicker from '@/components/home-ticker'
import ArticleCarousel from '@/components/article-carousel'

const homeQuery = groq`*[_type == 'home'][0]{
_id,title, introContentHeading, introContentText, introContentImages, textTicker1Words, textTicker2Words
}`
const articlesQuery = groq`*[_type == 'articles']{
_id,title, teaserImage, "slug": slug.current
}`

export default async function Home() {
  const home = await client.fetch(homeQuery)
  const articles = await client.fetch(articlesQuery)
  console.log(articles)
  return (
    <PageWrapper>
      <div className='overflow-hidden flex items-center justify-center relative lg:sticky lg:top-0 h-screen'>
        <div>
          <span className='block text-[13.5vw] lg:text-[12vw] leading-[1.2] lg:leading-[1.2] overflow-hidden'>
            <span className='block'>Making</span>
          </span>
          <span className='block text-[13.5vw] lg:text-[12vw] leading-[1.2] lg:leading-[1.2] overflow-hidden'>
            <span className='block'>Boston</span>
          </span>
          <span className='block text-[13.5vw] lg:text-[12vw] leading-[1.2] lg:leading-[1.2] overflow-hidden font-display italic'>
            <span className='block'>Thrive</span>
          </span>

          <div className='w-full'>
            <svg
              className='w-[60%] mx-auto mt-2 mb-8 lg:mb-0'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 1054.61 41.078'
            >
              <path
                stroke='currentColor'
                fill='none'
                strokeLinecap='round'
                strokeWidth='5'
                d='M1052.091 2.519S439.691 7.143 62.04 36.748c-99.9 7.827-41.862-11.468-50.6-11.237'
                data-name='Path 1259'
              />
            </svg>
          </div>
        </div>
      </div>

      <main className='mt-[100vh] relative z-10 bg-white'>
        <article>
          <div className='p-[5vw] pt-8 lg:pr-0 pb-[7vw] mb-[10vw] lg:mb-[15vw] lg:pb-[33vw] lg:pt-[5vw] relative'>
            <div className='flex flex-wrap relative'>
              <div className='w-full lg:w-1/2 mb-16 lg:mb-0'>
                {home.introContentHeading && (
                  <h1 className='text-[9.5vw] leading-none lg:text-[4vw] lg:leading-[0.9] xl:leading-[0.9] uppercase text-[#FF5F38] max-w-[100%] mb-5 lg:mb-[2vw]'>
                    <PortableText value={home.introContentHeading} />
                  </h1>
                )}
                {home.introContentText && (
                  <div className='content mb-5 lg:mb-[3vw] text-base leading-tight lg:text-lg lg:leading-tight 2xl:text-2xl 2xl:leading-tight max-w-[530px] 2xl:max-w-[740px]'>
                    <PortableText value={home.introContentText} />
                  </div>
                )}
              </div>
              <div className='w-full lg:w-[30vw] h-[100vw] lg:h-[30vw] relative lg:absolute top-0 right-0'>
                {/* <Image
                  src={urlFor(home.introContentImages[2]).url()}
                  width={500}
                  height={500}
                  alt='change me'
                  className='object-cover rounded-md'
                /> */}
                <SanityImageScale
                  image={urlFor(home.introContentImages[2]).url()}
                  w={500}
                  h={500}
                  alt='change me'
                  p
                />
              </div>
            </div>

            <div className='w-full lg:w-[38vw] lg:h-[26vw] relative lg:absolute lg:bottom-[-8vw] lg:left-[30vw] hidden lg:block'>
              {/* <Image
                src={urlFor(home.introContentImages[1]).url()}
                width={500}
                height={500}
                alt='change me'
                className='object-cover rounded-md'
              /> */}
              <SanityImageScale
                image={urlFor(home.introContentImages[1]).url()}
                w={500}
                h={500}
                alt='change me'
                p
              />
            </div>

            <div className='w-full lg:w-[25vw] lg:h-[19vw] relative lg:absolute lg:bottom-[8vw] lg:left-0 hidden lg:block'>
              {/* <Image
                src={urlFor(home.introContentImages[0]).url()}
                width={500}
                height={500}
                alt='change me'
                className='object-cover rounded-md'
              /> */}
              <SanityImageScale
                image={urlFor(home.introContentImages[0]).url()}
                w={500}
                h={500}
                alt='change me'
                p
              />
            </div>
          </div>

          {/* <HomeTicker
            textTicker1Words={home.textTicker1Words}
            textTicker2Words={home.textTicker2Words}
          /> */}
          <div className='py-[5vw] pr-0 lg:pb-[10vw] bg-[#f3f3ed]'>
            <div className='px-[5vw]'>
              <h2 className='text-[9.5vw] leading-none lg:text-[6vw] lg:leading-[0.9] xl:text-[5.5vw] xl:leading-[0.9] max-w-[550px] lg:max-w-[100%] text-[#BDB800] mb-2'>
                <span className='uppercase block'>Latest</span>
                <span className='uppercase block'>News</span>
              </h2>

              {/* <IconSquiggleUnderline className="w-[50%] lg:w-[40%] xl:w-[33%] text-[#BDB800] lg:translate-x-[-2vw] mb-[4vw]" /> */}

              <svg
                className='w-[50%] lg:w-[40%] xl:w-[33%] text-[#BDB800] lg:translate-x-[-2vw] mb-6 lg:mb-[4vw]'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 332.568 14.617'
              >
                <defs>
                  <clipPath id='a'>
                    <path
                      fill='none'
                      d='M0 14.617h332.568V0H0Z'
                      data-name='Path 1260'
                    />
                  </clipPath>
                </defs>
                <g data-name='Group 565'>
                  <g
                    clip-path='url(#a)'
                    data-name='Group 564'
                  >
                    <g data-name='Group 563'>
                      <path
                        fill='none'
                        stroke='currentColor'
                        stroke-linecap='round'
                        stroke-width='2'
                        d='M331.786.881S138.656 2.527 19.558 13.068c-31.5 2.787-13.2-4.083-15.959-4'
                        data-name='Path 1259'
                      />
                    </g>
                  </g>
                </g>
              </svg>

              {/* <svg className="w-[50%] lg:w-[40%] xl:w-[33%] text-[#BDB800] lg:translate-x-[-2vw] mb-6 lg:mb-[4vw]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1054.61 41.078">
                    <path  stroke="currentColor" fill="none" strokeLinecap="round" strokeWidth="5" d="M1052.091 2.519S439.691 7.143 62.04 36.748c-99.9 7.827-41.862-11.468-50.6-11.237" data-name="Path 1259"/>
                  </svg> */}
            </div>

            <div className='mb-[8vw] lg:mb-[5vw]'>
              <ArticleCarousel items={articles} />
            </div>

            {/* <div className='lg:text-center px-4 lg:px-0 pb-5 lg:pb-0'>
                  <Button
                    href='/news'
                    label='View More News'
                    className='block w-full lg:w-1/3'
                    large
                  />
                </div> */}
          </div>
        </article>
      </main>
    </PageWrapper>
  )
}
