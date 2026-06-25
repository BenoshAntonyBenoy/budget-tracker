import { formatRupees } from '../currency.js'

const CATEGORY_CLASS = {
  Food: 'tag-food',
  Transport: 'tag-transport',
  Entertainment: 'tag-entertainment',
  Shopping: 'tag-shopping',
}

function ExpenseList({ expenses, onDelete }) {
  return (
    <section className="card">
      <div className="card-head">
        <h2>Where it went</h2>
        {expenses.length > 0 && (
          <span className="count-pill">{expenses.length}</span>
        )}
      </div>

      {expenses.length === 0 ? (
        <div className="empty-state">
          <p className="empty-title">No expenses yet</p>
          <p className="empty-sub">Add one above and it'll show up here.</p>
        </div>
      ) : (
        <ul className="expense-list">
          {expenses.map((expense) => (
            <li key={expense.id} className="expense-row">
              <div className="expense-main">
                <span className="expense-name">{expense.name}</span>
                <span
                  className={`category-tag ${CATEGORY_CLASS[expense.category] || ''}`}
                >
                  {expense.category}
                </span>
              </div>

              <div className="expense-side">
                <span className="expense-amount">
                  {formatRupees(expense.amount)}
                </span>
                <button
                  type="button"
                  className="btn-remove"
                  onClick={() => onDelete(expense.id)}
                  aria-label={`Remove ${expense.name}`}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default ExpenseList
