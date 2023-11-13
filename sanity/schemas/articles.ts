export default {
  name: 'articles',
  title: 'Articles',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Article Title',
      type: 'string',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{type: 'categories'}],
    },
    {
      name: 'postDate',
      title: 'Post Date',
      type: 'date',
      options: {
        dateFormat: 'DD-MM-YYYY',
        calendarTodayLabel: 'Today',
      },
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
