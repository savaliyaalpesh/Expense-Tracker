import React, { useState, useEffect } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Cell,
  PieChart, Pie
} from "recharts";

const ExpenseChart = ({ expenses = [], darkMode = false }) => {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 640 : false
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Define category-wise colors
  const categoryColors = {
    Food: "#ff6384",
    Travel: "#36a2eb",
    Entertainment: "#e3b43d",
    Shopping: "#22b127",
    Other: "#9966ff",
  };

  // Ensure expenses exist before reducing
  const groupedExpenses = expenses.reduce((acc, exp) => {
    if (exp.category && typeof exp.amount === "number") {
      acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
    }
    return acc;
  }, {});

  // Convert grouped data into chart-friendly format
  const data = Object.keys(groupedExpenses).map((key) => ({
    name: key,
    value: groupedExpenses[key],
  }));

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
    <div
      className={"p-4 mb-4 border rounded shadow-md dark:bg-gray-800"}
    >
      <h2 className="text-lg sm:text-xl font-bold mb-2 text-center text-gray-800 dark:text-white">
        Expense Chart
      </h2>
      <div className="w-full h-[300px] sm:h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          {isMobile ? (
            <PieChart>
              <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={categoryColors[entry.name]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          ) : (
            <BarChart data={data} margin={{ top: 10, right: 100, bottom: 10, left: 0 }}>
              <XAxis dataKey="name" stroke={darkMode ? "#ffffff" : "#4B5563"} />
              <YAxis stroke={darkMode ? "#ffffff" : "#4B5563"} />
              <Tooltip  content={<CustomTooltip />}/>
              <Legend />
              <Bar dataKey="value">
                {data.map((entry, index) => (
                  <Cell key={`bar-${index}`} fill={categoryColors[entry.name]} />
                ))}
              </Bar>
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ExpenseChart;
