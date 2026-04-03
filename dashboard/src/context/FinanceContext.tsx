
import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'viewer' | 'admin';

export interface Transaction {
    id: string;
    date: string;
    amount: number;
    category: string;
    type: 'income' | 'expense';
    description: string;
}

export interface FinanceContextType {
    transactions: Transaction[];
    userRole: UserRole;
    setUserRole: (role: UserRole) => void;
    addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
    editTransaction: (id: string, transaction: Partial<Transaction>) => void;
    deleteTransaction: (id: string) => void;
    getTransactionsByCategory: (category: string) => Transaction[];
    getTransactionsByType: (type: 'income' | 'expense') => Transaction[];
}

export const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

const MOCK_TRANSACTIONS: Transaction[] = [
    {
        id: '1',
        date: '2024-03-28',
        amount: 5000,
        category: 'Salary',
        type: 'income',
        description: 'Monthly salary',
    },
    {
        id: '2',
        date: '2024-03-25',
        amount: 1200,
        category: 'Rent',
        type: 'expense',
        description: 'Apartment rent',
    },
    {
        id: '3',
        date: '2024-03-24',
        amount: 150,
        category: 'Groceries',
        type: 'expense',
        description: 'Weekly grocery shopping',
    },
    {
        id: '4',
        date: '2024-03-23',
        amount: 80,
        category: 'Dining',
        type: 'expense',
        description: 'Restaurant dinner',
    },
    {
        id: '5',
        date: '2024-03-22',
        amount: 2000,
        category: 'Freelance',
        type: 'income',
        description: 'Project payment',
    },
    {
        id: '6',
        date: '2024-03-20',
        amount: 60,
        category: 'Entertainment',
        type: 'expense',
        description: 'Movie tickets',
    },
    {
        id: '7',
        date: '2024-03-18',
        amount: 250,
        category: 'Utilities',
        type: 'expense',
        description: 'Monthly utilities',
    },
    {
        id: '8',
        date: '2024-03-15',
        amount: 120,
        category: 'Healthcare',
        type: 'expense',
        description: 'Pharmacy',
    },
    {
        id: '9',
        date: '2024-03-10',
        amount: 500,
        category: 'Shopping',
        type: 'expense',
        description: 'Clothing purchase',
    },
    {
        id: '10',
        date: '2024-03-05',
        amount: 100,
        category: 'Transport',
        type: 'expense',
        description: 'Gas',
    },
];

export function FinanceProvider({ children }: { children: React.ReactNode }) {
    const [transactions, setTransactions] = useState(MOCK_TRANSACTIONS);
    const [userRole, setUserRole] = useState('viewer');
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        const savedTransactions = localStorage.getItem('finance_transactions');
        if (savedTransactions) {
            try {
                setTransactions(JSON.parse(savedTransactions));
            } catch (e) {
                console.error('Failed to parse saved transactions:', e);
            }
        }
        setIsHydrated(true);
    }, []);

    useEffect(() => {
        if (isHydrated) {
            localStorage.setItem('finance_transactions', JSON.stringify(transactions));
        }
    }, [transactions, isHydrated]);

    const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
        if (userRole !== 'admin') return;
        const newTransaction: Transaction = {
            ...transaction,
            id: Date.now().toString(),
        };
        setTransactions([newTransaction, ...transactions]);
    };

    const editTransaction = (id: string, updates: Partial<Transaction>) => {
        if (userRole !== 'admin') return;
        setTransactions(
            transactions.map((t: any) => (t.id === id ? { ...t, ...updates } : t))
        );
    };

    const deleteTransaction = (id: string) => {
        if (userRole !== 'admin') return;
        setTransactions(transactions.filter((t: any) => t.id !== id));
    };

    const getTransactionsByCategory = (category: string) => {
        return transactions.filter((t: any) => t.category === category);
    };

    const getTransactionsByType = (type: 'income' | 'expense') => {
        return transactions.filter((t: any) => t.type === type);
    };

    return (
        <FinanceContext.Provider
            value={{
                transactions,
                userRole,
                setUserRole,
                addTransaction,
                editTransaction,
                deleteTransaction,
                getTransactionsByCategory,
                getTransactionsByType,
            }}
        >
            {children}
        </FinanceContext.Provider>
    );
}

export function useFinance() {
    const context = useContext(FinanceContext);
    if (!context) {
        throw new Error('useFinance must be used within FinanceProvider');
    }
    return context;
}
