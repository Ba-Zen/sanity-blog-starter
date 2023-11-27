export default {
  title: 'Attractions Home',
  name: 'singletonAttractions',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Attractions Title',
      type: 'string',
    },
    {
      name: 'attractionCats',
      title: 'Attraction Category',
      type: 'reference',
      to: [{type: 'attractionCats'}],
    },
    {
      title: 'Intro Content Heading',
      name: 'introContentHeading',
      type: 'contentSimple',
    },
    {
      title: 'Intro Content Text',
      name: 'introContentText',
      type: 'contentSimple',
    },
    {
      title: 'Intro Content Images',
      name: 'introContentImages',
      type: 'array',
      description: 'The three images on the home landing. Placed left to right',
      of: [
        {
          title: 'Image',
          name: 'image',
          type: 'image',
        },
      ],
      options: {
        layout: 'grid',
      },
    },
    {
      name: 'slug',

      type: 'slug',
      options: {
        source: 'title',
      },
    },
  ],
}
