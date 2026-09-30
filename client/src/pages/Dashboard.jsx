import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const { token } = useAuth();
  const [totalIncome, setTotalIncome] = useState(0);
  const [budgets, setBudgets] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [debts, setDebts] = useState([]);
  const [goals, setGoals] = useState([]);

  const authHeader = { Authorization: `Bearer ${token}` };

  const fetchAll = async () => {
    try {
      const [incomeRes, budgetRes, expenseRes, debtRes, savingsRes] = await Promise.all([
        fetch("/api/income", { headers: authHeader }),
        fetch("/api/budget", { headers: authHeader }),
        fetch("/api/expenses", { headers: authHeader }),
        fetch("/api/debts", { headers: authHeader }),
        fetch("/api/savings", { headers: authHeader }),
      ]);

      const incomeData = await incomeRes.json();
      const budgetData = await budgetRes.json();
      const expenseData = await expenseRes.json();
      const debtData = await debtRes.json();
      const savingsData = await savingsRes.json();

      if (Array.isArray(incomeData)) {
        setTotalIncome(incomeData.reduce((sum, e) => sum + Number(e.amount), 0));
      }
      setBudgets(Array.isArray(budgetData) ? budgetData : []);
      setExpenses(Array.isArray(expenseData) ? expenseData : []);
      setDebts(Array.isArray(debtData) ? debtData : []);
      setGoals(Array.isArray(savingsData) ? savingsData : []);
    } catch (err) {
      console.error("Dashboard fetch error:", err);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  // Spent per top-level budget category, computed from the expenses overview
  const spentByCategory = (categoryName) =>
    expenses
      .filter((e) => e.budget_category === categoryName)
      .reduce((sum, e) => sum + Number(e.amount), 0);

  const totalBudgeted = budgets.reduce((sum, b) => sum + Number(b.monthly_limit), 0);
  const totalSpent = expenses.reduce((sum, e) => sum + Number(e.amount), 0);

  const totalDebt = debts.reduce((sum, d) => sum + Number(d.total_amount), 0);
  const totalInstallments = debts.reduce((sum, d) => sum + Number(d.installment_amount || 0), 0);

  const totalSaved = goals.reduce((sum, g) => sum + Number(g.saved_amount || 0), 0);
  const totalGoalTarget = goals.reduce((sum, g) => sum + Number(g.target_amount), 0);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 flex flex-col gap-8">
      <h2 className="text-2xl font-bold">Dashboard</h2>

      {/* Top summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
          <p className="text-sm text-gray-600">Total Income</p>
          <p className="text-xl font-bold">KES {totalIncome.toLocaleString()}</p>
        </div>
        <div className="p-4 bg-green-50 border border-green-200 rounded-md">
          <p className="text-sm text-gray-600">Total Spent</p>
          <p className="text-xl font-bold">
            KES {totalSpent.toLocaleString()} / {totalBudgeted.toLocaleString()}
          </p>
        </div>
        <div className="p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-gray-600">Total Debt</p>
          <p className="text-xl font-bold">KES {totalDebt.toLocaleString()}</p>
          <p className="text-xs text-gray-500">Installments: KES {totalInstallments.toLocaleString()}/mo</p>
        </div>
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
          <p className="text-sm text-gray-600">Total Saved</p>
          <p className="text-xl font-bold">
            KES {totalSaved.toLocaleString()} / {totalGoalTarget.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Budget vs Spent per category */}
      <div>
        <h3 className="text-xl font-semibold mb-3">Budget vs. Spending</h3>
        <div className="flex flex-col gap-3">
          {budgets.map((budget) => {
            const spent = spentByCategory(budget.category);
            const cap = Number(budget.monthly_limit);
            const percent = cap > 0 ? Math.min((spent / cap) * 100, 100) : 0;
            const overBudget = spent > cap;

            return (
              <div key={budget.id} className="p-3 border border-gray-200 rounded-md">
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-semibold">{budget.category}</span>
                  <span className={overBudget ? "text-red-600 font-semibold" : "text-gray-600"}>
                    KES {spent.toLocaleString()} / {cap.toLocaleString()}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full ${overBudget ? "bg-red-600" : "bg-blue-600"}`}
                    style={{ width: `${percent}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
          {budgets.length === 0 && (
            <p className="text-gray-500">No budget categories set up yet.</p>
          )}
        </div>
      </div>

      {/* Debts summary */}
      <div>
        <h3 className="text-xl font-semibold mb-3">Debts</h3>
        {debts.length === 0 ? (
          <p className="text-gray-500">No debts recorded.</p>
        ) : (
          <div className="flex flex-col gap-2">
            {debts.map((debt) => (
              <div
                key={debt.id}
                className="flex justify-between items-center p-3 border border-gray-200 rounded-md"
              >
                <span>{debt.name}</span>
                <span className="text-sm text-gray-600">
                  KES {Number(debt.total_amount).toLocaleString()} | Due{" "}
                  {new Date(debt.due_date).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Savings goals summary */}
      <div>
        <h3 className="text-xl font-semibold mb-3">Savings Goals</h3>
        {goals.length === 0 ? (
          <p className="text-gray-500">No savings goals yet.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {goals.map((goal) => {
              const saved = Number(goal.saved_amount) || 0;
              const target = Number(goal.target_amount);
              const percent = target > 0 ? Math.min((saved / target) * 100, 100) : 0;

              return (
                <div key={goal.id} className="p-3 border border-gray-200 rounded-md">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-semibold">{goal.goal_name}</span>
                    <span className="text-gray-600">
                      KES {saved.toLocaleString()} / {target.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-green-600 h-3 rounded-full"
                      style={{ width: `${percent}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;