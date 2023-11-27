export default {
  name: 'attractionCats',
  title: 'Attraction Category',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Attraction Title',
      type: 'string',
    },
    {
      name: 'teaserImage',
      title: 'Teaser Image',
      type: 'image',
    },
    {
      name: 'slug',
      type: 'slug',
      options: {source: 'title'},
    },
  ],
}
