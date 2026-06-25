import { formatRupees } from '../currency.js'

function Summary({ budget, spent }) {
  const remaining = budget - spent
  const isOver = remaining < 0

  return (
    <section className="summary">
      <div className="summary-card">
        <span className="summary-label">Budget</span>
        <span className="summary-value">{formatRupees(budget)}</span>
      </div>

      <div className="summary-card">
        <span className="summary-label">Spent so far</span>
        <span className="summary-value">{formatRupees(spent)}</span>
      </div>

      <div className="summary-card">
        <span className="summary-label">Left to spend</span>
        <span className={`summary-value ${isOver ? 'is-negative' : ''}`}>
          {formatRupees(remaining)}
        </span>
        {isOver && (
          <span className="summary-note">You've gone past your budget.</span>
        )}
      </div>
    </section>
  )
}

export default Summary
