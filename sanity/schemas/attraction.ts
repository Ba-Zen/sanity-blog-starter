export default {
  name: 'attraction',
  title: 'Attraction',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Attraction Title',
      type: 'string',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{type: 'attractionCats'}],
    },
    {
      name: 'teaserImage',
      title: 'Teaser Image',
      type: 'image',
      description: 'Image teaser on home and blog page on a news grid.',
    },
    {
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    },
    {
      name: 'introText',
      title: 'Intro Text',
      type: 'text',
      rows: 4,
    },
    {
      name: 'slug',
      title: 'Product Slug',
      type: 'slug',
      options: {
        source: 'title',
      },
    },
  ],
}
