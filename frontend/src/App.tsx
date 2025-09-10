import { useState } from 'react';
import TimelineView from './components/TimelineView'
import type { FinancialData } from './types/financialElements';
import { SAMPLE_DATA } from './utils/sampleData';
import BalanceSheetTable from './components/BalanceSheetTable';

function App() {
  const [data, setData] = useState<FinancialData>(SAMPLE_DATA);
  const [startYear, setStartYear] = useState<number>(2025);
  const [endYear, setEndYear] = useState<number>(2060);
  const [inflationRate, setInflationRate] = useState<number>(0.03);
  const plan = { data, startYear, endYear, inflationRate };
  
  return (
  <div className="p-6 bg-gray-50">
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Financial Planner</h1>
      <TimelineView startYear={startYear} endYear={endYear} data={data} setData={setData}/>
      <BalanceSheetTable plan={plan} />
    </div>
  </div>
);
}

export default App
