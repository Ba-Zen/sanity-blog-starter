import Image from 'next/image'
import Container from '@/components/container'
import { client, urlFor } from '@/lib/sanity'
import { Article } from '../../../interface'

async function getArticles() {
  const query = '*[_type == "articles"]'
  const data = await client.fetch(query)
  return data
}

export default async function Blog() {
  const data = await getArticles()
  // console.log(data.length)
  return (
    <Container>
      <h1 className='text-5xl first-letter:uppercase py-8'>Blog Home</h1>
      {data.length ? (
        <div className=''>
          <div className='grid grid-cols-3'>
            {data.map((article: Article, i: string) => (
              <div
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
              </div>
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
