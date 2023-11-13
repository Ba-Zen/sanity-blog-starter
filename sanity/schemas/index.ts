import product from './product'
import categories from './categories'

import articles from './articles'
import blockContent from './blockContent'
import contentSimple from './contentSimple'
import singletonHome from './singletonHome'

const documents = [product, categories, articles, singletonHome]
const objects = [blockContent, contentSimple]

export const schemaTypes = [...documents, ...objects]
