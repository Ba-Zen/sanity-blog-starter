import { client, urlFor } from '@/lib/sanity'
import { Article } from '../../../../../interface'
import { notFound } from 'next/navigation'
import Container from '@/components/container'
import Image from 'next/image'
import { SanityDocument, groq } from 'next-sanity'
import Link from 'next/link'

async function getCats() {
  const query = "*[_type == 'categories']"
  const data = await client.fetch(query)
  return data
}

const categoryTitlesQuery = groq`*[_type == "categories"].title`
export async function generateStaticParams() {
  const titles = (await client.fetch(categoryTitlesQuery)) as string[]
  return titles.map((title) => ({ category: title }))
}
async function getArticles(category: string) {
  const query = `*[_type == 'articles' && category->title == "${category}"]{
    _id,
    title,
    "category": category->title,
      "teaserImage": teaserImage.asset->url,
      "slug": slug.current,
  }
`
  const data = await client.fetch(query)
  return data
}
export const dynamicParams = false
export default async function CategoryPage({ params }: { params: any }) {
  const data: Article[] = await getArticles(params.category)
  // console.log('data', data)
  const cats = await getCats()

  return (
    <Container>
      <h1 className='text-5xl first-letter:uppercase  font-semibold text-center  pt-20 lg:pt-[8rem]'>
        {params.category}
      </h1>
      <div className='flex space-x-4 justify-center pt-8 md:pb-16'>
        <Link
          href={`/blog`}
          className='first-letter:uppercase'
        >
          All
        </Link>
        {cats.map((cat: SanityDocument, i: number) => (
          <Link
            key={i}
            href={`/blog/categories/${cat.slug.current}`}
            className='first-letter:uppercase'
          >
            {cat.title}
          </Link>
        ))}
      </div>

      {data.length > 0 ? (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {data.map((article, i) => (
            <Link
              href={`/blog/${article.slug}`}
              key={i}
              className='px-6 py-8 border col-span-1'
            >
              <Image
                src={urlFor(article.teaserImage).url()}
                width={500}
                height={500}
                alt='change me'
                className='aspect-square object-cover rounded-md'
              />
              <h3 className='text-xl/5 font-semibold py-4'>{article.title}</h3>
              <p>{article.introText}</p>
            </Link>
          ))}
        </div>
      ) : (
        <div className='pt-8'>
          <p>No articles found in this category</p>
        </div>
      )}
    </Container>
  )
}
