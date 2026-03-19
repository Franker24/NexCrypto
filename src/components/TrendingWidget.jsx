import React from 'react';
import { ArrowUpRight, ArrowDownRight, Flame } from 'lucide-react';

const trendingData = [
  { id: 1, name: 'Avalanche', symbol: 'AVAX', change: 12.4, isUp: true },
  { id: 2, name: 'Solana', symbol: 'SOL', change: 5.2, isUp: true },
  { id: 3, name: 'Polygon', symbol: 'MATIC', change: -4.1, isUp: false }
];

const TrendingWidget = () => (
    <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.5rem' }}>
        <Flame color="var(--accent-primary)" size={20} />
        <h3 style={{ margin: 0, fontWeight: '600', fontSize: '1.1rem' }}>Top Movimientos</h3>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
        {trendingData.map(coin => (
          <div key={coin.id} className="hover-lift" style={{ 
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
            padding: '1rem', background: 'rgba(255,255,255,0.02)', 
            borderRadius: '12px', border: '1px solid var(--border-color)',
            cursor: 'pointer'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ 
                width: '35px', height: '35px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', 
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', 
                fontSize: '0.85rem', color: 'var(--text-primary)', border: '1px solid var(--border-color)'
              }}>
                {coin.symbol[0]}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontWeight: '600', fontSize: '0.95rem' }}>{coin.name}</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{coin.symbol}</span>
              </div>
            </div>
            <div style={{ color: coin.isUp ? 'var(--success)' : 'var(--danger)', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.9rem' }}>
              {coin.isUp ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
              {Math.abs(coin.change)}%
            </div>
          </div>
        ))}
      </div>
    </div>
);

export default TrendingWidget;
