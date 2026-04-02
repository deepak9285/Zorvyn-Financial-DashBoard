import React from 'react'
import Card from './components/uiComponents/card.tsx';
import { ExpenseCard } from './components/uiComponents/ExpenseCard.tsx';
import ToggleTheme from './components/uiComponents/ToggleTheme';
import SwitchRole from './components/uiComponents/SwitchRole';
import { TransactionColumn } from './components/transactions/TransactionColumn.tsx';
import FinancialInsights from './components/graph/FinancialInsights';
import TimeBasedGraph from './components/graph/TimeBasedGraph';
import CategoryGraph from './components/graph/CategoryGraph';
import { calculateTotalBalance, TotalIncome, TotalExpenses } from './lib/financeCalculation.ts';
import { useFinance } from './context/FinanceContext.tsx';
import { DollarSign, TrendingUp, TrendingDown } from 'lucide-react';
const Dashboard = () => {
    const { transactions } = useFinance();
    const totalBalance = calculateTotalBalance(transactions);
    const totalIncome = TotalIncome(transactions);
    const totalExpenses = TotalExpenses(transactions);
    return (
        <div>
            <header className="border-b border-border bg-card sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">Finance Dashboard</h1>
                        <p className="text-sm text-black text-muted-foreground mt-1">
                            Manage and analyze your finances
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <ToggleTheme />
                        <SwitchRole />
                        <TransactionColumn />
                    </div>
                </div>
            </header>
            <main>
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
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
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
    )
}

export default Dashboard;