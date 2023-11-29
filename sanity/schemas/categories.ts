export default {
  name: 'categories',
  title: 'Categories',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Categories Title',
      type: 'string',
    },
    {
      name: 'teaserImage',
      title: 'Teaser Image',
      type: 'image',
    },
    {
      name: 'slug',
      title: 'Categories Slug',
      type: 'slug',
      options: {source: 'title'},
    },
  ],
}
