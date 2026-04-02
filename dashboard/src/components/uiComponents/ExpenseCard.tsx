import { Card, CardContent, CardHeader, CardTitle } from '../uiComponents/card.tsx';
import { formatCurrency } from '../../lib/financeCalculation.ts';
import React from 'react';

interface SummaryCardProps {
    title: string;
    amount: number;
    icon: React.ReactNode;
    color?: 'green' | 'blue' | 'red';
}

export function ExpenseCard({ title, amount, icon, color = 'blue' }: SummaryCardProps) {
    const colorClasses = {
        green: 'text-green-600',
        blue: 'text-blue-600',
        red: 'text-red-600',
    };

    return (
        <Card className="border border-border bg-card hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                    {title}
                </CardTitle>
                <div className={`text-2xl ${colorClasses[color]}`}>{icon}</div>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-foreground">
                    {formatCurrency(amount)}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                    {color === 'green' && 'Total income'}
                    {color === 'blue' && 'Current balance'}
                    {color === 'red' && 'Total expenses'}
                </p>
            </CardContent>
        </Card>
    );
}
