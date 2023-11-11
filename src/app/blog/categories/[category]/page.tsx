import { client, urlFor } from '@/lib/sanity'
import { simplifiedProduct } from '../../../../../interface'
import NotFound from '@/app/[404]/page'
import { notFound } from 'next/navigation'
import Container from '@/components/container'
import Image from 'next/image'

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
    <Container>
      {data.length ? (
        <div className='pt-8'>
          <h1 className='text-5xl first-letter:uppercase pb-8'>
            {params.category}
          </h1>
          <div className='grid grid-cols-3'>
            {data.map((product, i) => (
              <div className='px-6 py-8 border col-span-1'>
                <h1 key={i}>{product.title}</h1>
                {/* <Image
                  src={urlFor(product.imageUrl).url()}
                  width={500}
                  height={500}
                  alt='change me'
                /> */}
              </div>
            ))}
          </div>
        </div>
      ) : (
        notFound()
      )}
    </Container>
  )
}
