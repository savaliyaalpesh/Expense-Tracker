import React, { useState, useEffect } from "react";
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, Cell, 
  ResponsiveContainer, PieChart, Pie 
} from "recharts";

const YearlyExpenseChart = ({ expenses, year, darkMode }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const monthColors = {
    January: "#FF5733", February: "#FF8D1A", March: "#FFC300", April: "#b3f43a",
    May: "#33FF57", June: "#1AFFD5", July: "#3385FF", August: "#9D33FF",
    September: "#FF33A1", October: "#FF5733", November: "#C70039", December: "#900C3F",
  };

  const monthNames = Object.keys(monthColors);

  const filteredExpenses = expenses.filter(
    (exp) => new Date(exp.date).getFullYear() === year
  );

  const monthlyData = monthNames.map((month) => {
    const totalExpense = filteredExpenses
      .filter((exp) => new Date(exp.date).toLocaleString("default", { month: "long" }) === month)
      .reduce((sum, exp) => sum + (parseFloat(exp.amount) || 0), 0);

    return { name: month, value: totalExpense, color: monthColors[month] };
  }).filter((month) => month.value > 0);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-2 rounded shadow-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200">
          <p className="font-bold">{payload[0].payload.name}</p>
          <p>Expense: ${payload[0].value}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-4 mb-4 border rounded shadow-md dark:bg-gray-800">
      <h2 className="text-lg sm:text-xl font-bold mb-2 text-center text-gray-800 dark:text-white">
        Yearly Expenses - {year}
      </h2>
      <div className="w-full h-[300px] sm:h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          {isMobile ? (
            <PieChart>
              <Pie
                data={monthlyData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
              >
                {monthlyData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
          ) : (
            <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
              <XAxis dataKey="name" tick={{ fill: darkMode ? "#ffffff" : "#4B5563" }} />
              <YAxis tick={{ fill: darkMode ? "#ffffff" : "#4B5563" }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="value">
                {monthlyData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default YearlyExpenseChart;
