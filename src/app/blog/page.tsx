import Container from '@/components/container'
import Link from 'next/link'

const links = [
  { title: 'Productivity', href: '/blog/categories/productivity' },
  { title: 'Templates', href: '/blog/categories/templates' },
  { title: 'Wallpapers', href: '/blog/categories/wallpapers' },
]

export default function Blog() {
  return (
    <Container>
      <div className='flex flex-col justify-center pt-[12rem]'>
        <div className='flex space-x-4 '>
          {links.map((link, i) => (
            <Link
              key={i}
              href={link.href}
            >
              {link.title}
            </Link>
          ))}
        </div>
        <div className='lg:pt-[12rem] pt-20'>
          <p className=''>Starter blog</p>
          <h1 className='text-7xl'>Blog Home</h1>
        </div>
      </div>
    </Container>
  )
}
