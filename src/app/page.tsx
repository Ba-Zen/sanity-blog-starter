import Container from '@/components/container'
import Hero from '@/components/hero'
import Image from 'next/image'
import { groq } from 'next-sanity'
import { client } from '@/lib/sanity'
import { PortableText } from '@portabletext/react'
const homeQuery = groq`*[_type == 'home'][0]{
_id,title, introContentHeading, introContentImages, textTicker1Words, textTicker2Words
}`

export default async function Home() {
  const home = await client.fetch(homeQuery)
  console.log(home)
  return (
    <div>
      <div className='h-screen border border-red-500 flex justify-center items-center'>
        <h1>Making Boston Thrive</h1>
      </div>
      <div className='mt-[100vh]'>{home.title}</div>
    </div>
  )
}
