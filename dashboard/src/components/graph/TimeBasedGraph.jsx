import React from 'react'
import { useFinance } from '../../context/FinanceContext.tsx';
import { calculateExpensesByTime } from '../../lib/financeCalculation.ts';
import { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


const TimeBasedGraph = () => {
    const { transactions } = useFinance();
    const expenses = useMemo(() => calculateExpensesByTime(transactions), []);
    return (
        <div className="border border-border">
            <h1>TimeBasedGraph</h1>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={expenses}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date"
                        stroke="var(--muted-foreground)"
                        style={{ fontSize: '12px' }} />
                    <YAxis dataKey="balance"
                        stroke="var(--muted-foreground)"
                        style={{ fontSize: '12px' }} />
                    <Tooltip contentStyle={{
                        backgroundColor: 'var(--card)',
                        border: '1px solid var(--border)',
                        borderRadius: '6px',
                    }}
                        formatter={(value) => `$${value.toFixed(0)}`} />
                    <Line type="monotone" dataKey="value" stroke="#8884d8" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default TimeBasedGraph