export interface Article {
  _id: string
  title: string
  category: string
  introText: string
  teaserImage: string
  body: string
  slug: {
    current: string
  }
}

export interface fullProduct {
  _id: string
  imageUrl: string
  price: number
  slug: string
  categoryName: string
  title: string
  description: string
}
