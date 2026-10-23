import test from 'node:test'
import assert from 'node:assert/strict'
import { expensesCsv, validExpenses } from '../src/expenseData.js'

const expense = { id: 'one', name: 'Bus fare', category: 'Transport', amount: 42.5, createdAt: 1700000000000 }

test('damaged saved entries cannot break totals, sorting or date export', () => {
  assert.deepEqual(validExpenses([null, expense, { ...expense }, { ...expense, id: 'bad', amount: '42' }, { ...expense, id: 'infinite', amount: Infinity }, { ...expense, id: 'date', createdAt: 1e30 }]), [expense])
  assert.deepEqual(validExpenses({}), [])
})

test('CSV retains decimal amounts and escapes quotes, commas and line breaks', () => {
  const csv = expensesCsv([{ ...expense, name: 'Tea, "large"\nand snack' }])
  assert.ok(csv.startsWith('\ufeff"Date","Name","Category","Amount (INR)"\r\n'))
  assert.ok(csv.includes('"Tea, ""large""\nand snack"'))
  assert.ok(csv.includes('"42.5"'))
})

test('user text cannot become a spreadsheet formula', () => {
  for (const name of ['=1+1', '+SUM(1,2)', '-1+2', '@SUM(1)', '  =1+1', '\t=1+1']) {
    assert.ok(expensesCsv([{ ...expense, name }]).includes('"\'' + name + '"'))
  }
})
