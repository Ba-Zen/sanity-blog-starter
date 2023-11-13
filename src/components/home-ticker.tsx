'use client'
import { useRef } from 'react'
import { m, useScroll, useTransform } from 'framer-motion'

interface TickerProps {
  textTicker1Words: string[]
  textTicker2Words: string[]
}
export default function HomeTicker({
  textTicker1Words,
  textTicker2Words,
}: TickerProps) {
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  console.log(scrollYProgress)
  const x = useTransform(scrollYProgress, [0, 1], ['-100%', '75%'], {
    clamp: true,
  })
  const x2 = useTransform(scrollYProgress, [0, 1], ['-25%', '-100%'], {
    clamp: true,
  })
  console.log('Words', textTicker2Words)
  return (
    <div className='mb-[10vw] border border-red-500 lg:mb-[5vw]'>
      <div className='relative flex overflow-hidden text-[17vw] lg:text-[10vw] leading-[0] uppercase'>
        <m.div
          //   style={{ x: x }}
          className='will-change-transform whitespace-nowrap'
        >
          {textTicker1Words.map((e, i) => {
            return (
              <span
                key={i}
                className={`relative overflow-hidden ${
                  i % 2 === 0 ? 'font-display italic' : ''
                }`}
              >
                {e}
                <span className='inline-block w-[17vw] lg:w-[10vw] translate-y-[-9%] ml-2'>
                  icon
                  {/* <IconSmile className='inline-block animate-spin-slow aspect-square-reverse' /> */}
                </span>
              </span>
            )
          })}
          {textTicker1Words.map((e, i) => {
            return (
              <span
                key={i}
                className={`relative overflow-hidden ${
                  i % 2 === 0 ? 'font-display italic' : ''
                }`}
              >
                {e}
                <span className='inline-block w-[17vw] lg:w-[10vw] translate-y-[-9%] ml-2'>
                  icon
                  {/* <IconSmile className='inline-block animate-spin-slow aspect-square-reverse' /> */}
                </span>
              </span>
            )
          })}
        </m.div>
      </div>

      <div className='relative flex overflow-hidden text-[17vw] leading-[0] lg:text-[10vw] lg:leading-[0] uppercase mt-[-1vw]'>
        <m.div
          //   style={{ x: x2 }}
          className='will-change-transform whitespace-nowrap'
        >
          {textTicker2Words.map((e, i) => {
            return (
              <span
                key={i}
                className={`relative overflow-hidden ${
                  i % 2 === 0 ? 'font-display italic' : ''
                }`}
              >
                {e}
                <span className='inline-block w-[17vw] lg:w-[10vw] translate-y-[-9%] ml-2'>
                  icon
                  {/* <IconSmile className='inline-block animate-spin-slow aspect-square-reverse' /> */}
                </span>
              </span>
            )
          })}
          {textTicker2Words.map((e, i) => {
            return (
              <span
                key={i}
                className={`relative overflow-hidden ${
                  i % 3 === 0 ? 'font-display italic' : ''
                }`}
              >
                {e}
                <span className='inline-block w-[17vw] lg:w-[10vw] translate-y-[-9%] ml-2'>
                  icon
                  {/* <IconSmile className='inline-block animate-spin-slow aspect-square-reverse' /> */}
                </span>
              </span>
            )
          })}
          {textTicker2Words.map((e, i) => {
            return (
              <span
                key={i}
                className={`relative overflow-hidden ${
                  i % 3 === 0 ? 'font-display italic' : ''
                }`}
              >
                {e}
                <span className='inline-block w-[17vw] lg:w-[10vw] translate-y-[-9%] ml-2'>
                  icon
                  {/* <IconSmile className='inline-block animate-spin-slow aspect-square-reverse' /> */}
                </span>
              </span>
            )
          })}
        </m.div>
      </div>
    </div>
  )
}
