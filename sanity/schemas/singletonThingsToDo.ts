export default {
  title: 'Things to Do Home',
  name: 'singletonThingsToDo',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Things to do Title',
      type: 'string',
    },
    {
      name: 'things',
      title: 'Things',
      type: 'reference',
      to: [{type: 'things'}],
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
      title: 'Things Slug',
      type: 'slug',
      options: {
        source: 'title',
      },
    },
  ],
}
