import './App.css';
import { useState, useEffect } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import ExpenseChart from "./components/ExpenseChart";
import YearlyExpenseChart from "./components/YearlyExpenseChart";
import Switch from "./components/Switch";

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [month, setMonth] = useState("January");
  const [year, setYear] = useState(new Date().getFullYear());
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    setFilteredExpenses(expenses.filter((exp) => exp.month === month && exp.year === year));
  }, [expenses, month, year]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark", !darkMode);
  };

  const addExpense = (expense) => {
    if (expense && expense.title && expense.amount && !isNaN(expense.amount)) {
      setExpenses([...expenses, expense]);
    }
  };

  const editExpense = (index) => {
    const updatedTitle = prompt("Edit Title", expenses[index].title);
    const updatedAmount = prompt("Edit Amount", expenses[index].amount);

    if (updatedTitle && updatedAmount && !isNaN(updatedAmount)) {
      const updatedExpenses = expenses.map((exp, idx) =>
        idx === index ? { ...exp, title: updatedTitle, amount: Number(updatedAmount) } : exp
      );
      setExpenses(updatedExpenses);
    }
  };

  const deleteExpense = (index) => {
    const updatedExpenses = expenses.filter((_, idx) => idx !== index);
    setExpenses(updatedExpenses);
  };

  return (
    <div className={`min-h-screen flex flex-col items-center p-4 md:p-6 w-full 
        ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'} transition-all`}>
      
      <div className="w-full max-w-4xl">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-center sm:text-left mb-2 sm:mb-0 header-text">Expense Tracker</h1>
          <Switch darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        </div>

        <ExpenseForm 
          addExpense={addExpense} 
          month={month} setMonth={setMonth} 
          year={year} setYear={setYear} 
          darkMode={darkMode} 
        />

        <div className="mt-6">
          <ExpenseList 
            expenses={filteredExpenses} 
            editExpense={editExpense} 
            deleteExpense={deleteExpense} 
            darkMode={darkMode} 
          />
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <ExpenseChart expenses={filteredExpenses} darkMode={darkMode} />
          <YearlyExpenseChart expenses={expenses} year={year} darkMode={darkMode} />
        </div>
      </div>
    </div>
  );
};

export default App;
