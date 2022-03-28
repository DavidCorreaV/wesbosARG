export default function formatMoney(cents = 0) {
  const options = {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  };

  if (cents % 100 === 0) {
    options.minimumFractionDigits = 0;
  }
  const formatter = Intl.NumberFormat('en-US', options);
  return formatter.format(cents);
}
