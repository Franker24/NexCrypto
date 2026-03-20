import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowDownRight, ArrowRightLeft, RefreshCw, Send, Download, Plus } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import TransactionModal, { TransactionForm, getButtonText } from '../components/TransactionModal';
import { useTranslation } from 'react-i18next';

const allocationData = [
  { name: 'Bitcoin', symbol: 'BTC', value: 85300, color: '#F7931A' },
  { name: 'Ethereum', symbol: 'ETH', value: 25100, color: '#627EEA' },
  { name: 'Tether', symbol: 'USDT', value: 10000, color: '#26A17B' },
  { name: 'Solana', symbol: 'SOL', value: 4132, color: '#14F195' },
];

const assetsList = [
  { id: 1, name: 'Bitcoin', symbol: 'BTC', balance: 1.94, price: 43900.50, usdValue: 85300, color: '#F7931A' },
  { id: 2, name: 'Ethereum', symbol: 'ETH', balance: 11.2, price: 2240.20, usdValue: 25100, color: '#627EEA' },
  { id: 3, name: 'Tether', symbol: 'USDT', balance: 10000.0, price: 1.00, usdValue: 10000, color: '#26A17B' },
  { id: 4, name: 'Solana', symbol: 'SOL', balance: 42.08, price: 98.20, usdValue: 4132, color: '#14F195' },
];

const transactions = [
  { id: 1, type: 'Deposit', icon: <Download size={18} color="var(--success)" />, asset: 'USDT', amount: '+5,000.00 USDT', date: 'Hoy, 14:30', status: 'Completado' },
  { id: 2, type: 'Trade', icon: <RefreshCw size={18} color="var(--accent-secondary)" />, asset: 'BTC / USDT', amount: 'Comprado 0.1 BTC', date: 'Ayer, 09:15', status: 'Completado' },
  { id: 3, type: 'Withdraw', icon: <Send size={18} color="var(--danger)" />, asset: 'ETH', amount: '-1.50 ETH', date: 'Lunes, 18:45', status: 'Pendiente' },
  { id: 4, type: 'Swap', icon: <ArrowRightLeft size={18} color="var(--accent-primary)" />, asset: 'SOL / ETH', amount: 'Cambiado 10 SOL', date: 'Lunes, 12:20', status: 'Completado' },
];

const ActionButton = ({ icon, label, variant = 'primary', onClick, active }) => {
  const isPrimary = variant === 'primary' || active;
  return (
    <button className="hover-lift" onClick={onClick} style={{
      flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      gap: '0.8rem', padding: '1.2rem 0',
      background: isPrimary ? 'rgba(0,255,136,0.1)' : 'rgba(255,255,255,0.03)',
      border: `1px solid ${isPrimary ? 'rgba(0,255,136,0.4)' : 'rgba(255,255,255,0.05)'}`,
      borderRadius: '16px', color: isPrimary ? 'var(--accent-primary)' : 'var(--text-primary)',
      cursor: 'pointer', transition: 'all 0.3s ease',
      boxShadow: active ? '0 0 20px rgba(0,255,136,0.1)' : 'none'
    }}
    onMouseOver={(e) => { if(!active) e.currentTarget.style.background = isPrimary ? 'rgba(0,255,136,0.2)' : 'rgba(255,255,255,0.08)'; }}
    onMouseOut={(e) => { if(!active) e.currentTarget.style.background = isPrimary ? 'rgba(0,255,136,0.1)' : 'rgba(255,255,255,0.03)'; }}
    >
      <div style={{
        background: isPrimary ? 'var(--accent-primary)' : 'rgba(255,255,255,0.1)',
        color: isPrimary ? 'var(--bg-primary)' : '#fff',
        padding: '12px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: isPrimary ? '0 0 15px rgba(0,255,136,0.4)' : 'none'
      }}>
        {icon}
      </div>
      <span style={{ fontWeight: '500', fontSize: '0.95rem' }}>{label}</span>
    </button>
  );
};

