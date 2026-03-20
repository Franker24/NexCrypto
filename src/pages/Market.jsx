import React, { useState, useMemo } from 'react';
import { ArrowUpRight, ArrowDownRight, ChevronDown, Activity, Maximize2, X, Briefcase, BarChart2, DollarSign } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, YAxis, XAxis, Tooltip, CartesianGrid } from 'recharts';
import TradingWidget from '../components/TradingWidget';
import { useTranslation } from 'react-i18next';

const generateMockData = (basePrice, isUp) => {
  let p = basePrice;
  return Array.from({ length: 48 }).map((_, i) => {
    p = p + (Math.random() - (isUp ? 0.45 : 0.55)) * (basePrice * 0.02);
    const d = new Date();
    d.setHours(d.getHours() - (48 - i));
    
    return { 
      name: d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), 
      value: Math.max(0, p) 
    };
  });
};

const cryptoData = [
  { id: 'c1', name: 'Bitcoin', symbol: 'BTC', price: 43900.50, change: 4.5, cap: '850B', vol: '32B', icon: 'https://assets.coincap.io/assets/icons/btc@2x.png', type: 'crypto' },
  { id: 'c2', name: 'Ethereum', symbol: 'ETH', price: 2240.20, change: 2.1, cap: '270B', vol: '14B', icon: 'https://assets.coincap.io/assets/icons/eth@2x.png', type: 'crypto' },
  { id: 'c3', name: 'Tether', symbol: 'USDT', price: 1.00, change: 0.01, cap: '95B', vol: '45B', icon: 'https://assets.coincap.io/assets/icons/usdt@2x.png', type: 'crypto' },
  { id: 'c4', name: 'Solana', symbol: 'SOL', price: 98.20, change: -1.4, cap: '42B', vol: '3.5B', icon: 'https://assets.coincap.io/assets/icons/sol@2x.png', type: 'crypto' },
  { id: 'c5', name: 'Binance Coin', symbol: 'BNB', price: 310.40, change: 0.8, cap: '48B', vol: '1.2B', icon: 'https://assets.coincap.io/assets/icons/bnb@2x.png', type: 'crypto' },
  { id: 'c6', name: 'XRP', symbol: 'XRP', price: 0.52, change: -0.5, cap: '28B', vol: '900M', icon: 'https://assets.coincap.io/assets/icons/xrp@2x.png', type: 'crypto' }
];

const cedearData = [
  { id: 'ce1', name: 'Apple Inc.', symbol: 'AAPL', price: 185.20, change: 1.2, cap: '2.8T', vol: '1.5B', icon: 'https://logo.clearbit.com/apple.com', type: 'cedear' },
  { id: 'ce2', name: 'Tesla Inc.', symbol: 'TSLA', price: 198.50, change: -2.4, cap: '630B', vol: '2.1B', icon: 'https://logo.clearbit.com/tesla.com', type: 'cedear' },
  { id: 'ce3', name: 'Amazon', symbol: 'AMZN', price: 172.10, change: 0.8, cap: '1.7T', vol: '900M', icon: 'https://logo.clearbit.com/amazon.com', type: 'cedear' },
  { id: 'ce4', name: 'Microsoft', symbol: 'MSFT', price: 405.00, change: 1.5, cap: '3.0T', vol: '1.8B', icon: 'https://logo.clearbit.com/microsoft.com', type: 'cedear' },
  { id: 'ce5', name: 'Coca-Cola', symbol: 'KO', price: 60.10, change: 0.3, cap: '260B', vol: '120M', icon: 'https://logo.clearbit.com/cocacola.com', type: 'cedear' },
  { id: 'ce6', name: 'Disney', symbol: 'DIS', price: 105.40, change: -0.7, cap: '190B', vol: '210M', icon: 'https://logo.clearbit.com/disney.com', type: 'cedear' },
];

