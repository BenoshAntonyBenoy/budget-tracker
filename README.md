# Budget Tracker

A small budget tracker built with React and Vite. Set a monthly budget, log
what you spend, and watch your remaining balance update as you go. Everything is
kept in your browser's localStorage, so your data is still there when you come
back.

## What it does

- Set a monthly budget in rupees
- Add expenses with a name, amount, and category (Food, Transport,
  Entertainment, Shopping)
- See your budget, total spent, and remaining balance at a glance
- The remaining balance turns red once you go over budget
- Newest expenses show up first, and you can remove any of them
- Amounts are formatted with the ₹ symbol and Indian digit grouping
- Your budget and expenses are saved automatically and reloaded on your next
  visit

## Running it locally

You need Node.js 18 or newer.

```bash
npm install
npm run dev
```

Vite will print a local URL (usually http://localhost:5173). Open it in your
browser.

To make a production build:

```bash
npm run build
npm run preview
```

## Deploying to GitHub Pages

This repo ships with a GitHub Actions workflow at
`.github/workflows/deploy.yml`. Once the repo is on GitHub, open
**Settings → Pages**, set the source to **GitHub Actions**, and every push to
`main` will build the site and publish it.

## Project layout

```
src/
  components/
    BudgetForm.jsx     budget input and validation
    ExpenseForm.jsx    new expense input and validation
    ExpenseList.jsx    list of expenses with delete and empty state
    Summary.jsx        budget, spent, and remaining totals
  currency.js          ₹ formatting helper
  App.jsx              state, localStorage, and layout
  App.css              component styles
  index.css            base styles and theme variables
  main.jsx             app entry point
```
