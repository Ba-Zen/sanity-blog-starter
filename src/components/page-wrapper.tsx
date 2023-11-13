'use client'
import { LazyMotion, domAnimation, m } from 'framer-motion'
export default function PageWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <LazyMotion features={domAnimation}>
      <m.div
        initial='initial'
        animate='enter'
        exit='exit'
      >
        {children}
      </m.div>
    </LazyMotion>
  )
}
