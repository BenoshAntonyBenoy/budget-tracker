import { useState } from 'react'

const CATEGORIES = ['Food', 'Transport', 'Entertainment', 'Shopping']

function ExpenseForm({ onAdd }) {
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState(CATEGORIES[0])
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()

    const trimmedName = name.trim()
    const value = Number(amount)

    if (!trimmedName) {
      setError('Add a name so you remember what this was.')
      return
    }

    if (!amount.trim() || !Number.isFinite(value) || value <= 0) {
      setError('The amount has to be more than zero.')
      return
    }

    onAdd({ name: trimmedName, amount: value, category })
    setName('')
    setAmount('')
    setCategory(CATEGORIES[0])
    setError('')
  }

  return (
    <section className="card">
      <div className="card-head">
        <h2>Add an expense</h2>
      </div>

      <form className="expense-form" onSubmit={handleSubmit} noValidate>
        <label className="field field-grow">
          <span className="field-label">What was it for?</span>
          <input
            type="text"
            placeholder="Groceries, bus fare, that coffee..."
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>

        <label className="field">
          <span className="field-label">Amount</span>
          <div className="amount-input">
            <span className="amount-symbol">₹</span>
            <input
              type="number"
              inputMode="decimal"
              min="0"
              step="1"
              placeholder="0"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
            />
          </div>
        </label>

        <label className="field">
          <span className="field-label">Category</span>
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            {CATEGORIES.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <button type="submit" className="btn btn-primary expense-submit">
          Add expense
        </button>
      </form>

      {error && <p className="form-error">{error}</p>}
    </section>
  )
}

export default ExpenseForm
