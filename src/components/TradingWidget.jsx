import React, { useState } from 'react';

const cryptoPrices = {
  BTC: 43900.50,
  ETH: 2240.20,
  SOL: 98.20,
  USDT: 1.00,
  ADA: 0.48,
  XRP: 0.52,
  BNB: 310.40
};

const TradingWidget = ({ initialCrypto = 'BTC' }) => {
  const [type, setType] = useState('buy');
  const [amount, setAmount] = useState('');
  const [crypto, setCrypto] = useState(initialCrypto);
  const [status, setStatus] = useState('idle'); // idle, loading, success

  const handleExecute = () => {
    if (!amount || parseFloat(amount) <= 0) return;
    setStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setAmount('');
    }, 1200);
  };

  const currentPrice = cryptoPrices[crypto];
  const approxAmount = amount ? (parseFloat(amount) / currentPrice).toFixed(6) : '0.00';

  if (status === 'success') {
    return (
      <div className="glass-panel trading-widget fade-in" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '380px' }}>
        <div style={{ 
          width: '70px', height: '70px', background: 'var(--success)', borderRadius: '50%', 
          display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', 
          boxShadow: '0 0 30px rgba(0,255,136,0.3)' 
        }}>
          <svg width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="var(--bg-primary)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <h3 style={{ marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '1.4rem' }}>¡Operación Exitosa!</h3>
        <p style={{ color: 'var(--text-secondary)', textAlign: 'center', fontSize: '0.95rem', lineHeight: '1.5' }}>
          Tu orden de {type === 'buy' ? 'compra' : 'venta'} por {crypto} se ejecutó correctamente en el mercado.
        </p>
        <button 
          onClick={() => setStatus('idle')} 
          className="hover-lift"
          style={{ 
            marginTop: '2rem', padding: '0.8rem 1.8rem', background: 'transparent', 
            border: '1px solid var(--accent-secondary)', color: 'var(--accent-secondary)', 
            borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold', transition: 'all 0.3s' 
          }}
          onMouseOver={(e) => { e.currentTarget.style.background = 'var(--accent-secondary)'; e.currentTarget.style.color = 'var(--bg-primary)'; }}
          onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--accent-secondary)'; }}
        >
          Hacer otro Trade
        </button>
      </div>
    );
  }

  return (
    <div className="glass-panel trading-widget" style={{ padding: '1.5rem', minHeight: '380px', display: 'flex', flexDirection: 'column' }}>
      <h3 style={{ marginBottom: '1.5rem', fontWeight: '600' }}>Trade rápido</h3>
      
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', background: 'rgba(0,0,0,0.2)', padding: '0.4rem', borderRadius: '12px' }}>
        <button 
          onClick={() => setType('buy')}
          style={{ 
            flex: 1, padding: '0.8rem', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold',
            background: type === 'buy' ? 'var(--success)' : 'transparent',
            color: type === 'buy' ? 'var(--bg-primary)' : 'var(--text-secondary)',
            transition: 'all 0.3s'
          }}>Buy</button>
        <button 
          onClick={() => setType('sell')}
          style={{ 
            flex: 1, padding: '0.8rem', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold',
            background: type === 'sell' ? 'var(--danger)' : 'transparent',
            color: type === 'sell' ? '#fff' : 'var(--text-secondary)',
            transition: 'all 0.3s'
          }}>Sell</button>
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <label style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Amount (USD)</label>
          <label style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Asset</label>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', padding: '0.5rem 1rem', flex: 1 }}>
            <span style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginRight: '8px' }}>$</span>
            <input 
              type="number" 
              placeholder="0.00" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={{ 
                background: 'transparent', border: 'none', color: '#fff', fontSize: '1.2rem', width: '100%', outline: 'none'
              }} 
            />
          </div>
          <select 
            value={crypto}
            onChange={(e) => setCrypto(e.target.value)}
            style={{ 
              background: 'rgba(255,255,255,0.1)', color: '#fff', border: 'none', borderLeft: '1px solid var(--border-color)',
              padding: '1rem', outline: 'none', fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem',
              appearance: 'none', borderRadius: '0', textAlign: 'center', minWidth: '80px'
            }}
          >
            {Object.keys(cryptoPrices).map(coin => <option key={coin} value={coin} style={{ color: '#000' }}>{coin}</option>)}
          </select>
        </div>
      </div>

      <div style={{ marginBottom: 'auto' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          {type === 'buy' ? 'You will receive (approx)' : 'You are selling (approx)'}
        </label>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', padding: '1rem', border: '1px solid var(--border-color)' }}>
          <span style={{ fontSize: '1.2rem', fontWeight: '600', color: isNaN(approxAmount) ? 'var(--text-secondary)' : '#fff' }}>
            {isNaN(approxAmount) ? '0.00' : approxAmount}
          </span>
          <span style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>{crypto}</span>
        </div>
        <div style={{ textAlign: 'right', marginTop: '0.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
          1 {crypto} = ${currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </div>
      </div>

      <button onClick={handleExecute} className="hover-lift" disabled={status === 'loading'} style={{ 
        width: '100%', padding: '1.2rem', borderRadius: '12px', border: 'none', cursor: status === 'loading' ? 'not-allowed' : 'pointer',
        background: type === 'buy' ? 'var(--success)' : 'var(--danger)',
        color: type === 'buy' ? 'var(--bg-primary)' : '#fff',
        fontSize: '1.1rem', fontWeight: 'bold', marginTop: '1.5rem',
        boxShadow: `0 4px 15px ${type === 'buy' ? 'rgba(0,255,136,0.2)' : 'rgba(255,77,77,0.2)'}`,
        opacity: status === 'loading' ? 0.7 : 1,
        transition: 'all 0.3s'
      }}>
        {status === 'loading' ? 'Procesando en la red...' : (type === 'buy' ? `Buy ${crypto}` : `Sell ${crypto}`)}
      </button>
    </div>
  );
};

export default TradingWidget;
