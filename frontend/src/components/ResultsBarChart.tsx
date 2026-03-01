import React from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

interface ResultsBarChartProps {
  data: { name: string; value: number }[]
  barColor?: string
}

const ResultsBarChart: React.FC<ResultsBarChartProps> = ({
  data,
  barColor = '#3498db',
}) => {
// Return nothing if there’s no data to avoid errors
  if (!data || data.length === 0) {
    return null
  }

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <BarChart
        // The array of question scores
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis domain={[0, 5]} allowDecimals={false}/>
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill={barColor} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default ResultsBarChart