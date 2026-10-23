import { useEffect, useMemo, useState } from 'react'
import BudgetForm from './components/BudgetForm.jsx'
import ExpenseForm from './components/ExpenseForm.jsx'
import ExpenseList from './components/ExpenseList.jsx'
import Summary from './components/Summary.jsx'
import { expensesCsv, validExpenses } from './expenseData.js'
import './App.css'

const BUDGET_KEY = 'budget-tracker:budget'
const EXPENSES_KEY = 'budget-tracker:expenses'

function loadBudget() {
  try {
    const raw = localStorage.getItem(BUDGET_KEY)
    const value = Number(raw)
    return Number.isFinite(value) && value > 0 ? value : 0
  } catch {
    return 0
  }
}

function loadExpenses() {
  try {
    const raw = localStorage.getItem(EXPENSES_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function makeId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  return `${Date.now()}-${Math.round(Math.random() * 1e9)}`
}

function App() {
  const [budget, setBudget] = useState(loadBudget)
  const [expenses, setExpenses] = useState(loadExpenses)
  const [storageError, setStorageError] = useState(false)

  useEffect(() => {
    try {
      localStorage.setItem(BUDGET_KEY, String(budget))
      localStorage.setItem(EXPENSES_KEY, JSON.stringify(expenses))
      setStorageError(false)
    } catch { setStorageError(true) }
  }, [budget, expenses])

  function exportExpenses() {
    const url = URL.createObjectURL(new Blob([expensesCsv(orderedExpenses)], { type: 'text/csv;charset=utf-8' }))
    const link = document.createElement('a')
    link.href = url
    link.download = 'budget-tracker-expenses.csv'
    document.body.append(link)
    link.click()
    link.remove()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
  }

  const usableExpenses = useMemo(() => validExpenses(expenses), [expenses])
  const spent = useMemo(
    () => usableExpenses.reduce((total, expense) => total + expense.amount, 0),
    [usableExpenses],
  )

  const orderedExpenses = useMemo(
    () => [...usableExpenses].sort((a, b) => b.createdAt - a.createdAt),
    [usableExpenses],
  )

  function addExpense(expense) {
    setExpenses((current) => [
      ...current,
      { ...expense, id: makeId(), createdAt: Date.now() },
    ])
  }

  function deleteExpense(id) {
    setExpenses((current) => current.filter((expense) => expense?.id !== id))
  }

  return (
    <div className="page">
      <header className="page-head">
        <h1>Budget Tracker</h1>
        <p>Track your budget and spending in this browser.</p>
      </header>

      <section className="card export-panel" aria-label="Your data">
        <p>Your budget and expenses stay in this browser. Clearing site data removes them. Export a copy of your expenses before changing devices.</p>
        <button className="btn btn-primary" type="button" disabled={!usableExpenses.length} onClick={exportExpenses}>Export expenses (.csv)</button>
      </section>
      {usableExpenses.length !== expenses.length && <p className="form-error" role="alert">Some saved entries could not be displayed. They remain in browser storage; the CSV includes valid expenses only.</p>}
      {storageError && <p className="form-error" role="alert">This browser could not save your changes. Keep this tab open and export your expenses before leaving.</p>}

      <Summary budget={budget} spent={spent} />

      <div className="forms">
        <BudgetForm budget={budget} onSave={setBudget} />
        <ExpenseForm onAdd={addExpense} />
      </div>

      <ExpenseList expenses={orderedExpenses} onDelete={deleteExpense} />
    </div>
  )
}

export default App
