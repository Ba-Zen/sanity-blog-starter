import { groq } from 'next-sanity'
import { client } from '@/lib/sanity'
import { Article } from '../../../../interface'
import Container from '@/components/container'

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
      "slug": slug.current,
    }
  `

  const article: Article = await client.fetch(query, { slug })
  console.log(article, 'article')

  return (
    <Container>
      <h1>{article.title}</h1>
      {/* Render other parts of the article as needed */}
    </Container>
  )
}

export const revalidate = 30
