import React from 'react'
import Card from './components/uiComponents/card';
import ToggleTheme from './components/uiComponents/ToggleTheme';
import SwitchRole from './components/uiComponents/SwitchRole';
import TransactionColumn from './components/transactions/TransactionColumn';
import FinancialInsights from './components/graph/FinancialInsights';
import TimeBasedGraph from './components/graph/TimeBasedGraph';
import CategoryGraph from './components/graph/CategoryGraph';

const Dashboard = () => {
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
                    <Card title="Total Income" amount="10000" icon="💰" color="green" />
                    <Card title="Current Balance" amount="10000" icon="💰" color="blue" />
                    <Card title="Total Expenses" amount="10000" icon="💰" color="red" />
                </div>
                <div>
                    <div>
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