const Wallet = () => {
  const [activeAction, setActiveAction] = useState(null);
  const [selectedTx, setSelectedTx] = useState(null);
  const [copied, setCopied] = useState(false);
  const { t } = useTranslation();

  const handleAction = (type) => {
    if (activeAction === type) {
      setActiveAction(null);
      return;
    }
    setActiveAction(type);
    // On desktop, we still want the modal for everything
    if (window.innerWidth > 768) {
      // setIsModalOpen logic removed as activeAction controls modal anyway
    }
  };

  const handleTxClick = (tx) => {
    setSelectedTx(tx);
    setActiveAction('Details');
  };

  return (
    <div className="wallet-page fade-in">
      <header className="dashboard-header" style={{ marginBottom: '2rem' }}>
        <h1>{t('wallet.title')}</h1>
        <p className="text-secondary" style={{ fontSize: '1.1rem' }}>{t('wallet.subtitle', 'Gestioná tus balances, transacciones y portafolio.')}</p>
      </header>

      <div className="wallet-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 350px)', gap: '2rem' }}>
        
        {/* COLUMNA IZQUIERDA: Balance y Activos */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* Tarjeta de Balance Principal */}
          <div className="glass-panel" style={{ padding: '2.5rem', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '-50%', right: '-10%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(0,255,136,0.15) 0%, rgba(11,14,20,0) 70%)', borderRadius: '50%' }}></div>
            
            <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-secondary)', fontWeight: '500' }}>{t('wallet.balance')}</h3>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
              <h1 style={{ fontSize: '3.5rem', margin: 0, fontWeight: '800' }}>$124,532.00</h1>
              <span style={{ color: 'var(--text-secondary)' }}>USD</span>
            </div>
            <div style={{ marginTop: '1rem', display: 'flex', gap: '8px', alignItems: 'center', color: 'var(--success)' }}>
              <ArrowUpRight size={20} />
              <span style={{ fontWeight: 'bold' }}>+$4,231.50 (3.5%)</span>
              <span style={{ color: 'var(--text-secondary)', marginLeft: '4px' }}>Hoy</span>
            </div>

            {/* Quick Actions */}
            <div className="wallet-actions-grid" style={{ display: 'flex', gap: '1rem', marginTop: '2.5rem', flexWrap: 'wrap' }}>
              <ActionButton icon={<Download size={22} />} label="Depositar" active={activeAction === 'Deposit'} onClick={() => handleAction('Deposit')} />
              <ActionButton icon={<Send size={22} />} label="Retirar" active={activeAction === 'Withdraw'} onClick={() => handleAction('Withdraw')} />
              <ActionButton icon={<ArrowRightLeft size={22} />} label="Transferir" active={activeAction === 'Transfer'} onClick={() => handleAction('Transfer')} />
              <ActionButton icon={<RefreshCw size={22} />} label="Swap" active={activeAction === 'Swap'} onClick={() => handleAction('Swap')} />
            </div>

            {/* Inline Form for Mobile Actions */}
            {activeAction && activeAction !== 'Details' && (
              <div className="hide-on-desktop fade-in" style={{ 
                marginTop: '2rem', padding: '2rem', background: 'rgba(255,255,255,0.02)', 
                borderRadius: '20px', border: '1px solid rgba(0,255,136,0.2)',
                boxShadow: 'inset 0 0 20px rgba(0,255,136,0.05)'
              }}>
                <h3 style={{ marginBottom: '1.5rem', fontSize: '1.2rem' }}>
                  {activeAction === 'Deposit' ? 'Depositar Cripto' : 
                   activeAction === 'Withdraw' ? 'Retirar Fondos' : 
                   activeAction === 'Transfer' ? 'Transferencia Interna' : 'Swap de Activos'}
                </h3>
                <TransactionForm actionType={activeAction} copied={copied} setCopied={setCopied} />
                <button 
                  onClick={() => setActiveAction(null)}
                  className="hover-lift"
                  style={{
                    width: '100%', marginTop: '2rem', padding: '1rem',
                    borderRadius: '12px', border: 'none',
                    background: 'var(--accent-primary)',
                    color: 'var(--bg-primary)',
                    fontWeight: 'bold', fontSize: '1rem',
                    cursor: 'pointer'
                  }}>
                  {getButtonText(activeAction)}
                </button>
              </div>
            )}
          </div>

          {/* Lista de Activos */}
          <div className="glass-panel" style={{ padding: '2rem' }}>
            <h3 style={{ margin: '0 0 1.5rem 0' }}>{t('wallet.myAssets', 'Mis Activos')}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {assetsList.map(asset => (
                <div key={asset.id} className="hover-lift" style={{ 
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between', 
                  padding: '1.2rem', background: 'rgba(255,255,255,0.02)', 
                  borderRadius: '16px', border: '1px solid var(--border-color)', cursor: 'pointer'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: asset.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#fff', fontSize: '0.9rem', boxShadow: `0 0 15px ${asset.color}40` }}>
                      {asset.symbol[0]}
                    </div>
                    <div>
                      <h4 style={{ margin: 0, fontSize: '1.1rem' }}>{asset.name}</h4>
                      <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{asset.balance} {asset.symbol}</p>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <h4 style={{ margin: 0, fontSize: '1.1rem' }}>${asset.usdValue.toLocaleString()}</h4>
                    <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>@ ${asset.price.toLocaleString(undefined, {minimumFractionDigits: 2})}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* COLUMNA DERECHA: Gráfico de Alocación y Transacciones */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* Gráfico de Portafolio */}
          <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ margin: '0 0 1.5rem 0' }}>{t('wallet.distribution', 'Distribución de Portafolio')}</h3>
            <div style={{ height: '220px', width: '100%', position: 'relative' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip 
                    contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '12px', backdropFilter: 'blur(10px)' }}
                    itemStyle={{ color: 'var(--text-primary)', fontWeight: 'bold' }}
                    formatter={(value) => `$${value.toLocaleString()}`}
                  />
                  <Pie data={allocationData} cx="50%" cy="50%" innerRadius={70} outerRadius={90} paddingAngle={5} dataKey="value" stroke="none">
                    {allocationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Total</span>
                <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>4 Activos</div>
              </div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginTop: '1rem' }}>
              {allocationData.map(item => (
                <div key={item.symbol} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: item.color }}></div>
                    <span style={{ color: 'var(--text-secondary)' }}>{item.symbol}</span>
                  </div>
                  <span style={{ fontWeight: '600' }}>{Math.round((item.value / 124532) * 100)}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Transacciones Recientes */}
          <div className="glass-panel" style={{ padding: '2rem', flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '10px' }}>
              <h3 style={{ margin: 0 }}>{t('wallet.transactions', 'Transacciones')}</h3>
              <Link to="/history" style={{ color: 'var(--accent-secondary)', fontSize: '0.9rem', cursor: 'pointer', textDecoration: 'none', fontWeight: 'bold' }}>{t('wallet.viewAll', 'Ver Todo')}</Link>
            </div>
            
            <div className="responsive-table-container glass-panel" style={{ padding: '0', borderRadius: '16px', border: 'none' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {transactions.map(tx => (
                <div 
                  key={tx.id} 
                  onClick={() => handleTxClick(tx)}
                  className="hover-lift" 
                  style={{ 
                    display: 'flex', alignItems: 'center', gap: '1rem', 
                    padding: '12px', borderRadius: '12px', cursor: 'pointer',
                    background: 'transparent', transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)' }}
                  onMouseOut={(e) => { e.currentTarget.style.background = 'transparent' }}
                >
                  <div style={{ padding: '10px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                    {tx.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ margin: 0, fontSize: '0.95rem' }}>{tx.type}</h4>
                    <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.8rem' }}>{tx.date}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <h4 style={{ margin: 0, fontSize: '0.95rem', color: tx.amount.startsWith('+') ? 'var(--success)' : (tx.amount.startsWith('-') ? 'var(--text-primary)' : 'var(--accent-secondary)') }}>
                      {tx.amount}
                    </h4>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: tx.status === 'Pendiente' ? 'var(--accent-primary)' : 'var(--text-secondary)' }}>{tx.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>

      {/* Bottom Sheet for Details (Mobile) or Modal for Everything (Desktop) */}
      <TransactionModal 
        isOpen={!!activeAction && (activeAction === 'Details' || window.innerWidth > 768)} 
        onClose={() => {
          setActiveAction(null);
          setSelectedTx(null);
        }} 
        actionType={activeAction} 
        data={selectedTx}
      />

      <style>{`
        @media (max-width: 1024px) {
          .wallet-page > div {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 600px) {
          .dashboard-header h1 {
            font-size: 2rem;
          }
          .glass-panel h1 {
            font-size: 2.5rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Wallet;
