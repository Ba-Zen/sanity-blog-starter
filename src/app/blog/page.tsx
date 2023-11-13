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
const articlesQuery = groq`*[_type == "articles" && defined(slug.current)]{
  _id, title, slug, teaserImage
}`
const articlePathsQuery = groq`*[_type == "articles" && defined(slug.current)][]{
  "params": { "slug": slug.current }
}`

export default async function Blog() {
  const data = await getArticles()
  const articles = await client.fetch(articlesQuery)
  console.log(articles)
  return (
    <Container>
      <h1 className='text-5xl first-letter:uppercase py-8'>Blog Home</h1>
      {data.length ? (
        <div className=''>
          <div className='grid grid-cols-3'>
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
                  className='aspect-square object-cover'
                />
                <h1>{article.title}</h1>
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
