export default {
  title: 'Home',
  name: 'home',
  type: 'document',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
    {
      title: 'Intro Content Heading',
      name: 'introContentHeading',
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
      title: 'Text ticker 1 Words',
      name: 'textTicker1Words',
      type: 'array',
      description: 'Text for sliding words. 3 or 4 max.',
      of: [
        {
          name: 'text1',
          type: 'string',
        },
      ],
    },
    {
      title: 'Text ticker 2 Words',
      name: 'textTicker2Words',
      type: 'array',
      description: 'Text for sliding words. 3 or 4 max.',
      of: [
        {
          name: 'text2',
          type: 'string',
        },
      ],
    },
  ],
}
