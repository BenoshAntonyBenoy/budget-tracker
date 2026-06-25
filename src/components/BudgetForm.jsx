import { useState } from 'react'
import { formatRupees } from '../currency.js'

function BudgetForm({ budget, onSave }) {
  const [value, setValue] = useState(budget ? String(budget) : '')
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    const amount = Number(value)

    if (!value.trim() || Number.isNaN(amount) || amount <= 0) {
      setError('Enter a budget greater than zero.')
      return
    }

    setError('')
    onSave(amount)
  }

  return (
    <section className="card budget-card">
      <div className="card-head">
        <h2>Monthly budget</h2>
        {budget > 0 && (
          <span className="budget-current">Right now: {formatRupees(budget)}</span>
        )}
      </div>

      <form className="budget-form" onSubmit={handleSubmit} noValidate>
        <label className="field">
          <span className="field-label">What's your limit this month?</span>
          <div className="amount-input">
            <span className="amount-symbol">₹</span>
            <input
              type="number"
              inputMode="decimal"
              min="0"
              step="1"
              placeholder="0"
              value={value}
              onChange={(event) => setValue(event.target.value)}
            />
          </div>
        </label>

        <button type="submit" className="btn btn-primary">
          Save budget
        </button>
      </form>

      {error && <p className="form-error">{error}</p>}
    </section>
  )
}

export default BudgetForm
