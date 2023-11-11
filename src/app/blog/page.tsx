import Container from '@/components/container'
import Image from 'next/image'

export default function Blog() {
  return (
    <Container>
      <div className='flex flex-col justify-center pt-[12rem]'>
        <p className=''>Starter blog</p>
        <h1 className='text-7xl'>Blog Home</h1>
      </div>
    </Container>
  )
}
