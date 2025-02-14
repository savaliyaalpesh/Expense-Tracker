import React, { useState } from "react";

const ExpenseForm = ({ addExpense, month, setMonth, year, setYear, darkMode }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [customCategory, setCustomCategory] = useState("");

  const handleSubmit = () => {
    if (!title || !amount) return;
    addExpense({
      title,
      amount: Number(amount),
      category: category === "Other" ? customCategory : category,
      month,
      year,
    });
    setTitle("");
    setAmount("");
    setCustomCategory("");
  };

  const yearOptions = Array.from({ length: 21 }, (_, i) => new Date().getFullYear() - 10 + i);

  return (
    <div className={`p-4 border rounded mb-4 shadow-md ${darkMode ? "bg-gray-800 border-gray-600" : "bg-white border-gray-300"}`}>
      <h2 className="text-lg sm:text-xl font-bold mb-4 text-center text-gray-800 dark:text-white header-text">Add Expense</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input
          className={`input-text border p-2 rounded-md ${darkMode ? "bg-gray-700 text-white border-gray-500" : "bg-white text-black border-gray-300"} `}
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className={`input-text border p-2 rounded-md ${darkMode ? "bg-gray-700 text-white border-gray-500" : "bg-white text-black border-gray-300"}`}
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <select
          className={`input-text border p-2 rounded-md ${darkMode ? "bg-gray-700 text-white border-gray-500" : "bg-white text-black border-gray-300"}`}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>Food</option>
          <option>Travel</option>
          <option>Entertainment</option>
          <option>Shopping</option>
          <option>Other</option>
        </select>
        {category === "Other" && (
          <input
            className={`input-text border p-2 rounded-md ${darkMode ? "bg-gray-700 text-white border-gray-500" : "bg-white text-black border-gray-300"}`}
            type="text"
            placeholder="Custom Category"
            value={customCategory}
            onChange={(e) => setCustomCategory(e.target.value)}
          />
        )}
        <select
          className={`input-text border p-2 rounded-md ${darkMode ? "bg-gray-700 text-white border-gray-500" : "bg-white text-black border-gray-300"}`}
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        >
          {[
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December",
          ].map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>
        <select
          className={`input-text border p-2 rounded-md ${darkMode ? "bg-gray-700 text-white border-gray-500" : "bg-white text-black border-gray-300"}`}
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
        >
          {yearOptions.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>
      <button
        className="-text w-full mt-4 p-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-md transition"
        onClick={handleSubmit}
      >
        Add Expense
      </button>
    </div>
  );
};

export default ExpenseForm;
