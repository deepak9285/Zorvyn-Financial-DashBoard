import React from "react";
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
    <div className="p-2 sm:p-4 w-full max-w-7xl mx-auto space-y-6">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            Finance Dashboard
          </h1>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <ToggleTheme />
          <SelectRole />
          <AddTransaction />
        </div>
      </header>

      <main className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <TimeBasedGraph />
          </div>
          <div>
            <FinancialInsights />
          </div>
        </div>
        <div>
          <CategoryGraph />
        </div>
        <div>
          <TransactionColumn />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
