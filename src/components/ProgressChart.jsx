// src/components/ProgressChart.jsx

import React from 'react';
import {
  LineChart, // CHANGED: We'll use a LineChart to emphasize trends
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine, // NEW: Import ReferenceLine for showing the average
} from 'recharts';


const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="tooltip-label">{`Date: ${label}`}</p>
        <p className="tooltip-intro">{`Completions: ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

// This is a presentational component that receives the chart data as a prop.
function ProgressChart({ data }) {
  // If data is not yet available, we can render a placeholder.
  if (!data || data.length === 0) {
    return (
      <div className="chart-placeholder">
        <p>Not enough data to display a chart yet.</p>
        <p>Complete some habits to see your progress!</p>
      </div>
    );
  }

    // --- NEW: Calculate the average for our ReferenceLine ---
  const averageCompletions =
    data.reduce((total, item) => total + item.completions, 0) / data.length;

  return (
    // ResponsiveContainer is a crucial Recharts component.
    // It makes the chart responsive by scaling it to the size of its parent container.
    // The width and height percentages ensure it fills the space provided.
    <ResponsiveContainer width="100%" height={400}>
      {/* <BarChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      > */}

      <LineChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >

        {/* CartesianGrid adds the subtle grid lines to the background of the chart. */}
        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
        
        {/* XAxis defines the horizontal axis. 
            dataKey="date" tells it to use the 'date' property from our data objects for the labels. */}
        <XAxis dataKey="date" tick={{ fontSize: 12 }} interval= "preserveStartEnd" />
        
        {/* YAxis defines the vertical axis. 
            allowDecimals={false} ensures our tick marks are whole numbers (e.g., 1, 2, 3). */}
        <YAxis allowDecimals={false} />
        
        {/* Tooltip is the interactive popup that appears when you hover over a bar.
            It automatically displays the data for that point. */}
        {/* <Tooltip
          contentStyle={{
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(5px)',
            border: '1px solid #ccc',
            borderRadius: '8px',
          }}
          cursor={{ fill: 'rgba(206, 212, 218, 0.3)' }}
        />
         */}

         <Tooltip content={<CustomTooltip />} />
        {/* Legend adds a key to the chart, explaining what each bar color represents. */}
        <Legend />
        
        {/* The Bar component is what actually draws the bars.
            - dataKey="completions" tells it to use the 'completions' property from our data
              objects to determine the height of each bar.
            - fill="#8884d8" sets the color of the bars.
            - radius={[4, 4, 0, 0]} gives the top corners of the bars a slight rounded effect. */}
        {/* <Bar dataKey="completions" fill="#3b82f6" radius={[4, 4, 0, 0]} /> */}
          <ReferenceLine
          y={averageCompletions} // Set its position on the Y-axis
          label={{ 
            value: `Avg: ${averageCompletions.toFixed(1)}`, // The text to display
            position: 'insideTopLeft', // Position the label
            fill: '#767676', // Style the label text
            fontSize: 12
          }}
          stroke="#e67e22" // The color of the line
          strokeDasharray="4 4" // Make it a dashed line
        />

        <Line
          type="monotone"
          dataKey="completions"
          stroke="#3b82f6"
          strokeWidth={2}
          activeDot={{ r: 8 }}
        />

      </LineChart>
    </ResponsiveContainer>
  );
}

export default ProgressChart;
