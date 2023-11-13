'use client'

import { EmblaCarouselType } from 'embla-carousel-react'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import { Article } from '../../interface'
import { urlFor } from '@/lib/sanity'
import IconArrow from '../../public/icons/arrow.svg'
interface Props {
  items: Article[]
}

export default function ArticleCarousel({ items }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: 'start' })
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const onInit = useCallback((emblaApi: any) => {
    setScrollSnaps(emblaApi.scrollSnapList())
  }, [])

  const onSelect = useCallback((emblaApi: any) => {
    setSelectedIndex(emblaApi.selectedScrollSnap())
    setPrevBtnDisabled(!emblaApi.canScrollPrev())
    setNextBtnDisabled(!emblaApi.canScrollNext())
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    onInit(emblaApi)
    onSelect(emblaApi)
    emblaApi.on('reInit', onInit)
    emblaApi.on('reInit', onSelect)
    emblaApi.on('select', onSelect)

    // Cleanup event listeners when the component unmounts
    return () => {
      emblaApi.off('reInit', onInit)
      emblaApi.off('reInit', onSelect)
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi, onInit, onSelect])

  return (
    <div className='relative'>
      <button
        aria-label='Move Carousel Items Along Backwards'
        onClick={scrollPrev}
        className={`absolute top-[25vw] lg:top-[12vw] 2xl:top-[10vw] left-[5%] z-10 w-[50px] lg:w-[50px] 2xl:w-[75px] h-[50px] lg:h-[50px] 2xl:h-[75px] bg-white flex items-center justify-center rounded-full a11y-focus lg:hover:scale-[1.15]  ${
          prevBtnDisabled ? 'opacity-0' : 'opacity-100'
        } transition-all ease-in-out duration-[330ms]`}
      >
        <IconArrow className='w-[30%] block rotate-[-90deg]' />
      </button>

      <button
        aria-label='Move Carousel Items Along'
        onClick={scrollNext}
        className={`absolute top-[25vw] lg:top-[12vw] 2xl:top-[10vw] right-[5%] z-10 w-[50px] lg:w-[50px] 2xl:w-[75px] h-[50px] lg:h-[50px] 2xl:h-[75px] bg-white flex items-center justify-center rounded-full a11y-focus lg:hover:scale-[1.15] ${
          nextBtnDisabled ? 'opacity-0' : 'opacity-100'
        } transition-all ease-in-out duration-[330ms]`}
      >
        <IconArrow className='w-[30%] block rotate-90' />
      </button>

      <div
        className='embla pl-[5vw] relative mb-12 lg:mb-16 2xl:mb-20'
        ref={emblaRef}
      >
        <div className='embla__container'>
          {items.map((e: any, i: number) => {
            return (
              <div
                className="embla__slide 'pr-3 lg:pr-5"
                key={i}
              >
                <Link href={`/blog/${e.slug}`}>
                  <div className='w-full h-[60vw] lg:h-[25.5vw] 2xl:h-[23.5vw] mb-5 relative overflow-hidden'>
                    {e.teaserImage && (
                      <Image
                        src={urlFor(e.teaserImage).url()}
                        alt='change me'
                        width={500}
                        height={500}
                        className='scale-[1.0075] transition-transform ease-in-out duration-[1000ms] group-hover:scale-[1.065]'
                      />
                    )}
                  </div>

                  <div className='w-full'>
                    <span className='block leading-[1.2] lg:leading-[1.2] 2xl:leading-[1.2] mb-2 lg:mb-4 font-medium text-xl lg:text-2xl 2xl:text-3xl'>
                      {e.title}
                    </span>
                    <span className='text-base lg:text-lg 2xl:text-xl leading-none lg:leading-none 2xl:leading-none border-b border-off-black border-opacity-25 inline-block pb-1'>
                      Read More
                    </span>
                  </div>
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
