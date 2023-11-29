import { SanityDocument, groq } from "next-sanity";
import { client } from "@/lib/sanity";
import Container from "@/components/container";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { bricolage } from "@/styles/fonts";
import BlogCard from "@/components/blog/blog-card";
import { RichTextComponents } from "@/components/blocks/rich-text-components";

const articlesSlug = groq`
  *[_type == "article"]{
    slug
  }
`;

export async function generateStaticParams() {
  const slugs = (await client.fetch(articlesSlug)) as { slug: string }[];
  return slugs.map((article) => ({
    params: {
      slug: article.slug,
    },
  }));
}
export async function generateMetadata({ params: { slug } }: any) {
  try {
    const article = await client.fetch(
      groq`*[_type == "articles" && slug.current == "${slug}"][0]{
          _id,
          _createdAt,
          "id": _id,
          title, 
          //  "category": category->title,
          ...,
          _id, title,  _createdAt, mainImage,
          "slug": slug.current
      }`,
    );
    if (!article)
      return {
        title: "Not Found",
        description: "The page you are looking for does not exist.",
      };

    return {
      title: `${article.title}`,
      description: article.description,
      alternates: {
        // canonical: `https://colorcoded.studio/article/${article.slug}`,
        canonical: `/blog/${article.slug}`,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      title: "Not Found",
      description: "The page you are looking for does not exist.",
    };
  }
}
export default async function BlogSlug({ params: { slug } }: any) {
  const query = groq`
    *[_type == "articles" && slug.current == $slug][0] {
      _id,
      title,
      "category": category->title,
      "teaserImage": teaserImage.asset->url,
      body,
      "slug": slug.current,
    }
   `;
  const moreArticlesQuery = groq`
  
  *[_type == "articles" && slug.current != $slug] {
    _id,
      title,
      "category": category->title,
      "teaserImage": teaserImage.asset->url,
      body,
      "slug": slug.current,
  } 

   `;

  const article: SanityDocument = await client.fetch(query, { slug });
  const moreArticles: SanityDocument = await client.fetch(moreArticlesQuery, {
    slug,
  });

  console.log(article, "article");
  // console.log(moreArticles);
  return (
    <div className="">
      <div className="px-5 pt-24 md:pt-[95px] lg:md:pt-[140px]">
        <div className="flex flex-col items-center">
          <div className="mb-20 flex w-full border-b border-zinc-200 md:justify-between">
            <div className="h-fit w-full md:flex md:justify-between">
              <div
                className={`${bricolage.className} flex h-auto flex-col items-center justify-center gap-y-4 md:w-1/2 lg:justify-center`}
              >
                <div
                  className={`flex gap-x-2 pb-4 text-sm font-semibold uppercase text-rose-600`}
                >
                  <Link href={`/blog`}>Blog</Link>/
                  <Link href={`/blog/categories/${article.category}`}>
                    {article.category}
                  </Link>
                </div>
                <h1
                  className={`max-w-md pb-4 text-center text-3xl leading-[1] tracking-tight md:max-w-xl md:text-[4vw] lg:pb-16 2xl:text-[3.5rem]`}
                >
                  {article.title}
                </h1>
                <p className="pb-4 italic">
                  This is the description of the article
                </p>
              </div>
              <div className="w-full overflow-hidden rounded-xl md:w-1/2 xl:pb-8">
                <Image
                  src={article.teaserImage}
                  width={700}
                  height={700}
                  alt="change me"
                  className="aspect-[12/9] overflow-hidden rounded-xl object-cover md:aspect-[1/1]"
                />
              </div>
            </div>
          </div>
          <div className="flex max-w-xl flex-col gap-y-4 px-2">
            {article?.body ? (
              <PortableText
                value={article.body}
                components={RichTextComponents}
              />
            ) : null}
          </div>
          <div className="mx-auto overflow-hidden px-5 pb-[20px] pt-80 md:max-w-[83%] md:pb-[30px] lg:max-w-[1220px]">
            <div className="flex flex-col gap-y-5 lg:flex-row lg:gap-x-5">
              {moreArticles.map((e: SanityDocument) => (
                <BlogCard article={e} key={e._id} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const revalidate = 30;
