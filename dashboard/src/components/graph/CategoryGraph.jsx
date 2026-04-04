import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useFinance } from "../../context/FinanceContext.tsx";
import { calculateExpensesByCategory } from "../../lib/financeCalculation.ts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../uiComponents/card.tsx";

const CategoryGraph = () => {
  const { transactions } = useFinance();
  const expenses = useMemo(() => calculateExpensesByCategory(transactions), [transactions]);
  const categoryData = Object.entries(expenses).map(([category, amount]) => ({
    category: category,
    amount,
  }));
  return (
    <Card className="border border-border w-full">
      <CardHeader>
        <CardTitle className="text-sm sm:text-base font-semibold text-foreground">
          Category Expenses
        </CardTitle>
      </CardHeader>
      <CardContent className="w-full -mx-4 px-0">
        <ResponsiveContainer
          width="100%"
          height={Math.max(300, categoryData.length * 60)}
        >
          <BarChart
            data={categoryData}
            margin={{ top: 10, right: 10, left: 10, bottom: 80 }}
          >
            <CartesianGrid strokeDasharray="5 5" />
            <XAxis
              dataKey="category"
              stroke="hsl(var(--foreground))"
              angle={-45}
              textAnchor="end"
              height={100}
              style={{ fontSize: "12px" }}
            />
            <YAxis
              stroke="hsl(var(--foreground))"
              style={{ fontSize: "12px" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "6px",
              }}
              formatter={(value) => `$${value.toFixed(0)}`}
            />
            <Bar dataKey="amount" fill="#8884d8" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default CategoryGraph;
