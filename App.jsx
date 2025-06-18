import React, { useState } from 'react';

export default function App() {
  const [float, setFloat] = useState(60);
  const [yieldRate, setYieldRate] = useState(4.5);
  const [distributionPct, setDistributionPct] = useState(50);
  const [result, setResult] = useState(null);

  const calculate = () => {
    const floatUSD = float * 1_000_000_000;
    const revenue = floatUSD * (yieldRate / 100);
    const distributionCost = revenue * (distributionPct / 100);
    const operatingExpenses = 500_000_000;
    const ebit = revenue - distributionCost - operatingExpenses;
    const taxes = ebit > 0 ? ebit * 0.20 : 0;
    const netIncome = ebit - taxes;

    setResult({
      revenue: revenue / 1_000_000_000,
      distributionCost: distributionCost / 1_000_000_000,
      ebit: ebit / 1_000_000_000,
      netIncome: netIncome / 1_000_000_000,
    });
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: 'auto' }}>
      <h1>Circle Financial Forecast Tool</h1>
      <div>
        <label>USDC Float (Billions):</label>
        <input type='number' value={float} onChange={e => setFloat(parseFloat(e.target.value))} />
      </div>
      <div>
        <label>Reserve Yield (%):</label>
        <input type='number' value={yieldRate} onChange={e => setYieldRate(parseFloat(e.target.value))} />
      </div>
      <div>
        <label>Distribution Cost (%):</label>
        <input type='number' value={distributionPct} onChange={e => setDistributionPct(parseFloat(e.target.value))} />
      </div>
      <button onClick={calculate}>Calculate</button>

      {result && (
        <div style={{ marginTop: '1rem' }}>
          <p>Revenue: ${result.revenue.toFixed(2)} B</p>
          <p>Distribution Cost: ${result.distributionCost.toFixed(2)} B</p>
          <p>EBIT: ${result.ebit.toFixed(2)} B</p>
          <p>Net Income: ${result.netIncome.toFixed(2)} B</p>
        </div>
      )}
    </div>
  );
}