const stocksData = [
  { id: 's1', name: 'Nvidia Corp', symbol: 'NVDA', price: 822.40, change: 5.8, cap: '2.0T', vol: '4.5B', icon: 'https://logo.clearbit.com/nvidia.com', type: 'stock' },
  { id: 's2', name: 'Netflix', symbol: 'NFLX', price: 588.20, change: 0.5, cap: '255B', vol: '400M', icon: 'https://logo.clearbit.com/netflix.com', type: 'stock' },
  { id: 's3', name: 'Alphabet', symbol: 'GOOGL', price: 138.90, change: -1.2, cap: '1.7T', vol: '1.1B', icon: 'https://logo.clearbit.com/google.com', type: 'stock' },
  { id: 's4', name: 'Meta Platforms', symbol: 'META', price: 474.30, change: 2.1, cap: '1.2T', vol: '800M', icon: 'https://logo.clearbit.com/meta.com', type: 'stock' },
  { id: 's5', name: 'YPF S.A.', symbol: 'YPF', price: 19.40, change: -0.8, cap: '7.6B', vol: '24M', icon: 'https://logo.clearbit.com/ypf.com', type: 'stock' },
  { id: 's6', name: 'Mercado Libre', symbol: 'MELI', price: 1540.20, change: 3.4, cap: '78B', vol: '280M', icon: 'https://logo.clearbit.com/mercadolibre.com', type: 'stock' },
  { id: 's7', name: 'Pampa Energía', symbol: 'PAMP', price: 45.30, change: 1.1, cap: '2.5B', vol: '15M', icon: 'https://logo.clearbit.com/pampaenergia.com', type: 'stock' }
];

const allMarketData = [...cryptoData, ...cedearData, ...stocksData];

const MiniChart = ({ coinName, symbol, data, isPositive, category }) => {
  const color = isPositive ? 'var(--success)' : 'var(--danger)';
  const minPrice = Math.min(...data.map(d => d.value));
  const maxPrice = Math.max(...data.map(d => d.value));
  const currentPrice = data[data.length - 1].value;
  const initialPrice = data[0].value;
  const realChange = (((currentPrice - initialPrice) / initialPrice) * 100).toFixed(2);

  const getTradingViewSymbol = () => {
    if (category === 'crypto') return `BINANCE:${symbol}USDT`;
    if (category === 'cedear' || category === 'stock') return `NASDAQ:${symbol}`;
    return symbol;
  };

  return (
    <div className="mini-chart-container" style={{ padding: '1.2rem', background: 'rgba(0,0,0,0.25)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.04)', boxShadow: 'inset 0 0 30px rgba(0,0,0,0.5)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', marginBottom: '0.8rem' }}>
            <Activity size={18} color={color} />
            <span style={{ fontWeight: 'bold', fontSize: '0.95rem', letterSpacing: '1px', textTransform: 'uppercase' }}>Análisis 48h - {symbol}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
            <h2 style={{ margin: 0, fontSize: '2.2rem', color: 'var(--text-primary)' }}>
              ${currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })}
            </h2>
            <span style={{ 
              color: color, 
              fontWeight: 'bold', 
              background: isPositive ? 'rgba(0,255,136,0.1)' : 'rgba(255,77,77,0.1)', 
              padding: '6px 12px', 
              borderRadius: '20px' 
            }}>
              {isPositive ? '+' : ''}{realChange}%
            </span>
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '2rem', background: 'rgba(255,255,255,0.03)', padding: '1.2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <div>
            <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Máximo Pico</span>
            <span style={{ fontWeight: 'bold', color: 'var(--text-primary)', fontSize: '1.1rem' }}>${maxPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })}</span>
          </div>
          <div style={{ width: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
          <div>
            <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Soporte Más Bajo</span>
            <span style={{ fontWeight: 'bold', color: 'var(--text-primary)', fontSize: '1.1rem' }}>${minPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })}</span>
          </div>
        </div>
      </div>

      <div style={{ height: '320px', width: '100%', marginTop: '1rem' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id={`fill_${symbol}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.5}/>
                <stop offset="95%" stopColor={color} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="4 4" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis dataKey="name" stroke="var(--text-secondary)" fontSize={11} tickLine={false} axisLine={false} minTickGap={40} dy={15} />
            <YAxis domain={['dataMin - (dataMax-dataMin)*0.1', 'dataMax + (dataMax-dataMin)*0.1']} orientation="right" stroke="var(--text-secondary)" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(val) => val >= 1000 ? `$${(val / 1000).toFixed(1)}k` : `$${val.toPrecision(3)}`} width={65} dx={10} />
            <Tooltip contentStyle={{ background: 'rgba(11, 14, 20, 0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }} itemStyle={{ color: '#fff', fontWeight: 'bold', fontSize: '1.2rem' }} labelStyle={{ color: 'var(--accent-secondary)', marginBottom: '5px', fontWeight: 'bold' }} formatter={(val) => [`$${val.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })}`, 'Precio Mercado']} />
            <Area type="monotone" dataKey="value" stroke={color} strokeWidth={3} fill={`url(#fill_${symbol})`} activeDot={{ r: 7, fill: color, stroke: 'var(--bg-primary)', strokeWidth: 3 }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
        <button 
          onClick={(e) => { e.stopPropagation(); window.open(`https://es.tradingview.com/chart/?symbol=${getTradingViewSymbol()}`, '_blank'); }}
          className="hover-lift" style={{ 
          display: 'flex', alignItems: 'center', gap: '8px', padding: '0.8rem 1.8rem', 
          background: 'var(--accent-secondary)', color: 'var(--bg-primary)', 
          border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', 
          boxShadow: '0 5px 20px rgba(0, 204, 255, 0.25)', fontSize: '0.95rem' 
        }}>
          <Maximize2 size={18} /> Abrir en Terminal TradingView
        </button>
      </div>
    </div>
  );
};

