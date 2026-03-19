import React from 'react';

const newsItems = [
  { id: 1, title: 'Bitcoin Surges Past $43K as Institutional Adoption Grows', time: '2h ago', source: 'CoinDesk' },
  { id: 2, title: 'Ethereum Foundation Announces Major Network Upgrade Timeline', time: '4h ago', source: 'CryptoNews' },
  { id: 3, title: 'New Web3 Gaming Projects Are Driving NFT Market Recovery', time: '5h ago', source: 'Decrypt' },
  { id: 4, title: 'Global Regulators Propose Unified Framework for Stablecoins', time: '8h ago', source: 'Bloomberg Crypto' },
];

const NewsWidget = () => {
  return (
    <div className="glass-panel news-widget" style={{ padding: '1.5rem', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h3 style={{ margin: 0, fontWeight: '600' }}>Market News</h3>
        <span style={{ color: 'var(--accent-secondary)', fontSize: '0.9rem', cursor: 'pointer' }}>View All</span>
      </div>
      
      <div className="news-list" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', overflowY: 'auto' }}>
        {newsItems.map(item => (
          <div key={item.id} className="news-item hover-lift" style={{ 
            padding: '1rem', 
            background: 'rgba(255,255,255,0.02)', 
            borderRadius: '12px', 
            border: '1px solid var(--border-color)',
            cursor: 'pointer'
          }}>
            <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.95rem', lineHeight: '1.4' }}>{item.title}</h4>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
              <span>{item.source}</span>
              <span>{item.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsWidget;
