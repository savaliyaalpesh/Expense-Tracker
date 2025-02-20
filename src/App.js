import "./App.css";
import { useState} from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import ExpenseChart from "./components/ExpenseChart";
import YearlyExpenseChart from "./components/YearlyExpenseChart";
import Switch from "./components/Switch";

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [year] = useState(new Date().getFullYear());
  const [darkMode, setDarkMode] = useState(false);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.body.classList.toggle("dark", newMode);
  };
  

  // Add a new expense and update filtered expenses
  const handleAddExpense = (newExpense) => {
    setExpenses((prevExpenses) => {
      const updatedExpenses = [...prevExpenses, newExpense];
      filterExpenses(newExpense.date, updatedExpenses);
      return updatedExpenses;
    });
  };

  // Filter expenses by month and year
  const filterExpenses = (selectedDate, expensesList) => {
    if (!expensesList || expensesList.length === 0) {
      setFilteredExpenses([]);
      return;
    }

    const selectedMonth = new Date(selectedDate).getMonth();
    const selectedYear = new Date(selectedDate).getFullYear();

    const filtered = expensesList.filter((expense) => {
      if (!expense.date) return false;
      const expenseDate = new Date(expense.date);
      return (
        expenseDate.getMonth() === selectedMonth &&
        expenseDate.getFullYear() === selectedYear
      );
    });

    setFilteredExpenses(filtered);
  };

  // Edit an existing expense
  const editExpense = (index) => {
    const updatedTitle = prompt("Edit Title", expenses[index].title);
    const updatedAmount = prompt("Edit Amount", expenses[index].amount);
    if (updatedTitle && updatedAmount && !isNaN(updatedAmount)) {
      setExpenses(
        expenses.map((exp, idx) =>
          idx === index ? { ...exp, title: updatedTitle, amount: Number(updatedAmount) } : exp
        )
      );
    }
  };

  // Delete an expense
  const deleteExpense = (index) => {
    setExpenses(expenses.filter((_, idx) => idx !== index));
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center p-4 md:p-6 w-full 
        ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"} transition-all`}
    >
      <div className="w-full max-w-4xl">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-center sm:text-left mb-2 sm:mb-0">
            Expense Tracker
          </h1>
          <Switch darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        </div>

        {/* Expense Form */}
        <ExpenseForm
          addExpense={handleAddExpense}
          darkMode={darkMode}
          expenses={expenses}
          setFilteredExpenses={setFilteredExpenses}
        />

        {/* Expense List */}
        <div className="mt-6">
          <ExpenseList
            expenses={filteredExpenses}
            editExpense={editExpense}
            deleteExpense={deleteExpense}
            darkMode={darkMode}
          />
        </div>

        {/* Charts */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <ExpenseChart expenses={filteredExpenses} darkMode={darkMode}/>
          <YearlyExpenseChart expenses={expenses} year={year} darkMode={darkMode}/>
        </div>
      </div>
    </div>
  );
};

export default App;
