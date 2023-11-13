'use client'
import { m, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'

interface SanityImageScaleProps {
  image: string
  p?: boolean
  w: number
  h: number
  alt?: string

  hoverState?: string
}

export default function SanityImageScale({
  image,
  p,
  w,
  h,
  alt,
  hoverState,
}: SanityImageScaleProps) {
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end 33%'],
  })

  const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1], {
    clamp: true,
  })

  return (
    <div className='relative overflow-hidden w-full h-full'>
      <m.div
        style={{ scale: scale }}
        className='will-change-transform overflow-hidden w-full h-full absolute inset-0 object-cover object-center'
      >
        <div
          ref={ref}
          className='absolute inset-0 w-full h-full'
        >
          <Image
            priority={p ? true : false}
            src={image}
            width={w}
            height={h}
            alt={alt ? alt : 'No image description'}
            className={`w-full h-full absolute inset-0 object-cover object-top transition-all ease-in-out duration-[1000ms] will-change-transform z-1 ${
              hoverState ? hoverState : ''
            }`}
          />
        </div>
      </m.div>
    </div>
  )
}
