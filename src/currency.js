const formatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 2,
})

export function formatRupees(amount) {
  const safe = Number.isFinite(amount) ? amount : 0
  return formatter.format(safe)
}
