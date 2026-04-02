import React from 'react';
import {
    getHighestSpendingCategory,
    calculateMontlyComparison,
    formatCurrency
} from '../../lib/financeCalculation.ts';
import { useFinance } from '../../context/FinanceContext.tsx';
import { TrendingUp, TrendingDown } from 'lucide-react';

const FinancialInsights = () => {
    const { transactions } = useFinance();

    const highestCategory = getHighestSpendingCategory(transactions);
    const monthlyComparison = calculateMontlyComparison(transactions);

    const isIncreased = monthlyComparison.percentageChange > 0;

    return (
        <div className="w-full p-4 md:p-6">

            {/* Heading */}
            <h1 className="text-xl md:text-2xl font-bold text-foreground mb-4">
                Financial Insights
            </h1>

            {/* Responsive Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                {/* Card 1 */}
                <div className="p-4 bg-card border rounded-xl shadow-sm">
                    <p className="text-sm text-muted-foreground mb-1">
                        Highest Spending Category
                    </p>

                    <p className="text-lg font-semibold text-foreground">
                        {highestCategory ? highestCategory.category : 'No data'}
                    </p>

                    {highestCategory && (
                        <p className="text-sm text-primary mt-1">
                            {formatCurrency(highestCategory.amount)}
                        </p>
                    )}
                </div>

                {/* Card 2 */}
                <div className="p-4 bg-card border rounded-xl shadow-sm">
                    <p className="text-sm text-muted-foreground mb-2">
                        Monthly Spending
                    </p>

                    <div className="flex justify-between items-center">

                        <div>
                            <p className="text-xs text-muted-foreground">This Month</p>
                            <p className="text-lg font-semibold text-foreground">
                                {formatCurrency(monthlyComparison.thisMonth)}
                            </p>
                        </div>

                        <div className="text-right">
                            <p
                                className={`text-sm flex items-center gap-1 ${isIncreased ? 'text-red-500' : 'text-green-500'
                                    }`}
                            >
                                {isIncreased ? (
                                    <>
                                        <TrendingUp className="w-4 h-4" />
                                        +{formatCurrency(monthlyComparison.percentageChange)}
                                    </>
                                ) : (
                                    <>
                                        <TrendingDown className="w-4 h-4" />
                                        {formatCurrency(Math.abs(monthlyComparison.percentageChange))}
                                    </>
                                )}
                            </p>

                            <p className="text-xs text-muted-foreground">
                                vs last month
                            </p>
                        </div>
                    </div>
                </div>

                {/* Card 3 */}
                <div className="p-4 bg-card border rounded-xl shadow-sm">
                    <p className="text-sm text-muted-foreground mb-2">
                        Summary
                    </p>

                    <div className="space-y-2 text-sm">

                        <div className="flex justify-between">
                            <span className="text-muted-foreground">
                                Total Transactions
                            </span>
                            <span className="font-semibold text-foreground">
                                {transactions.length}
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-muted-foreground">
                                Income Count
                            </span>
                            <span className="font-semibold text-green-500">
                                {transactions.filter(t => t.type === 'income').length}
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-muted-foreground">
                                Expense Count
                            </span>
                            <span className="font-semibold text-red-500">
                                {transactions.filter(t => t.type === 'expense').length}
                            </span>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default FinancialInsights;