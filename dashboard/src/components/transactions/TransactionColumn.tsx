import React, { useMemo, useState } from "react";
import { useFinance, Transaction } from "../../context/FinanceContext.tsx";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../uiComponents/card.tsx";
import { Input } from "../uiComponents/input.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../uiComponents/Select.tsx";
import { Button } from "../uiComponents/Button.tsx";
import { formatCurrency, formatDate } from "../../lib/financeCalculation.ts";
import { ChevronUp, ChevronDown, Trash2 } from "lucide-react";

type SortField = "date" | "amount" | "category";
type SortDirection = "asc" | "desc";

export function TransactionColumn() {
  const { transactions, userRole, deleteTransaction } = useFinance();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterType, setFilterType] = useState<string>("all");
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

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
        filterCategory === "all" || t.category === filterCategory;
      const matchesType = filterType === "all" || t.type === filterType;

      return matchesSearch && matchesCategory && matchesType;
    });
  }, [transactions, searchTerm, filterCategory, filterType]);

  const sorted = useMemo(() => {
    const copy = [...filtered];
    copy.sort((a, b) => {
      let aVal: string | number = a[sortField];
      let bVal: string | number = b[sortField];

      if (sortField === "date") {
        aVal = new Date(a.date).getTime();
        bVal = new Date(b.date).getTime();
      }

      if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
      if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

    return copy;
  }, [filtered, sortField, sortDirection]);

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? (
      <ChevronUp className="w-3 h-3 sm:w-4 sm:h-4 inline ml-0.5 sm:ml-1" />
    ) : (
      <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 inline ml-0.5 sm:ml-1" />
    );
  };
  return (
    <Card className="border border-border">
      <CardHeader>
        <CardTitle className="text-sm sm:text-base font-semibold">
          Transactions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 sm:space-y-4 pt-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <div className="border border-bold border-white p-3 rounded-xl">
            <Input
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-border text-xs sm:text-sm"
            />
          </div>
          <div className="border border-white p-3 rounded-xl flex items-center">
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="border border-border text-xs sm:text-sm w-full">
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
          </div>
          <div className="border border-white p-3 rounded-xl flex items-center">
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="border border-border text-xs sm:text-sm w-full">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="income">Income</SelectItem>
                <SelectItem value="expense">Expense</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {sorted.length === 0 ? (
          <div className="text-center py-6 sm:py-8 text-xs sm:text-sm text-muted-foreground">
            No transactions found
          </div>
        ) : (
          <div className="w-full overflow-x-auto -mx-4 sm:-mx-0 px-4 sm:px-0">
            <table className="w-full text-xs sm:text-sm min-w-max sm:min-w-full">
              <thead className="border-b border-border sticky top-0 bg-muted">
                <tr>
                  <th className="text-left py-2 sm:py-3 px-1 sm:px-2 font-semibold text-xs sm:text-sm text-foreground whitespace-nowrap">
                    <button
                      onClick={() => toggleSort("date")}
                      className="hover:text-primary transition-colors inline-flex items-center gap-0.5 sm:gap-1"
                    >
                      Date
                      <SortIcon field="date" />
                    </button>
                  </th>
                  <th className="text-left py-2 sm:py-3 px-1 sm:px-2 font-semibold text-xs sm:text-sm text-foreground hidden sm:table-cell">
                    Description
                  </th>
                  <th className="text-left py-2 sm:py-3 px-1 sm:px-2 font-semibold text-xs sm:text-sm text-foreground whitespace-nowrap">
                    <button
                      onClick={() => toggleSort("category")}
                      className="hover:text-primary transition-colors inline-flex items-center gap-0.5 sm:gap-1"
                    >
                      Category
                      <SortIcon field="category" />
                    </button>
                  </th>
                  <th className="text-right py-2 sm:py-3 px-1 sm:px-2 font-semibold text-xs sm:text-sm text-foreground whitespace-nowrap">
                    <button
                      onClick={() => toggleSort("amount")}
                      className="hover:text-primary transition-colors inline-flex items-center justify-end gap-0.5 sm:gap-1 w-full"
                    >
                      Amount
                      <SortIcon field="amount" />
                    </button>
                  </th>
                  {userRole === "admin" && (
                    <th className="text-right py-2 sm:py-3 px-1 sm:px-2 font-semibold text-xs sm:text-sm text-foreground whitespace-nowrap">
                      Action
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {sorted.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className="border-b border-border hover:bg-secondary/50 transition-colors text-xs sm:text-sm"
                  >
                    <td className="py-2 sm:py-3 px-1 sm:px-2 text-muted-foreground whitespace-nowrap">
                      {formatDate(transaction.date)}
                    </td>
                    <td className="py-2 sm:py-3 px-1 sm:px-2 text-foreground hidden sm:table-cell max-w-xs truncate">
                      {transaction.description}
                    </td>
                    <td className="py-2 sm:py-3 px-1 sm:px-2">
                      <span className="px-2 py-1 rounded text-xs font-medium bg-secondary text-secondary-foreground inline-block whitespace-nowrap">
                        {transaction.category}
                      </span>
                    </td>
                    <td
                      className={`py-2 sm:py-3 px-1 sm:px-2 text-right font-semibold whitespace-nowrap ${transaction.type === "income"
                        ? "text-green-600"
                        : "text-red-600"
                        }`}
                    >
                      {transaction.type === "income" ? "+" : "-"}
                      {formatCurrency(transaction.amount)}
                    </td>
                    {userRole === "admin" && (
                      <td className="py-2 sm:py-3 px-1 sm:px-2 text-right">
                        <button
                          onClick={() => deleteTransaction(transaction.id)}
                          className="text-red-600 hover:text-red-700 transition-colors p-1 hover:bg-red-50 rounded"
                          title="Delete transaction"
                        >
                          <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="text-xs text-muted-foreground text-right pt-2 sm:pt-3">
          Showing {sorted.length} of {transactions.length}
        </div>
      </CardContent>
    </Card>
  );
}
