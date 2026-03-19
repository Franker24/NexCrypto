import React, { useState, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const generateData = (points, startPrice, trendMultiplier) => {
  let price = startPrice;
  return Array.from({ length: points }).map((_, i) => {
    // trendMultiplier < 0 forces a downtrend, > 0 forces an uptrend
    price = price + (Math.random() - 0.5 + trendMultiplier) * 2000; 
    return { name: `Point ${i + 1}`, value: Math.max(0, price) };
  });
};

const PortfolioChart = () => {
  const [timeframe, setTimeframe] = useState('1M');
  
  const datasets = useMemo(() => ({
    '1D': generateData(24, 45000, -0.1),  // Simulate a drop today
    '1W': generateData(7, 43000, 0.05),
    '1M': generateData(30, 39000, 0.02),
    '1Y': generateData(12, 20000, 0.2),
  }), []);

  const data = datasets[timeframe];
  
  // Calculate if the chart is falling based on first and last point
  const isFalling = data.length > 0 && data[data.length - 1].value < data[0].value;
  const chartColor = isFalling ? 'var(--danger)' : 'var(--accent-primary)';
  const currentVal = data[data.length - 1].value;
  const difference = currentVal - data[0].value;
  const percentage = ((difference / data[0].value) * 100).toFixed(2);

  return (
    <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h3 style={{ margin: 0, color: 'var(--text-secondary)', fontWeight: '500' }}>Bitcoin (BTC)</h3>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', marginTop: '0.5rem' }}>
            <h2 style={{ margin: 0, fontSize: '2.5rem', fontWeight: 'bold' }}>${currentVal.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</h2>
            <span style={{ 
              color: chartColor, 
              background: isFalling ? 'rgba(255, 77, 77, 0.1)' : 'rgba(0, 255, 136, 0.1)', 
              padding: '6px 12px', 
              borderRadius: '20px', 
              fontWeight: 'bold',
              fontSize: '0.9rem'
            }}>
              {isFalling ? '' : '+'}{percentage}% ({timeframe})
            </span>
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '0.2rem', background: 'rgba(255,255,255,0.03)', padding: '0.3rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
          {['1D', '1W', '1M', '1Y'].map(tf => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              style={{
                padding: '0.5rem 1.2rem',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                background: timeframe === tf ? 'rgba(255,255,255,0.15)' : 'transparent',
                color: timeframe === tf ? '#fff' : 'var(--text-secondary)',
                transition: 'all 0.3s'
              }}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      <div style={{ height: '350px', width: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorPortfolio" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={chartColor} stopOpacity={0.6} />
                <stop offset="95%" stopColor={chartColor} stopOpacity={0} />
              </linearGradient>
            </defs>
            {/* Adding both horizontal and vertical grid lines as per request */}
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={true} horizontal={true} />
            <XAxis dataKey="name" stroke="var(--text-secondary)" tickLine={false} axisLine={false} minTickGap={30} fontSize={12} />
            <YAxis domain={['auto', 'auto']} stroke="var(--text-secondary)" tickLine={false} axisLine={false} tickFormatter={(val) => `$${(val / 1000).toFixed(0)}k`} fontSize={12} width={60} />
            <Tooltip
              contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '12px', backdropFilter: 'blur(10px)' }}
              itemStyle={{ color: 'var(--text-primary)', fontWeight: 'bold' }}
              labelStyle={{ color: 'var(--text-secondary)', marginBottom: '4px' }}
              formatter={(value) => [`$${value.toLocaleString(undefined, {minimumFractionDigits: 2})}`, 'Price']}
            />
            <Area type="monotone" dataKey="value" stroke={chartColor} strokeWidth={3} fillOpacity={1} fill="url(#colorPortfolio)" activeDot={{ r: 6, fill: chartColor, stroke: 'var(--bg-primary)', strokeWidth: 2 }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PortfolioChart;
