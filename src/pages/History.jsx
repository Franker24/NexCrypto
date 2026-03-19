import React, { useState } from 'react';
import { Search, Filter, Download as DownloadIcon, ArrowUpRight, ArrowDownRight, ArrowRightLeft, RefreshCw, Send, CheckCircle2, Clock, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const transactionsFull = [
  { id: 1, type: 'Depósito', icon: <ArrowDownRight size={18} color="var(--success)" />, asset: 'USDT', amount: '+5,000.00 USDT', date: '18 Mar 2026, 14:30', status: 'Completado', wallet: 'Main Wallet', fee: '$0.00' },
  { id: 2, type: 'Trade', icon: <RefreshCw size={18} color="var(--accent-secondary)" />, asset: 'BTC / USDT', amount: 'Adquirido 0.1 BTC', date: '17 Mar 2026, 09:15', status: 'Completado', wallet: 'Spot Account', fee: '$12.50' },
  { id: 3, type: 'Retiro', icon: <Send size={18} color="var(--danger)" />, asset: 'ETH', amount: '-1.50 ETH', date: '16 Mar 2026, 18:45', status: 'Pendiente', wallet: 'External Address', fee: '$4.20' },
  { id: 4, type: 'Swap', icon: <ArrowRightLeft size={18} color="var(--accent-primary)" />, asset: 'SOL / ETH', amount: 'Cambiado 10 SOL', date: '16 Mar 2026, 12:20', status: 'Completado', wallet: 'Liquid Swap', fee: '$2.10' },
  { id: 5, type: 'Depósito', icon: <ArrowDownRight size={18} color="var(--success)" />, asset: 'BTC', amount: '+0.05 BTC', date: '15 Mar 2026, 08:10', status: 'Completado', wallet: 'Main Wallet', fee: '$0.00' },
  { id: 6, type: 'Retiro', icon: <Send size={18} color="var(--danger)" />, asset: 'USDT', amount: '-1,200.00 USDT', date: '14 Mar 2026, 22:30', status: 'Completado', wallet: 'Binance Pay', fee: '$1.00' },
  { id: 7, type: 'Trade', icon: <RefreshCw size={18} color="var(--accent-secondary)" />, asset: 'ETH / USDT', amount: 'Vendido 2.5 ETH', date: '13 Mar 2026, 11:45', status: 'Completado', wallet: 'Spot Account', fee: '$15.30' },
  { id: 8, type: 'Swap', icon: <ArrowRightLeft size={18} color="var(--accent-primary)" />, asset: 'DAI / USDT', amount: 'Cambiado 500 DAI', date: '12 Mar 2026, 16:20', status: 'Completado', wallet: 'Stable Swap', fee: '$0.50' },
  { id: 9, type: 'Depósito', icon: <ArrowDownRight size={18} color="var(--success)" />, asset: 'SOL', amount: '+20.50 SOL', date: '11 Mar 2026, 09:40', status: 'Completado', wallet: 'Main Wallet', fee: '$0.00' },
  { id: 10, type: 'Retiro', icon: <Send size={18} color="var(--danger)" />, asset: 'BTC', amount: '-0.01 BTC', date: '10 Mar 2026, 21:15', status: 'Completado', wallet: 'Cold Storage', fee: '$8.50' },
  { id: 11, type: 'Trade', icon: <RefreshCw size={18} color="var(--accent-secondary)" />, asset: 'DOT / USDT', amount: 'Comprado 100 DOT', date: '09 Mar 2026, 13:20', status: 'Completado', wallet: 'Spot Account', fee: '$3.20' },
  { id: 12, type: 'Swap', icon: <ArrowRightLeft size={18} color="var(--accent-primary)" />, asset: 'ADA / ETH', amount: 'Cambiado 2000 ADA', date: '08 Mar 2026, 10:05', status: 'Completado', wallet: 'Governance Stake', fee: '$1.40' },
  { id: 13, type: 'Depósito', icon: <ArrowDownRight size={18} color="var(--success)" />, asset: 'USDC', amount: '+2,500.00 USDC', date: '07 Mar 2026, 15:50', status: 'Completado', wallet: 'Main Wallet', fee: '$0.00' },
  { id: 14, type: 'Retiro', icon: <Send size={18} color="var(--danger)" />, asset: 'SOL', amount: '-5.00 SOL', date: '06 Mar 2026, 19:10', status: 'Completado', wallet: 'Phantom Wallet', fee: '$0.01' },
  { id: 15, type: 'Trade', icon: <RefreshCw size={18} color="var(--accent-secondary)" />, asset: 'LINK / USDT', amount: 'Vendido 50 LINK', date: '05 Mar 2026, 12:45', status: 'Completado', wallet: 'Spot Account', fee: '$2.80' },
];

const History = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredTransactions = transactionsFull.filter(tx => {
    const matchesSearch = tx.asset.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         tx.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'All' || tx.type === filterType;
    return matchesSearch && matchesFilter;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTransactions = filteredTransactions.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="history-page fade-in">
      <header className="dashboard-header" style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.5rem' }}>
            <Link to="/wallet" className="hover-lift" style={{ color: 'var(--accent-secondary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <ChevronLeft size={20} /> Volver a Wallet
            </Link>
          </div>
          <h1 style={{ fontSize: '2.4rem', margin: 0 }}>Historial de Transacciones</h1>
          <p className="text-secondary" style={{ fontSize: '1.1rem', marginTop: '0.5rem' }}>Visualiza y filtra todos tus movimientos pasados.</p>
        </div>
        
        <button className="hover-lift" style={{ 
          display: 'flex', alignItems: 'center', gap: '10px', padding: '0.8rem 1.5rem', 
          background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', 
          borderRadius: '12px', color: '#fff', cursor: 'pointer', fontWeight: 'bold' 
        }}>
          <DownloadIcon size={20} /> Exportar CSV
        </button>
      </header>

      {/* Filters Bar */}
      <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '2rem', display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '300px' }}>
          <Search size={18} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
          <input 
            type="text" 
            placeholder="Buscar por activo o tipo..." 
            value={searchTerm}
            onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset to page 1 on search
            }}
            style={{ 
              width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', 
              borderRadius: '12px', padding: '0.8rem 1rem 0.8rem 2.8rem', color: '#fff', outline: 'none' 
            }} 
          />
        </div>
        
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {['All', 'Depósito', 'Retiro', 'Trade', 'Swap'].map(type => (
            <button 
              key={type}
              onClick={() => {
                  setFilterType(type);
                  setCurrentPage(1); // Reset to page 1 on filter
              }}
              style={{ 
                padding: '0.8rem 1.2rem', borderRadius: '10px', border: '1px solid var(--border-color)',
                background: filterType === type ? 'var(--accent-secondary)' : 'rgba(255,255,255,0.02)',
                color: filterType === type ? 'var(--bg-primary)' : 'var(--text-primary)',
                fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.3s'
              }}
            >
              {type === 'All' ? 'Todos' : type}
            </button>
          ))}
        </div>
      </div>

      {/* Transactions Table */}
      {/* Mobile Hint */}
      <div className="hide-on-desktop" style={{ textAlign: 'center', marginBottom: '1rem', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
        <span>← Desliza para ver más →</span>
      </div>

      <div className="responsive-table-container glass-panel" style={{ padding: '1.5rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ color: 'var(--text-secondary)', borderBottom: '1px solid var(--border-color)' }}>
              <th style={{ padding: '1.2rem', fontWeight: 'bold' }}>TIPO</th>
              <th style={{ padding: '1.2rem', fontWeight: 'bold' }}>ACTIVO / PAR</th>
              <th style={{ padding: '1.2rem', fontWeight: 'bold' }}>MONTO</th>
              <th style={{ padding: '1.2rem', fontWeight: 'bold' }}>FECHA</th>
              <th style={{ padding: '1.2rem', fontWeight: 'bold' }}>ESTADO</th>
              <th style={{ padding: '1.2rem', fontWeight: 'bold' }}>BILLETERA</th>
              <th style={{ padding: '1.2rem', fontWeight: 'bold', textAlign: 'right' }}>COMISIÓN</th>
            </tr>
          </thead>
          <tbody>
            {currentTransactions.map(tx => (
              <tr key={tx.id} className="hover-lift" style={{ 
                borderBottom: '1px solid rgba(255,255,255,0.02)', transition: 'background 0.3s',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
              onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <td style={{ padding: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ padding: '8px', background: 'rgba(255,255,255,0.03)', borderRadius: '10px' }}>
                      {tx.icon}
                    </div>
                    <span style={{ fontWeight: 'bold' }}>{tx.type}</span>
                  </div>
                </td>
                <td style={{ padding: '1.5rem' }}>
                  <div style={{ fontWeight: '600' }}>{tx.asset}</div>
                </td>
                <td style={{ padding: '1.5rem' }}>
                  <div style={{ 
                    fontWeight: '800', 
                    color: tx.amount.startsWith('+') ? 'var(--success)' : (tx.amount.startsWith('-') ? 'var(--text-primary)' : 'var(--accent-secondary)') 
                  }}>{tx.amount}</div>
                </td>
                <td style={{ padding: '1.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  {tx.date}
                </td>
                <td style={{ padding: '1.5rem' }}>
                  <div style={{ 
                    display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 'bold',
                    color: tx.status === 'Completado' ? 'var(--success)' : 'var(--accent-primary)',
                    padding: '4px 10px', borderRadius: '20px', background: tx.status === 'Completado' ? 'rgba(0,255,136,0.1)' : 'rgba(0,204,255,0.1)',
                    width: 'fit-content'
                  }}>
                    {tx.status === 'Completado' ? <CheckCircle2 size={14} /> : <Clock size={14} />}
                    {tx.status}
                  </div>
                </td>
                <td style={{ padding: '1.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  {tx.wallet}
                </td>
                <td style={{ padding: '1.5rem', textAlign: 'right', fontWeight: 'bold' }}>
                  {tx.fee}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {currentTransactions.length === 0 && (
          <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-secondary)' }}>
            <Search size={48} style={{ opacity: 0.2, marginBottom: '1rem' }} />
            <p>No se encontraron transacciones con esos criterios.</p>
          </div>
        )}
      </div>

      {/* Actual Functional Pagination */}
      <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1.5rem' }}>
        <button 
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          style={{ 
              background: 'transparent', border: 'none', 
              color: currentPage === 1 ? 'var(--text-secondary)' : 'var(--text-primary)', 
              cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
              opacity: currentPage === 1 ? 0.3 : 1
          }}>
          <ChevronLeft size={24} />
        </button>
        
        <div style={{ display: 'flex', gap: '8px' }}>
          {[...Array(totalPages)].map((_, index) => (
            <span 
              key={index + 1}
              onClick={() => paginate(index + 1)}
              style={{ 
                  width: '32px', height: '32px', 
                  background: currentPage === index + 1 ? 'var(--accent-secondary)' : 'rgba(255,255,255,0.05)', 
                  color: currentPage === index + 1 ? 'var(--bg-primary)' : 'var(--text-primary)', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center', 
                  borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer',
                  transition: 'all 0.3s'
              }}>
              {index + 1}
            </span>
          ))}
        </div>

        <button 
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          style={{ 
              background: 'transparent', border: 'none', 
              color: currentPage === totalPages ? 'var(--text-secondary)' : 'var(--text-primary)', 
              cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
              opacity: currentPage === totalPages ? 0.3 : 1
          }}>
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default History;
