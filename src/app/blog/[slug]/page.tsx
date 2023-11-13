import { SanityDocument, groq } from 'next-sanity'
import { client } from '@/lib/sanity'
import Container from '@/components/container'
import Image from 'next/image'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
const articlesSlug = groq`
  *[_type == "article"]{
    slug
  }
`

export async function generateStaticParams() {
  const slugs = (await client.fetch(articlesSlug)) as { slug: string }[]
  return slugs.map((article) => ({
    params: {
      slug: article.slug,
    },
  }))
}

export default async function BlogSlug({ params: { slug } }: any) {
  const query = groq`
    *[_type == "articles" && slug.current == $slug][0] {
      _id,
      title,
      "category": category->title,
      "teaserImage": teaserImage.asset->url,
      body,
      "slug": slug.current,
    }
  `

  const article: SanityDocument = await client.fetch(query, { slug })
  // console.log(article, 'article')

  return (
    <Container>
      <div className='pt-12 lg:pt-[4rem]'>
        <div className='flex flex-col items-center'>
          <div className='flex flex-col items-center w-full font-semibold pb-12 md:pb-16'>
            <div className='flex gap-2 pb-4 lg:pb-16 text-sm uppercase'>
              <Link href={`/blog`}>Blog</Link>/
              <Link href={`/blog/categories/${article.category}`}>
                {article.category}
              </Link>
            </div>
            <h1 className='text-3xl md:text-[4vw] 2xl:text-[5rem] pb-4 lg:pb-16 font-semibold tracking-tight leading-[1]'>
              {article.title}
            </h1>

            <Image
              src={article.teaserImage}
              width={700}
              height={700}
              alt='change me'
              className='rounded-xl aspect-[4/3] object-cover'
            />
          </div>
          <div className='flex flex-col px-2 gap-y-4 max-w-xl'>
            {article?.body ? <PortableText value={article.body} /> : null}
          </div>
        </div>
      </div>
    </Container>
  )
}

export const revalidate = 30
