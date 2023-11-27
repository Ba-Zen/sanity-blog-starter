import product from './product'
import categories from './categories'

import articles from './articles'
import blockContent from './blockContent'
import contentSimple from './contentSimple'
import singletonHome from './singletonHome'
import singletonAttractions from './singletonAttractions'
import attractionCats from './attractionCats'
import attraction from './attraction'

const documents = [
  product,
  categories,
  articles,
  singletonHome,
  attraction,
  singletonAttractions,
  attractionCats,
]
const objects = [blockContent, contentSimple]

export const schemaTypes = [...documents, ...objects]
