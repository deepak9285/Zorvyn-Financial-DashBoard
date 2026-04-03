
import React, { useState } from "react";
import { useFinance } from "../../context/FinanceContext.tsx";
function AddTransaction() {
  const { addTransaction, userRole } = useFinance();

  const [openModal, setOpenModal] = useState(false);

  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    amount: "",
    category: "Other",
    type: "expense",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.amount || !formData.description) {
      alert("Please fill all fields");
      return;
    }

    addTransaction({
      ...formData,
      amount: parseFloat(formData.amount),
    });

    setFormData({
      date: new Date().toISOString().split("T")[0],
      amount: "",
      category: "Other",
      type: "expense",
      description: "",
    });

    setOpenModal(false);
  };

  if (userRole === "viewer") return;

  return (
    <div>
      <button
        onClick={() => setOpenModal(true)}
        className="bg-primary bg-green-500 text-white px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base hover:bg-green-600 transition-colors"
      >
        Add Transaction
      </button>
      {openModal && (
        <div className="fixed inset-0 border border-black bg-black/50 flex items-center justify-center px-4 z-50">
          <div className="bg-white dark:bg-card p-4 sm:p-6 rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">
              Add Transaction
            </h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full border p-2 rounded text-sm sm:text-base"
              />

              <input
                type="number"
                name="amount"
                placeholder="Amount"
                value={formData.amount}
                onChange={handleChange}
                className="w-full border p-2 rounded text-sm sm:text-base"
              />

              <input
                type="text"
                name="category"
                placeholder="Category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border p-2 rounded text-sm sm:text-base"
              />

              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full border p-2 rounded text-sm sm:text-base"
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>

              <input
                type="text"
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border p-2 rounded text-sm sm:text-base"
              />
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setOpenModal(false)}
                  className="px-3 py-2 border rounded text-sm sm:text-base hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-2 bg-blue-500 text-white rounded text-sm sm:text-base hover:bg-blue-600 transition-colors"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddTransaction;
