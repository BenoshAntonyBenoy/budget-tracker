import { useEffect, useMemo, useState } from 'react'
import BudgetForm from './components/BudgetForm.jsx'
import ExpenseForm from './components/ExpenseForm.jsx'
import ExpenseList from './components/ExpenseList.jsx'
import Summary from './components/Summary.jsx'
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

  useEffect(() => {
    localStorage.setItem(BUDGET_KEY, String(budget))
  }, [budget])

  useEffect(() => {
    localStorage.setItem(EXPENSES_KEY, JSON.stringify(expenses))
  }, [expenses])

  const spent = useMemo(
    () => expenses.reduce((total, expense) => total + expense.amount, 0),
    [expenses],
  )

  const orderedExpenses = useMemo(
    () => [...expenses].sort((a, b) => b.createdAt - a.createdAt),
    [expenses],
  )

  function addExpense(expense) {
    setExpenses((current) => [
      ...current,
      { ...expense, id: makeId(), createdAt: Date.now() },
    ])
  }

  function deleteExpense(id) {
    setExpenses((current) => current.filter((expense) => expense.id !== id))
  }

  return (
    <div className="page">
      <header className="page-head">
        <h1>Budget Tracker</h1>
        <p>See where your money goes this month.</p>
      </header>

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
