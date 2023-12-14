const generateRandomColor = () => {
  const existingBudgetLength = fetchData("budgets")?.length ?? 0;
  return `${existingBudgetLength * 34} 65% 50%`;
};

export const fetchData = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

export const createBudget = ({ name, amount }) => {
  const newItem = {
    id: crypto.randomUUID(), // cripto biblioteka generuoja id
    name: name,
    createdAt: Date.now(),
    amount: +amount, // konvertuoja į skaičių
    color: generateRandomColor(),
  };

  const existingBudgets = fetchData("budgets") ?? [];
  return localStorage.setItem(
    "budgets",
    JSON.stringify([...existingBudgets, newItem])
  );
};

export const createExpense = ({ name, amount, budgetId }) => {
  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: Date.now(),
    amount: +amount,
    budgetId: budgetId,
  };

  const existingExpenses = fetchData("expenses") ?? [];
  return localStorage.setItem(
    "expenses",
    JSON.stringify([...existingExpenses, newItem])
  );
};

export const waait = () =>
  new Promise((res) => setTimeout(res, Math.random() * 800));

export const calculateSpentByBudget = (budgetId) => {
  const expenses = fetchData("expenses") ?? [];
  const budgetSpent = expenses.reduce((acc, expence) => {
    if (expence.budgetId !== budgetId) return acc;

    return (acc += expence.amount);
  }, 0);

  return budgetSpent;
};

export const formatPercentage = (amt) => {
  return amt.toLocaleString(undefined, {
    style: "percent",
    minimumFractionDigits: 0,
  });
};

export const formatCurrency = (amt) => {
  return amt.toLocaleString(undefined, {
    style: "currency",
    currency: "EUR",
  });
};

export const formatDateToLocaleString = (epoch) =>
  new Date(epoch).toLocaleDateString();

export const getAllMatchingItems = ({ category, key, value }) => {
  const data = fetchData(category) ?? [];
  return data.filter((item) => item[key] === value);
};

export const deleteItem = ({ key, id }) => {
  const existingData = fetchData(key);
  if (id) {
    const newData = existingData.filter((item) => item.id !== id);
    return localStorage.setItem(key, JSON.stringify(newData));
  }
  return localStorage.removeItem(key);
};
