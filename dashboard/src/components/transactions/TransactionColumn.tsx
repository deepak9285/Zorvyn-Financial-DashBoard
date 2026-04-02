'use client';

import React, { useMemo, useState } from 'react';
import { useFinance, Transaction } from '../../context/FinanceContext.tsx';
import { Card, CardContent, CardHeader, CardTitle } from '../uiComponents/card.tsx';
import { Input } from '../uiComponents/input.tsx';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../uiComponents/Select.tsx';
import { Button } from '../uiComponents/Button.tsx';
import { formatCurrency } from '../../lib/financeCalculation.ts';
import { ChevronUp, ChevronDown, Trash2 } from 'lucide-react';

type SortField = 'date' | 'amount' | 'category';
type SortDirection = 'asc' | 'desc';

export function TransactionColumn() {
    const { transactions, userRole, deleteTransaction } = useFinance();
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('all');
    const [filterType, setFilterType] = useState<string>('all');
    const [sortField, setSortField] = useState<SortField>('date');
    const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

    const categories = useMemo(() => {
        const cats = new Set(transactions.map((t) => t.category));
        return Array.from(cats).sort();
    }, [transactions]);

    const filtered = useMemo(() => {
        return transactions.filter((t) => {
            const matchesSearch =
                t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                t.category.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory =
                filterCategory === 'all' || t.category === filterCategory;
            const matchesType = filterType === 'all' || t.type === filterType;

            return matchesSearch && matchesCategory && matchesType;
        });
    }, [transactions, searchTerm, filterCategory, filterType]);

    const sorted = useMemo(() => {
        const copy = [...filtered];
        copy.sort((a, b) => {
            let aVal: string | number = a[sortField];
            let bVal: string | number = b[sortField];

            if (sortField === 'date') {
                aVal = new Date(a.date).getTime();
                bVal = new Date(b.date).getTime();
            }

            if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
            if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
            return 0;
        });

        return copy;
    }, [filtered, sortField, sortDirection]);

    const toggleSort = (field: SortField) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('desc');
        }
    };

    const SortIcon = ({ field }: { field: SortField }) => {
        if (sortField !== field) return null;
        return sortDirection === 'asc' ? (
            <ChevronUp className="w-4 h-4 inline ml-1" />
        ) : (
            <ChevronDown className="w-4 h-4 inline ml-1" />
        );
    };

    return (
        <Card className="border border-border">
            <CardHeader>
                <CardTitle className="text-base font-semibold">Transactions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex justify-between items-center mb-2">
                    <p className="text-sm text-muted-foreground">
                        Manage and analyze your transactions
                    </p>
                    {/* <ExportButtons /> */}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <Input
                        placeholder="Search transactions..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="border border-border"
                    />
                    <Select value={filterCategory} onValueChange={setFilterCategory}>
                        <SelectTrigger className="border border-border">
                            <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Categories</SelectItem>
                            {categories.map((cat) => (
                                <SelectItem key={cat} value={cat}>
                                    {cat}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Select value={filterType} onValueChange={setFilterType}>
                        <SelectTrigger className="border border-border">
                            <SelectValue placeholder="Type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Types</SelectItem>
                            <SelectItem value="income">Income</SelectItem>
                            <SelectItem value="expense">Expense</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {sorted.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                        No transactions found
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="border-b border-border">
                                <tr>
                                    <th className="text-left py-3 px-4 font-semibold text-foreground">
                                        <button
                                            onClick={() => toggleSort('date')}
                                            className="hover:text-primary transition-colors"
                                        >
                                            Date
                                            <SortIcon field="date" />
                                        </button>
                                    </th>
                                    <th className="text-left py-3 px-4 font-semibold text-foreground">
                                        Description
                                    </th>
                                    <th className="text-left py-3 px-4 font-semibold text-foreground">
                                        <button
                                            onClick={() => toggleSort('category')}
                                            className="hover:text-primary transition-colors"
                                        >
                                            Category
                                            <SortIcon field="category" />
                                        </button>
                                    </th>
                                    <th className="text-right py-3 px-4 font-semibold text-foreground">
                                        <button
                                            onClick={() => toggleSort('amount')}
                                            className="hover:text-primary transition-colors float-right"
                                        >
                                            Amount
                                            <SortIcon field="amount" />
                                        </button>
                                    </th>
                                    {userRole === 'admin' && (
                                        <th className="text-right py-3 px-4 font-semibold text-foreground">
                                            Action
                                        </th>
                                    )}
                                </tr>
                            </thead>
                            <tbody>
                                {sorted.map((transaction) => (
                                    <tr
                                        key={transaction.id}
                                        className="border-b border-border hover:bg-secondary/50 transition-colors"
                                    >
                                        <td className="py-3 px-4 text-muted-foreground">
                                            {/* {formatDate(transaction.date)} */}
                                        </td>
                                        <td className="py-3 px-4 text-foreground">
                                            {transaction.description}
                                        </td>
                                        <td className="py-3 px-4">
                                            <span className="px-2 py-1 rounded text-xs font-medium bg-secondary text-secondary-foreground">
                                                {transaction.category}
                                            </span>
                                        </td>
                                        <td
                                            className={`py-3 px-4 text-right font-semibold ${transaction.type === 'income'
                                                ? 'text-green-600'
                                                : 'text-red-600'
                                                }`}
                                        >
                                            {transaction.type === 'income' ? '+' : '-'}
                                            {formatCurrency(transaction.amount)}
                                        </td>
                                        {userRole === 'admin' && (
                                            <td className="py-3 px-4 text-right">
                                                <button
                                                    onClick={() => deleteTransaction(transaction.id)}
                                                    className="text-red-600 hover:text-red-700 transition-colors"
                                                    title="Delete transaction"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </td>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                <div className="text-xs text-muted-foreground text-right pt-2">
                    Showing {sorted.length} of {transactions.length} transactions
                </div>
            </CardContent>
        </Card>
    );
}
