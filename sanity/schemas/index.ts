import product from './product'
import categories from './categories'

import articles from './articles'
import blockContent from './blockContent'
import contentSimple from './contentSimple'
import singletonHome from './singletonHome'
import singletonThingsToDo from './singletonThingsToDo'
import things from './things'

const documents = [product, categories, articles, singletonHome, singletonThingsToDo, things]
const objects = [blockContent, contentSimple]

export const schemaTypes = [...documents, ...objects]