// Componente de Icono Resiliente con Fallback a Iniciales
const AssetIcon = ({ src, alt, symbol, size = 42 }) => {
  const [error, setError] = useState(false);
  
  // Si no hay src o hubo un error, mostramos el placeholder
  if (error || !src) {
    return (
      <div style={{ 
        width: size, height: size, borderRadius: '50%', 
        background: 'linear-gradient(135deg, #2a2e39, #1a1e26)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', 
        fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--accent-secondary)',
        border: '1px solid rgba(255,255,255,0.05)',
        boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
      }}>
        {symbol.substring(0, 2).toUpperCase()}
      </div>
    );
  }

  return (
    <div style={{ 
      background: '#fff', borderRadius: '12px', padding: '6px', 
      width: size, height: size, display: 'flex', alignItems: 'center', 
      justifyContent: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
      overflow: 'hidden'
    }}>
      <img 
        src={src} 
        alt={alt} 
        onError={() => setError(true)} 
        style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
      />
    </div>
  );
};

const Market = () => {
  const [activeTab, setActiveTab] = useState('crypto');
  const [expandedId, setExpandedId] = useState(null);
  const [tradeModalCoin, setTradeModalCoin] = useState(null);
  const { t } = useTranslation();

  // Usamos Google S2 Favicon service para máxima fiabilidad en los logos
  const getLogo = (domain) => `https://www.google.com/s2/favicons?sz=128&domain=${domain}`;

  const cryptoItems = cryptoData;
  const cedearItems = [
    { ...cedearData[0], icon: getLogo('apple.com') },
    { ...cedearData[1], icon: getLogo('tesla.com') },
    { ...cedearData[2], icon: getLogo('amazon.com') },
    { ...cedearData[3], icon: getLogo('microsoft.com') },
    { ...cedearData[4], icon: getLogo('coca-cola.com') },
    { ...cedearData[5], icon: getLogo('disney.com') },
  ];
  const stockItems = [
    { ...stocksData[0], icon: getLogo('nvidia.com') },
    { ...stocksData[1], icon: getLogo('netflix.com') },
    { ...stocksData[2], icon: getLogo('google.com') },
    { ...stocksData[3], icon: getLogo('meta.com') },
    { ...stocksData[4], icon: getLogo('ypf.com') },
    { ...stocksData[5], icon: getLogo('mercadolibre.com') },
    { ...stocksData[6], icon: getLogo('pampaenergia.com') },
  ];

  // Generamos los datos solo una vez para todos los mercados para evitar que el gráfico titile
  const chartsData = useMemo(() => {
    const data = {};
    [...cryptoItems, ...cedearItems, ...stockItems].forEach(asset => {
      data[asset.id] = generateMockData(asset.price, asset.change >= 0);
    });
    return data;
  }, []);

  const getActiveData = () => {
    if (activeTab === 'crypto') return cryptoItems;
    if (activeTab === 'cedear') return cedearItems;
    if (activeTab === 'stock') return stockItems;
    return [];
  };

  const toggleRow = (id) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  const activeDataList = getActiveData();

  return (
    <div className="market-page fade-in">
      <header className="dashboard-header" style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2.4rem', margin: 0, color: 'var(--text-primary)' }}>{t('market.title')}</h1>
        <p className="text-secondary" style={{ fontSize: '1.1rem', margin: '0.5rem 0 0' }}>{t('market.subtitle')}</p>
      </header>

      {/* Tabs de Navegación del Mercado */}
      <div className="market-tabs-container" style={{ 
        display: 'flex', gap: '0.8rem', marginBottom: '2rem', 
        padding: '0.4rem', background: 'rgba(255,255,255,0.02)', 
        borderRadius: '16px', overflowX: 'auto', scrollbarWidth: 'none'
      }}>
        <button onClick={() => { setActiveTab('crypto'); setExpandedId(null); }} className="market-tab-btn" style={{
          display: 'flex', alignItems: 'center', gap: '8px', padding: '0.8rem 1.2rem', border: 'none', borderRadius: '12px',
          background: activeTab === 'crypto' ? 'var(--accent-primary)' : 'transparent',
          color: activeTab === 'crypto' ? 'var(--bg-primary)' : 'var(--text-secondary)',
          fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.3s', whiteSpace: 'nowrap', flex: 1, justifyContent: 'center'
        }}>
          <DollarSign size={18} /> {t('market.tabCrypto', 'Criptomonedas')}
        </button>
        <button onClick={() => { setActiveTab('cedear'); setExpandedId(null); }} className="market-tab-btn" style={{
          display: 'flex', alignItems: 'center', gap: '8px', padding: '0.8rem 1.2rem', border: 'none', borderRadius: '12px',
          background: activeTab === 'cedear' ? 'var(--accent-secondary)' : 'transparent',
          color: activeTab === 'cedear' ? 'var(--bg-primary)' : 'var(--text-secondary)',
          fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.3s', whiteSpace: 'nowrap', flex: 1, justifyContent: 'center'
        }}>
          <Briefcase size={18} /> {t('market.tabCedear', 'CEDEARs')}
        </button>
        <button onClick={() => { setActiveTab('stock'); setExpandedId(null); }} className="market-tab-btn" style={{
          display: 'flex', alignItems: 'center', gap: '8px', padding: '0.8rem 1.2rem', border: 'none', borderRadius: '12px',
          background: activeTab === 'stock' ? '#fff' : 'transparent',
          color: activeTab === 'stock' ? 'var(--bg-primary)' : 'var(--text-secondary)',
          fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.3s', whiteSpace: 'nowrap', flex: 1, justifyContent: 'center'
        }}>
          <BarChart2 size={18} /> {t('market.tabStocks', 'Acciones')}
        </button>
      </div>

      {/* Mobile Hint */}
      <div className="hide-on-desktop" style={{ textAlign: 'center', marginBottom: '1rem', color: 'var(--text-secondary)', fontSize: '0.8rem', display: 'none' }}>
        <span>← Desliza para ver más →</span>
      </div>

      <div className="responsive-table-container glass-panel" style={{ padding: '0', borderRadius: '16px' }}>
        <table className="market-table" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
          <thead>
            <tr style={{ background: 'rgba(255,255,255,0.03)' }}>
              <th className="th-asset" style={{ padding: '1.2rem 1.5rem', color: 'var(--text-secondary)', fontWeight: 'bold', letterSpacing: '0.5px' }}>{t('history.asset')}</th>
              <th className="th-price" style={{ padding: '1.2rem 1.5rem', color: 'var(--text-secondary)', fontWeight: 'bold', letterSpacing: '0.5px' }}>{t('history.price')} (USD)</th>
              <th className="th-change" style={{ padding: '1.2rem 1.5rem', color: 'var(--text-secondary)', fontWeight: 'bold', letterSpacing: '0.5px' }}>24h {t('market.change', 'CAMBIO')}</th>
              <th className="hide-on-mobile" style={{ padding: '1.2rem 1.5rem', color: 'var(--text-secondary)', fontWeight: 'bold', letterSpacing: '0.5px' }}>{t('market.cap', 'CAP. MERCADO')}</th>
              <th className="hide-on-mobile" style={{ padding: '1.2rem 1.5rem', color: 'var(--text-secondary)', fontWeight: 'bold', letterSpacing: '0.5px' }}>{t('market.volume', 'VOLUMEN (24h)')}</th>
              <th style={{ padding: '1.2rem 1.5rem', color: 'var(--text-secondary)', fontWeight: 'bold', letterSpacing: '0.5px', textAlign: 'right' }}>{t('market.analysis', 'ANÁLISIS')}</th>
            </tr>
          </thead>
          <tbody>
            {activeDataList.map((asset) => {
              const isExpanded = expandedId === asset.id;
              const isUp = asset.change >= 0;
              
              return (
                <React.Fragment key={asset.id}>
                  {/* Fila Principal */}
                  <tr 
                    style={{ 
                      borderBottom: isExpanded ? 'none' : '1px solid rgba(255,255,255,0.05)', 
                      background: isExpanded ? 'rgba(0, 204, 255, 0.05)' : 'transparent',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer'
                    }}
                    onClick={() => toggleRow(asset.id)}
                    className="hover-row-effect"
                  >
                    <td className="td-asset" style={{ padding: '1.2rem 1.5rem', display: 'flex', alignItems: 'center', gap: '15px' }}>
                      <AssetIcon src={asset.icon} alt={asset.name} symbol={asset.symbol} />
                      <div>
                        <div style={{ fontWeight: 'bold', color: 'var(--text-primary)', fontSize: '1rem' }}>{asset.name}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: '600', marginTop: '2px' }}>{asset.symbol}</div>
                      </div>
                    </td>
                    <td className="td-price" style={{ padding: '1.2rem 1.5rem', fontWeight: 'bold', fontSize: '1.1rem' }}>
                      ${asset.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })}
                    </td>
                    <td className="td-change" style={{ padding: '1.2rem 1.5rem', fontWeight: 'bold', color: isUp ? 'var(--success)' : 'var(--danger)', fontSize: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: isUp ? 'rgba(0,255,136,0.1)' : 'rgba(255,77,77,0.1)', padding: '6px 8px', borderRadius: '8px', display: 'inline-flex' }}>
                        {isUp ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                        {Math.abs(asset.change)}%
                      </div>
                    </td>
                    <td className="hide-on-mobile" style={{ padding: '1.2rem 1.5rem', color: 'var(--text-primary)', fontWeight: '500' }}>${asset.cap}</td>
                    <td className="hide-on-mobile" style={{ padding: '1.2rem 1.5rem', color: 'var(--text-primary)', fontWeight: '500' }}>${asset.vol}</td>
                    <td style={{ padding: '1.2rem 1.5rem', textAlign: 'right' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.8rem' }}>
                        <button style={{ 
                          padding: '0.5rem 1rem', borderRadius: '8px', 
                          border: 'none', background: 'var(--accent-primary)', color: 'var(--bg-primary)',
                          cursor: 'pointer', fontWeight: 'bold', transition: 'all 0.3s',
                          boxShadow: '0 4px 15px rgba(0, 255, 136, 0.2)', fontSize: '0.9rem'
                        }}
                        onClick={(e) => { e.stopPropagation(); setTradeModalCoin(asset.symbol); }}
                        >Trade</button>
                        <div style={{ 
                          width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}>
                          <ChevronDown size={20} style={{ 
                            transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)', 
                            transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)', 
                            color: isExpanded ? 'var(--accent-secondary)' : 'var(--text-secondary)' 
                          }} />
                        </div>
                      </div>
                    </td>
                  </tr>
                  
                  {/* Fila del Gráfico Desplegable */}
                  {isExpanded && (
                    <tr style={{ background: 'rgba(0,0,0,0.2)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td colSpan="6" style={{ padding: '1rem 1.5rem 2rem 1.5rem', borderLeft: '4px solid var(--accent-secondary)' }}>
                        <div style={{ animation: 'slideDown 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}>
                          <MiniChart coinName={asset.name} symbol={asset.symbol} category={asset.type} data={chartsData[asset.id]} isPositive={isUp} />
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Trade Modal Overlay */}
      {tradeModalCoin && (
        <div className="modal-overlay" style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)',
          zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '1rem', animation: 'fadeIn 0.3s ease'
        }} onClick={(e) => { if (e.target.className === 'modal-overlay') setTradeModalCoin(null); }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: '400px', animation: 'slideUp 0.3s ease forwards', borderRadius: '16px' }}>
             <button onClick={() => setTradeModalCoin(null)} style={{
               position: 'absolute', top: '15px', right: '15px', background: 'rgba(255,255,255,0.05)', border: 'none', color: '#fff',
               cursor: 'pointer', padding: '0.5rem', borderRadius: '50%', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
               transition: 'background 0.3s'
             }}
             onMouseOver={(e) => e.currentTarget.style.background = 'var(--danger)'}
             onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
             >
               <X size={18} />
             </button>
             <TradingWidget initialCrypto={tradeModalCoin} />
          </div>
        </div>
      )}

      <style>{`
        .hover-row-effect:hover {
          background: rgba(255,255,255,0.03) !important;
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 768px) {
          .mini-chart-container {
            padding: 1rem !important;
          }
          .mini-chart-container > div:nth-child(2) {
            height: 220px !important;
          }
          .market-tabs-container {
            justify-content: flex-start !important;
            padding: 0.3rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Market;
