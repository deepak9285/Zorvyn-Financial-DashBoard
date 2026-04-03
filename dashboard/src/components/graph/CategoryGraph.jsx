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

const CategoryGraph = () => {
  const { transactions } = useFinance();
  const expenses = useMemo(() => calculateExpensesByCategory(transactions), []);
  const categoryData = Object.entries(expenses).map(([category, amount]) => ({
    category: category,
    amount,
  }));
  return (
    <div className="w-full h-full">
      <h1 className="text-lg sm:text-2xl w-full font-bold text-foreground mb-4">
        Expenses by Category
      </h1>
      <div className="bg-gray-200 rounded-lg p-3 sm:p-6 w-full overflow-x-auto">
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
              stroke="var(--muted-foreground)"
              angle={-45}
              textAnchor="end"
              height={100}
              style={{ fontSize: "12px" }}
            />
            <YAxis
              stroke="var(--muted-foreground)"
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
      </div>
    </div>
  );
};

export default CategoryGraph;
