export type CurrencyPrices = {
  RUB?: number
  UAH?: number
  USD?: number
  EUR?: number
  BYN?: number
  KZT?: number
}

export type Discount = {
  value: number
  expiration_date: string
  expiration_text: string
  original_price: number
}

export type OrderLine = {
  price: number
  discount?: Discount
  all_prices: CurrencyPrices
  netto_prices: CurrencyPrices
  all_amounts_to_pay: CurrencyPrices
  price_per: string
  title: string
  offer_type: 'base'
  countable: boolean
  start_date: number
  from_quantity: number
  to_quantity: number
}

export type Schedule = {
  id: null
  name: string
}

export type OrderOption = {
  id: string
  title: string
  ticket_type:
    | 'group_tour, ticket_per_person'
    | 'private_tour, ticket_per_group'
    | 'private_tour, ticket_per_person'
  is_base: boolean
  duration: string | number
  order_lines: OrderLine[]
  schedule: Schedule[]
}

export type Category = {
  id: string
  slug: string
  language: string
  short_name: string
  description?: string
  name: string
}

export type Photo = {
  original: string
  small: string
  big: string
  name: string
}

export type CoverPhoto = Photo & {
  wide: string
}

export type BeginPlace = {
  address: string
  address_existing: false
  address_comment: ''
}

export type Review = {
  activity_id: string
  content: string
  rating: number
  name: string
  date: string
}

export type Host = {
  id: string
  name: string
  photo: string
  review_rating: number
  link: string
}
