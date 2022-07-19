const CURRENCY_FORMATTER = new Intl.NumberFormat("en-HOSSDDG", {
  currency: 'USD',
  style: 'currency'
})

export const formatCurrency = (number:number) => {
  return CURRENCY_FORMATTER.format(number);
}