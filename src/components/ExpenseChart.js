import React, { useState, useEffect } from "react";
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Cell, 
  PieChart, Pie 
} from "recharts";

const ExpenseChart = ({ expenses, darkMode }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useEffect(() => {
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
    Entertainment: "#ffcd56",
    Shopping: "#4bc0c0",
    Other: "#9966ff",
  };

  // Aggregate expenses by category
  const data = expenses?.reduce((acc, { category, amount }) => {
    acc[category] = (acc[category] || 0) + amount;
    return acc;
  }, {});

  const chartData = Object.keys(data || {}).map((key) => ({
    name: key,
    value: data[key],
    fill: categoryColors[key] || "#8884d8",
  }));

  // Ensure we have valid data
  if (!chartData.length) {
    return <p className="text-center text-gray-500">No data available</p>;
  }

  // Custom Tooltip Component
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-700 p-2 border rounded shadow-md">
          <p className="text-sm font-semibold text-gray-900 dark:text-white">{payload[0].payload.name}</p>
          <p className="text-xs text-gray-600 dark:text-gray-300">Value: {payload[0].value}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-4 mb-4 border rounded shadow-md dark:bg-gray-800">
      <h2 className="text-lg sm:text-xl font-bold mb-2 text-center text-gray-800 dark:text-white">
        Expense Chart by Category
      </h2>

      <div className="w-full h-[300px] sm:h-[350px] flex flex-col items-center">
        <ResponsiveContainer width="100%" height="100%">
          {isMobile ? (
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          ) : (
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
              <XAxis
                dataKey="name"
                tick={{ fill: darkMode ? "#ffffff" : "#4B5563" }}
              />
              <YAxis
                tick={{ fill: darkMode ? "#ffffff" : "#4B5563" }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="value">
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          )}
        </ResponsiveContainer>

        {isMobile && (
          <div className="mt-4 text-left">
            {chartData.map((entry, index) => (
              <div key={index} className="inline-block mx-2 text-sm">
                <span 
                  className="inline-block w-4 h-4 mr-1 rounded-full" 
                  style={{ backgroundColor: entry.fill }}
                ></span>
                {entry.name} ({((entry.value / expenses.reduce((sum, e) => sum + e.amount, 0)) * 100).toFixed(1)}%)
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseChart;
