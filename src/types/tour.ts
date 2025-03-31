import type {
  BeginPlace,
  Category,
  CoverPhoto,
  Host,
  OrderOption,
  Photo,
  Review,
} from './extraTypes'

export type Tour = {
  id: string
  activity_type: 'tour' | 'entry_ticket' | 'transfer' | 'composite_activity'
  title: string
  updated_at: string
  netto_price: number
  order_options: OrderOption[]
  pay_type: 'post_pay' | 'deposit' | 'full_pay'
  pay_type_in_text: string
  deposit_amount: number
  categories: Category[]
  rating: number
  recommendation: number
  languages: string[]
  popularity: number
  description: string
  url: string
  main_photo: Photo
  cover_photo?: CoverPhoto
  what_included: string
  what_not_included: string
  customers_review_rating: number
  reviews: number
  reviews_with_text: number
  begin_place: BeginPlace
  finish_point: string
  minimum_book_period: number
  places_to_see: string[]
  short_info: string
  reviews_list?: Review[]
  country_id: string
  country_slug: string
  region_id: string
  city_id: string
  city_slug: string
  price: number
  image_small: string
  image_big: string
  duration: string
  product_type: 'shared' | 'private'
  host?: Host
}
