const formattingPriceOptions = { style: 'currency', currency: 'USD' };
const priceFormatter = new Intl.NumberFormat('en-US', formattingPriceOptions);

export function formatPrice(price) {
  return priceFormatter.format(price);
}
