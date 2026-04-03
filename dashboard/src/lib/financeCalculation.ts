import { Transaction } from "../context/FinanceContext"
export function calculateTotalBalance(transactions: Transaction[]) {
    return transactions.reduce((acc, transaction) => {
        if (transaction.type === "income") {
            acc += transaction.amount
        } else {
            acc -= transaction.amount
        }
        return acc
    }, 0)
}

export function TotalIncome(transactions: Transaction[]) {
    return transactions.reduce((acc, transaction) => {
        if (transaction.type === "income") {
            acc += transaction.amount
        }
        return acc
    }, 0)
}

export function TotalExpenses(transactions: Transaction[]) {
    return transactions.reduce((acc, transaction) => {
        if (transaction.type === "expense") {
            acc += transaction.amount
        }
        return acc
    }, 0)
}

export function calculateExpensesByCategory(
    transactions: Transaction[]
): Record<string, number> {
    return transactions
        .filter((t) => t.type === 'expense')
        .reduce(
            (acc, t) => {
                acc[t.category] = (acc[t.category] || 0) + t.amount;
                return acc;
            },
            {} as Record<string, number>
        );
}
export function calculateExpensesByTime(
    transactions: Transaction[]
): Array<{ date: string; balance: number }> {
    const sorted = [...transactions].sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    let runningBalance = 0;
    return sorted.map((t) => {
        runningBalance +=
            t.type === 'income' ? t.amount : -t.amount;
        return {
            date: new Date(t.date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
            }),
            balance: runningBalance,
        };
    });
}

export function getHighestSpendingCategory(
    transactions: Transaction[]
): {
    category: string,
    amount: number
} | null {
    const expenses = calculateExpensesByCategory(transactions);
    if (Object.keys(expenses).length === 0) {
        return null;
    }
    const [category, amount] = Object.entries(expenses).reduce((max, current) => current[1] > max[1] ? current : max);
    return { category, amount };
}

export function calculateMontlyComparison(
    transactions: Transaction[]
): {
    currentMonth: number,
    previousMonth: number,
    percentageChange: number
} {
    const now = new Date();
    const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const previousMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const previousMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);
    const currentMonthExpenses = transactions.filter((t) => t.type === 'expense' && new Date(t.date) >= currentMonthStart).reduce((sum, t) => sum + t.amount, 0);
    const previousMonthExpenses = transactions.filter((t) => t.type === 'expense' && new Date(t.date) >= previousMonthStart && new Date(t.date) <= previousMonthEnd).reduce((sum, t) => sum + t.amount, 0);
    const percentageChange = previousMonthExpenses === 0 ? 0 : (currentMonthExpenses - previousMonthExpenses) / previousMonthExpenses * 100;
    return { currentMonth: currentMonthExpenses, previousMonth: previousMonthExpenses, percentageChange }
}
export function formatCurrency(amount: number) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(amount);
}
export function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
}
