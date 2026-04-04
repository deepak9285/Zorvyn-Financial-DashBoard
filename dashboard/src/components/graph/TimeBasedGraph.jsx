import React from "react";
import { useFinance } from "../../context/FinanceContext.tsx";
import { calculateExpensesByTime } from "../../lib/financeCalculation.ts";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../uiComponents/card.tsx";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const TimeBasedGraph = () => {
  const { transactions } = useFinance();
  const expenses = calculateExpensesByTime(transactions);
  return (
    <Card className="border border-border">
      <CardHeader>
        <CardTitle className="text-sm sm:text-base font-semibold">
          Balance Trend
        </CardTitle>
      </CardHeader>
      <CardContent className="w-full -mx-6 px-0">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={expenses}
            margin={{ top: 10, right: 10, left: -20, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis
              dataKey="date"
              stroke="hsl(var(--foreground))"
              style={{ fontSize: "11px" }}
            />
            <YAxis
              stroke="hsl(var(--foreground))"
              style={{ fontSize: "11px" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "6px",
              }}
              formatter={(value) => `$${value.toFixed(0)}`}
            />
            <Line
              type="monotone"
              dataKey="balance"
              stroke="#8884d8"
              dot={false}
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default TimeBasedGraph;
