import Image from 'next/image'
import { client, urlFor } from '@/lib/sanity'
import Container from './container'

async function getData() {
  const query = "*[_type == 'heroImages'][0]"
  const data = await client.fetch(query)
  return data
}

export default async function Hero() {
  const data = await getData()
  return (
    <Container>
      <div className='flex flex-col justify-center pt-[12rem]'>
        <p className=''>Starter blog</p>
        <h1 className='text-7xl'>Home Page</h1>
        <div className='w-full lg:w-2/3 ml-auto'>
          {/* <Image
            src={urlFor(data.image1).url()}
            width={500}
            height={500}
            alt='change me'
            className='h-full w-full object-cover object-center'
          /> */}
        </div>
      </div>
    </Container>
  )
}
