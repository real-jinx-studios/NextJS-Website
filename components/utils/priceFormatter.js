const CURRENCY_FORAMTTER = new Intl.NumberFormat(undefined, {
  currency: "EUR",
  style: "currency",
});

export default function priceFormatter(number) {
  return CURRENCY_FORAMTTER.format(number / 100);
}
