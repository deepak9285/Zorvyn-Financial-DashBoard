"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../uiComponents/card.tsx";
import {
  getHighestSpendingCategory,
  calculateMontlyComparison,
  formatCurrency,
} from "../../lib/financeCalculation.ts";
import { useFinance } from "../../context/FinanceContext.tsx";
import { TrendingUp, TrendingDown } from "lucide-react";

export function FinancialInsights() {
  const { transactions } = useFinance();
  const highestCategory = getHighestSpendingCategory(transactions);
  const monthlyComparison = calculateMontlyComparison(transactions);

  const isIncreased = monthlyComparison.percentageChange > 0;

  return (
    <Card className="border border-border">
      <CardHeader>
        <CardTitle className="text-sm sm:text-base font-semibold">
          Financial Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="p-3 bg-secondary bg-gray-100 rounded-lg">
            <p className="text-xs sm:text-sm text-muted-foreground mb-1">
              Highest Spending Category
            </p>
            <p className="text-sm sm:text-lg font-semibold text-foreground">
              {highestCategory ? highestCategory.category : "No data"}
            </p>
            {highestCategory && (
              <p className="text-xs sm:text-sm text-primary mt-1">
                {formatCurrency(highestCategory.amount)}
              </p>
            )}
          </div>

          <div className="p-3 bg-secondary  bg-gray-100 rounded-lg">
            <p className="text-xs sm:text-sm text-muted-foreground mb-1">
              Monthly Spending Comparison
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-2">
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  This Month
                </p>
                <p className="text-sm sm:text-lg font-semibold text-foreground">
                  {formatCurrency(monthlyComparison.thisMonth)}
                </p>
              </div>
              <div className="text-left sm:text-right">
                <p
                  className={`text-xs sm:text-sm flex items-center gap-1 ${
                    isIncreased ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {isIncreased ? (
                    <>
                      <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />+
                      {formatCurrency(monthlyComparison.percentageChange)}
                    </>
                  ) : (
                    <>
                      <TrendingDown className="w-3 h-3 sm:w-4 sm:h-4" />
                      {formatCurrency(
                        Math.abs(monthlyComparison.percentageChange),
                      )}
                    </>
                  )}
                </p>
                <p className="text-xs text-muted-foreground">vs last month</p>
              </div>
            </div>
          </div>

          <div className="p-3 bg-secondary bg-gray-100 rounded-lg">
            <p className="text-xs sm:text-sm text-muted-foreground mb-2">
              Financial Summary
            </p>
            <div className="space-y-2 text-xs sm:text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Total Transactions
                </span>
                <span className="font-semibold text-foreground">
                  {transactions.length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Income Count</span>
                <span className="font-semibold text-green-600">
                  {transactions.filter((t) => t.type === "income").length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Expense Count</span>
                <span className="font-semibold text-red-600">
                  {transactions.filter((t) => t.type === "expense").length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
