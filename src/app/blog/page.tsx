import Image from 'next/image'
import Container from '@/components/container'
import { client, urlFor } from '@/lib/sanity'
import { Article } from '../../../interface'
import Link from 'next/link'
import { SanityDocument, groq } from 'next-sanity'

async function getArticles() {
  const query = '*[_type == "articles"].slug'
  const data = await client.fetch(query)
  return data
}

async function getCats() {
  const query = "*[_type == 'categories']"
  const data = await client.fetch(query)
  return data
}

const articlesQuery = groq`*[_type == "articles" && defined(slug.current)]{
  _id, title, slug, teaserImage, introText
}`

export const dynamicParams = false

export default async function Blog() {
  const data = await getArticles()
  const articles = await client.fetch(articlesQuery)
  // console.log(articles)
  const cats = await getCats()
  return (
    <Container>
      <h1 className='text-5xl first-letter:uppercase  font-semibold text-center  pt-20 lg:pt-[8rem]'>
        The Latest
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
      {data.length ? (
        <div className=''>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {articles.map((article: Article, i: string) => (
              <Link
                href={`/blog/${article.slug.current}`}
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
                <h3 className='text-xl/5 font-semibold py-4'>
                  {article.title}
                </h3>
                <p>{article.introText}</p>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div className='pt-8'>
          <p>No articles found in this category</p>
        </div>
      )}
    </Container>
  )
}
