import { client, urlFor } from '@/lib/sanity'
import { Article } from '../../../../../interface'
import { notFound } from 'next/navigation'
import Container from '@/components/container'
import Image from 'next/image'
import { groq } from 'next-sanity'

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
  return (
    <Container>
      <h1 className='text-5xl first-letter:uppercase py-8'>
        {params.category}
      </h1>

      {data.length > 0 ? (
        <div className='grid grid-cols-3'>
          {data.map((article, i) => (
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
      ) : (
        <div className='pt-8'>
          <p>No articles found in this category</p>
        </div>
      )}
    </Container>
  )
}
