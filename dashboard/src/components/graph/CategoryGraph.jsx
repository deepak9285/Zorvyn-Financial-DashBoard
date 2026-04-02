import React, { useMemo } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import { useFinance } from '../../context/FinanceContext.tsx';
import { calculateExpensesByCategory } from '../../lib/financeCalculation.ts';

const CategoryGraph = () => {
    const { transactions } = useFinance();
    const expenses = useMemo(() => calculateExpensesByCategory(transactions), []);
    const categoryData = Object.entries(expenses).map(([category, amount]) => ({
        category: category.slice(0, 8),
        amount,
    }))
        .sort((a, b) => b.amount - a.amount)
        .slice(0, 6);
    return (
        <div>
            <h1 className='text-2xl font-bold text-foreground'>Expenses by Category</h1>
            <div>
                <BarChart width={400} height={300} data={categoryData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" stroke="var(--muted-foreground)"
                        style={{ fontSize: '12px' }} />
                    <YAxis />
                    <Tooltip contentStyle={{
                        backgroundColor: 'var(--card)',
                        border: '1px solid var(--border)',
                        borderRadius: '6px',
                    }}
                        formatter={(value) => `$${value.toFixed(0)}`} />
                    <Bar dataKey="amount" fill="#8884d8" />
                </BarChart>
            </div>
        </div>
    )
}

export default CategoryGraph