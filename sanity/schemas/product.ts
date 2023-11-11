export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Product Title',
      type: 'string',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{type: 'categories'}],
    },
    {
      name: 'images',
      title: 'Product Images',
      type: 'array',
      of: [{type: 'image'}],
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'slug',
      title: 'Product Slug',
      type: 'slug',
      options: {
        source: 'title',
      },
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
    },
  ],
}
