import React, { useState } from "react";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState([]);
  const [expenseToEdit, setExpenseToEdit] = useState(null);
  const [month, setMonth] = useState("January");
  const [year, setYear] = useState(new Date().getFullYear());
  const [darkMode] = useState(false);

  const addExpense = (expense) => {
    setExpenses([...expenses, expense]);
  };

  const editExpense = (updatedExpense) => {
    setExpenses(expenses.map((exp) => (exp.title === updatedExpense.title ? updatedExpense : exp)));
    setExpenseToEdit(null); // Reset the editing state
  };

  const deleteExpense = (index) => {
    setExpenses(expenses.filter((_, i) => i !== index));
  };

  return (
    <div>
      <ExpenseForm
        addExpense={addExpense}
        editExpense={editExpense}
        month={month}
        setMonth={setMonth}
        year={year}
        setYear={setYear}
        darkMode={darkMode}
        expenseToEdit={expenseToEdit}
      />
      <ExpenseList
        expenses={expenses}
        editExpense={editExpense}
        deleteExpense={deleteExpense}
        setExpenseToEdit={setExpenseToEdit} 
      />
    </div>
  );
};

export default ExpenseTracker;
