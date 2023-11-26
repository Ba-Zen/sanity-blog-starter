export default {
  name: 'things',
  title: 'Things',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Things Title',
      type: 'string',
    },
    {
      name: 'teaserImage',
      title: 'Teaser Image',
      type: 'image',
      description: 'Image teaser on home and blog page on a news grid.',
    },
    {
      name: 'slug',
      title: 'Things Slug',
      type: 'slug',
      options: {source: 'title'},
    },
  ],
}
