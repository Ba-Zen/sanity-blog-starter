import { client, urlFor } from "@/lib/sanity";
import Container from "@/components/container";
import { SanityDocument, groq } from "next-sanity";
import Link from "next/link";
import BlogCard from "@/components/blog/blog-card";
import { bricolage } from "@/styles/fonts";
import { PortableText } from "@portabletext/react";

async function getCats() {
  const query = "*[_type == 'categories']";
  const data = await client.fetch(query);
  return data;
}

const categoryTitlesQuery = groq`*[_type == "categories"].title`;
export async function generateStaticParams() {
  const titles = (await client.fetch(categoryTitlesQuery)) as string[];
  return titles.map((title) => ({ category: title }));
}
async function getArticles(category: string) {
  const query = `*[_type == 'articles' && category->title == "${category}"]{
    ..., "id": _id,title, teaserImage, "slug": slug.current, "category": category->title
  }
`;
  const data = await client.fetch(query);
  return data;
}
export const dynamicParams = false;
export default async function CategoryPage({ params }: { params: any }) {
  const articles: SanityDocument = await getArticles(params.category);
  const cats = await getCats();
  console.log(cats);
  return (
    <div className="pt-14 md:pt-[65px] lg:md:pt-[164px]">
      <div className="mx-auto px-5 pb-[20px] md:max-w-[83%] md:pb-[30px] lg:max-w-[1220px]">
        <h1
          className={`${bricolage.className} mb-[15px] border-b border-zinc-200 pb-[30px] pt-[20px] text-center text-[32px] uppercase leading-[1.12] md:pb-[40px] md:pt-[30px] md:text-[44px] md:leading-[1.09]`}
        >
          {params.category}
        </h1>
        <PortableText value={cats.introContentText} />
        {cats.introContentHeading ? (
          <PortableText value={cats.introContentHeading} />
        ) : null}
        <div className="flex justify-center space-x-4 pt-8 md:pb-16">
          <Link
            href={`/blog`}
            className={`${bricolage.className} font-semibold first-letter:uppercase`}
          >
            All
          </Link>
          {cats.map((cat: SanityDocument, i: number) => (
            <Link
              key={i}
              href={`/blog/categories/${cat.slug.current}`}
              className={`${bricolage.className} font-semibold first-letter:uppercase`}
            >
              {cat.title}
            </Link>
          ))}
        </div>

        {articles.length ? (
          <div className="">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((e: SanityDocument) => (
                <BlogCard article={e} key={e.id} />
              ))}
            </div>
          </div>
        ) : (
          <div className="pt-8">
            <p>No articles found in this category</p>
          </div>
        )}
      </div>
    </div>
  );
}
