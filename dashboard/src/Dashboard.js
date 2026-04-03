import React from "react";
import Card from "./components/uiComponents/card.tsx";
import { ExpenseCard } from "./components/uiComponents/ExpenseCard.tsx";
import ToggleTheme from "./components/uiComponents/ToggleTheme";
import SelectRole from "./components/uiComponents/SelectRole.tsx";
import { TransactionColumn } from "./components/transactions/TransactionColumn.tsx";
import { FinancialInsights } from "./components/graph/FinancialInsights";
import TimeBasedGraph from "./components/graph/TimeBasedGraph";
import AddTransaction from "./components/transactions/AddTransaction";
import CategoryGraph from "./components/graph/CategoryGraph";
import {
  calculateTotalBalance,
  TotalIncome,
  TotalExpenses,
} from "./lib/financeCalculation.ts";
import { useFinance } from "./context/FinanceContext.tsx";
import { DollarSign, TrendingUp, TrendingDown } from "lucide-react";
const Dashboard = () => {
  const { transactions } = useFinance();
  const totalBalance = calculateTotalBalance(transactions);
  const totalIncome = TotalIncome(transactions);
  const totalExpenses = TotalExpenses(transactions);
  return (
    <div className="p-1 min-h-screen">
      <header className="border-b border-border bg-white dark:bg-slate-950 sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                Finance Dashboard
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                Manage and analyze your finances
              </p>
            </div>
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-3">
              <ToggleTheme />
              <SelectRole />
              <AddTransaction />
            </div>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl pt-2 sm:pt-4">
        <div className="grid m-2 sm:m-3 grid-cols-1 md:grid-cols-3 gap-2 sm:gap-3">
          <ExpenseCard
            title="Total Balance"
            amount={totalBalance}
            icon={<DollarSign />}
            color="blue"
          />
          <ExpenseCard
            title="Total Income"
            amount={totalIncome}
            icon={<TrendingUp />}
            color="green"
          />
          <ExpenseCard
            title="Total Expenses"
            amount={totalExpenses}
            icon={<TrendingDown />}
            color="red"
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 px-2 sm:px-0">
          <div className="lg:col-span-2">
            <TimeBasedGraph />
          </div>
          <div>
            <FinancialInsights />
          </div>
        </div>
        <div className="px-2 sm:px-0">
          <CategoryGraph />
        </div>
        <div className="px-2 sm:px-0">
          <TransactionColumn />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
