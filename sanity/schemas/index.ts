import product from './product'
import categories from './categories'

import articles from './articles'
import blockContent from './blockContent'

const documents = [product, categories, articles]
const objects = [blockContent]

export const schemaTypes = [...documents, ...objects]
