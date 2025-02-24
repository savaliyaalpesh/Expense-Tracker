import React, { useState } from "react";

const ExpenseForm = ({ addExpense, darkMode, expenses, setFilteredExpenses }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [customCategory, setCustomCategory] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // Set default date to today
  const [errors, setErrors] = useState({});

  const handleSubmit = () => {
    let newErrors = {};

    if (!title) newErrors.title = "Title is required.";
    if (!amount) newErrors.amount = "Amount is required.";
    else if (Number(amount) <= 0) newErrors.amount = "Amount must be a positive value.";
    if (!date) newErrors.date = "Date is required.";
    if (category === "Other" && !customCategory.trim()) newErrors.category = "Category is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});

    const newExpense = {
      title,
      amount: Number(amount),
      category: category === "Other" ? customCategory : category,
      date,
    };

    addExpense(newExpense);
    setTitle("");
    setAmount("");
    setCustomCategory("");
    setDate(new Date().toISOString().split('T')[0]); // Reset date to today
  };

  const filterExpenses = (selectedDate) => {
    if (!expenses || expenses.length === 0) {
      setFilteredExpenses([]);
      return;
    }

    const selectedMonth = new Date(selectedDate).getMonth();
    const selectedYear = new Date(selectedDate).getFullYear();

    const filtered = expenses.filter((expense) => {
      if (!expense.date) return false;
      const expenseDate = new Date(expense.date);
      return (
        expenseDate.getMonth() === selectedMonth &&
        expenseDate.getFullYear() === selectedYear
      );
    });

    setFilteredExpenses(filtered);
  };

  return (
    <div className={`p-4 border rounded mb-4 shadow-md ${darkMode ? "bg-gray-800 border-gray-600" : "bg-white border-gray-300"}`}>
      <h2 className="text-lg sm:text-xl font-bold mb-4 text-center text-gray-800 dark:text-white header-text">Add Expense</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <input
            className={`input-text border p-2 rounded-md w-full ${darkMode ? "bg-gray-700 text-white border-gray-500" : "bg-white text-black border-gray-300"}`}
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {errors.title && <p className="text-red-500 text-center font-alias font-semibold">{errors.title}</p>}
        </div>
        <div>
          <input
            className={`input-text border p-2 rounded-md w-full ${darkMode ? "bg-gray-700 text-white border-gray-500" : "bg-white text-black border-gray-300"}`}
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          {errors.amount && <p className="text-red-500 text-center font-alias font-semibold">{errors.amount}</p>}
        </div>
        <div>
          <select
            className={`input-text border p-2 rounded-md w-full ${darkMode ? "bg-gray-700 text-white border-gray-500" : "bg-white text-black border-gray-300"}`}
            value={category || ""}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Shopping">Shopping</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {category === "Other" && (
          <div>
            <input
              className={`input-text border p-2 rounded-md w-full ${darkMode ? "bg-gray-700 text-white border-gray-500" : "bg-white text-black border-gray-300"}`}
              type="text"
              placeholder="Custom Category"
              value={customCategory}
              onChange={(e) => setCustomCategory(e.target.value)}
            />
            {errors.category && <p className="text-red-500 text-center font-alias font-semibold">{errors.category}</p>}
          </div>
        )}
        <div>
          <input
            className={`input-text border p-2 rounded-md w-full ${darkMode ? "bg-gray-700 text-white border-gray-500" : "bg-white text-black border-gray-300"}`}
            type="date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
              filterExpenses(e.target.value);
            }}
          />
          {errors.date && <p className="text-red-500 text-center font-alias font-semibold">{errors.date}</p>}
        </div>
      </div>
      <button
        className="w-full mt-4 p-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-md transition"
        onClick={handleSubmit}
      >
        Add Expense
      </button>
    </div>
  );
};

export default ExpenseForm;
