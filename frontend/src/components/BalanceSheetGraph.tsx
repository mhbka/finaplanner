import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { YearlyBalanceSheet } from '../types/financialBalanceElements';


interface BalanceSheetGraphProps {
    data: YearlyBalanceSheet[];
  }
  
const BalanceSheetGraph: React.FC<BalanceSheetGraphProps> = ({ data }) => {
    const [activeMetrics, setActiveMetrics] = useState({
      netIncome: true,
      expenses: true,
      netCashFlow: true,
      cumulativeNetWorth: true,
      investmentValue: false,
      assetValue: false
    });
  
    const formatCurrency = (value: number) => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(value);
    };
  
    const CustomTooltip = ({ active, payload, label }: any) => {
      if (active && payload && payload.length) {
        return (
          <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
            <p className="font-semibold text-gray-800 mb-2">{`Year: ${label}`}</p>
            {payload.map((entry: any, index: number) => (
              <p key={index} style={{ color: entry.color }} className="text-sm">
                {`${entry.name}: ${formatCurrency(entry.value)}`}
              </p>
            ))}
          </div>
        );
      }
      return null;
    };
  
    const toggleMetric = (metric: keyof typeof activeMetrics) => {
      setActiveMetrics(prev => ({
        ...prev,
        [metric]: !prev[metric]
      }));
    };
  
    const metrics = [
      { key: 'netIncome', label: 'Net Income', color: '#10B981', dataKey: 'income.net' },
      { key: 'expenses', label: 'Expenses', color: '#EF4444', dataKey: 'expenses.total' },
      { key: 'netCashFlow', label: 'Net Cash Flow', color: '#3B82F6', dataKey: 'netCashFlow' },
      { key: 'cumulativeNetWorth', label: 'Net Worth', color: '#8B5CF6', dataKey: 'cumulativeNetWorth' },
      { key: 'investmentValue', label: 'Investment Value', color: '#F59E0B', dataKey: 'investments.value' },
      { key: 'assetValue', label: 'Asset Value', color: '#06B6D4', dataKey: 'assets.value' },
    ];
  
    // Transform data to flatten nested properties
    const chartData = data.map(item => ({
      year: item.year,
      'income.net': item.income.net,
      'expenses.total': item.expenses.total,
      netCashFlow: item.netCashFlow,
      cumulativeNetWorth: item.cumulativeNetWorth,
      'investments.value': item.investments.value,
      'assets.value': item.assets.value
    }));
  
    return (
      <div className="w-full bg-white rounded-xl shadow-lg p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Financial Planning Overview</h2>
          <p className="text-gray-600">Year-by-year financial projections and net worth growth</p>
        </div>
  
        {/* Metric Toggle Buttons */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Toggle Metrics:</h3>
          <div className="flex flex-wrap gap-2">
            {metrics.map((metric) => (
              <button
                key={metric.key}
                onClick={() => toggleMetric(metric.key as keyof typeof activeMetrics)}
                className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeMetrics[metric.key as keyof typeof activeMetrics]
                    ? 'text-white shadow-md transform scale-105'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                style={{
                  backgroundColor: activeMetrics[metric.key as keyof typeof activeMetrics] 
                    ? metric.color 
                    : undefined
                }}
              >
                {metric.label}
              </button>
            ))}
          </div>
        </div>
  
        {/* Chart */}
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="year" 
                stroke="#6b7280"
                fontSize={12}
              />
              <YAxis 
                stroke="#6b7280"
                fontSize={12}
                tickFormatter={formatCurrency}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              
              {metrics.map((metric) => 
                activeMetrics[metric.key as keyof typeof activeMetrics] && (
                  <Line
                    key={metric.key}
                    type="monotone"
                    dataKey={metric.dataKey}
                    stroke={metric.color}
                    strokeWidth={2}
                    dot={{ fill: metric.color, strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, fill: metric.color }}
                    name={metric.label}
                  />
                )
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
  
        {/* Summary Stats */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {data.length > 0 && (
            <>
              <div className="bg-green-50 p-3 rounded-lg">
                <div className="text-sm text-green-600 font-medium">Final Net Worth</div>
                <div className="text-lg font-bold text-green-800">
                  {formatCurrency(data[data.length - 1].cumulativeNetWorth)}
                </div>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="text-sm text-blue-600 font-medium">Avg. Cash Flow</div>
                <div className="text-lg font-bold text-blue-800">
                  {formatCurrency(
                    data.reduce((sum, item) => sum + item.netCashFlow, 0) / data.length
                  )}
                </div>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg">
                <div className="text-sm text-purple-600 font-medium">Total Investment</div>
                <div className="text-lg font-bold text-purple-800">
                  {formatCurrency(data[data.length - 1].investments.value)}
                </div>
              </div>
              <div className="bg-cyan-50 p-3 rounded-lg">
                <div className="text-sm text-cyan-600 font-medium">Total Assets</div>
                <div className="text-lg font-bold text-cyan-800">
                  {formatCurrency(data[data.length - 1].assets.value)}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    );
  };
  
  export default BalanceSheetGraph;