export function validExpenses(value) {
  if (!Array.isArray(value)) return []
  const ids = new Set()
  return value.filter((item) => {
    if (!item || typeof item.id !== 'string' || !item.id || ids.has(item.id)
      || typeof item.name !== 'string' || !item.name.trim()
      || typeof item.category !== 'string'
      || !Number.isFinite(item.amount) || item.amount <= 0
      || !Number.isFinite(item.createdAt) || item.createdAt < 0
      || !Number.isFinite(new Date(item.createdAt).getTime())) return false
    ids.add(item.id)
    return true
  })
}

function csvCell(value) {
  let text = String(value)
  // Quoting alone does not stop spreadsheet programs interpreting formulas.
  if (/^\s*[=+@-]|^[\t\r\n]/.test(text)) text = "'" + text
  return '"' + text.replaceAll('"', '""') + '"'
}

export function expensesCsv(expenses) {
  const rows = [['Date', 'Name', 'Category', 'Amount (INR)']]
  for (const expense of validExpenses(expenses)) {
    rows.push([new Date(expense.createdAt).toISOString(), expense.name, expense.category, expense.amount])
  }
  return '\ufeff' + rows.map((row) => row.map(csvCell).join(',')).join('\r\n') + '\r\n'
}
