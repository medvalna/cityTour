export const formatPrice = (price: string): string => {
  if (!price.match('.00')) {
    return price
  }
  const currency = price.toString().split('.00')[1]
  const formattedPrice = price.toString().split('.')[0]
  const formattedWithSpaces = formattedPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  return formattedWithSpaces + currency
}
