import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: '10:00', price: 42000 },
  { name: '11:00', price: 42400 },
  { name: '12:00', price: 41800 },
  { name: '13:00', price: 43200 },
  { name: '14:00', price: 43500 },
  { name: '15:00', price: 44100 },
  { name: '16:00', price: 43900 },
];

const ChartWidget = ({ coinName = 'Bitcoin', symbol = 'BTC', currentPrice = '$43,900.00', change = '+4.5%' }) => {
  const isPositive = change.startsWith('+');

  return (
    <div className="glass-panel chart-widget hover-lift" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
      <div className="chart-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div>
          <h3 style={{ margin: 0, fontSize: '1.2rem' }}>{coinName} ({symbol})</h3>
          <h2 style={{ margin: '0.2rem 0', fontSize: '1.8rem' }}>{currentPrice}</h2>
        </div>
        <div style={{ textAlign: 'right' }}>
          <span style={{ 
            color: isPositive ? 'var(--success)' : 'var(--danger)',
            background: isPositive ? 'rgba(0, 255, 136, 0.1)' : 'rgba(255, 77, 77, 0.1)',
            padding: '4px 8px', borderRadius: '8px', fontWeight: 'bold'
          }}>
            {change}
          </span>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: '0.4rem' }}>Past 24h</p>
        </div>
      </div>
      
      <div style={{ flex: 1, minHeight: '250px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={isPositive ? 'var(--success)' : 'var(--danger)'} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={isPositive ? 'var(--success)' : 'var(--danger)'} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis dataKey="name" stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis domain={['auto', 'auto']} stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val/1000}k`} />
            <Tooltip 
              contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '8px', backdropFilter: 'blur(10px)' }}
              itemStyle={{ color: 'var(--text-primary)' }}
            />
            <Area type="monotone" dataKey="price" stroke={isPositive ? 'var(--success)' : 'var(--danger)'} strokeWidth={2} fillOpacity={1} fill="url(#colorPrice)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartWidget;
