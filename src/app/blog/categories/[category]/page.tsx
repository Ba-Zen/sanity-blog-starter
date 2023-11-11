import { client } from '@/lib/sanity'
import { simplifiedProduct } from '../../../../../interface'

async function getData(category: string) {
  const query = `*[_type == 'product' && category->title == "${category}"]{
    _id,
      "imageUrl": images[0].asset->url,
      price,
      title,
      "slug": slug.current,
      "categoryName": category->title
  }  
  `

  const data = await client.fetch(query)

  return data
}

export default async function CategoryPage({
  params,
}: {
  params: { category: string }
}) {
  const data: simplifiedProduct[] = await getData(params.category)

  return (
    <div>
      {params.category}
      {data.map((product, i) => (
        <h1>{product.title}</h1>
      ))}
    </div>
  )
}
