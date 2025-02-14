import React from "react";

const ExpenseList = ({ expenses, editExpense, deleteExpense }) => {
  const totalExpense = expenses.reduce((sum, exp) => sum + parseFloat(exp.amount), 0);

  return (
    <div className="p-4 border rounded mb-4 shadow-md dark:bg-gray-800">
      <h2 className="text-lg sm:text-xl font-bold mb-4 text-center text-gray-800 dark:text-white header-text">
        Expense List
      </h2>
      {expenses.length === 0 ? (
        <p className="input-text text-center text-gray-500 dark:text-gray-400">No expenses added yet.</p>
      ) : (
        <div className="space-y-3">
          {expenses.map((exp, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row justify-between items-center border p-3 rounded-md dark:bg-gray-700"
            >
              <span className="text-gray-800 dark:text-white text-sm sm:text-base input-text">
                {exp.title} - ${exp.amount} ({exp.category})
              </span>
              <div className="mt-2 sm:mt-0 flex gap-2">
                <button
                  className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded transition"
                  onClick={() => editExpense(index)}
                >
                  Edit
                </button>
                <button
                  className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded transition"
                  onClick={() => deleteExpense(index)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {expenses.length > 0 && (
        <div className="mt-4 text-center text-gray-800 dark:text-white font-bold">
          Total Expense: ${totalExpense.toFixed(2)}
        </div>
      )}
    </div>
  );
};

export default ExpenseList;
