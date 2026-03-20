import React from 'react';
import ChartWidget from '../components/ChartWidget';
import TradingWidget from '../components/TradingWidget';
import TrendingWidget from '../components/TrendingWidget';
import ActivityWidget from '../components/ActivityWidget';
import PortfolioChart from '../components/PortfolioChart';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { useTranslation } from 'react-i18next';

const Dashboard = () => {
  const { user } = useUser();
  const { t } = useTranslation();
  const firstName = user?.name ? user.name.split(' ')[0] : t('sidebar.profile').split(' ')[0];

  return (
    <div className="dashboard fade-in">
      <header className="dashboard-header" style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '2.2rem', display: 'flex', alignItems: 'center', gap: '15px', color: 'var(--text-primary)' }}>
              {user?.avatar ? (
                <img src={user.avatar} alt="Profile" style={{ width: '45px', height: '45px', borderRadius: '12px', objectFit: 'cover', boxShadow: '0 5px 15px rgba(0, 204, 255, 0.2)' }} />
              ) : (
                <div style={{ width: '45px', height: '45px', borderRadius: '12px', background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--bg-primary)' }}>
                   {user?.name ? user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'U'}
                </div>
              )}
              {t('dashboard.myPortfolio')}
            </h1>
            <p className="text-secondary" style={{ margin: '0.5rem 0 0 0', fontSize: '1.05rem' }}>{t('dashboard.hello', { name: firstName })}</p>
          </div>
          
          <div style={{ display: 'flex', gap: '1.5rem' }}>
             <div className="glass-panel hover-lift" style={{ 
               padding: '1rem 1.5rem', display: 'flex', flexDirection: 'column', 
               borderLeft: '4px solid var(--success)', borderRadius: '12px', cursor: 'default',
               transition: 'all 0.3s ease'
             }}
             onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(0, 255, 136, 0.05)'; e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 5px 20px rgba(0,255,136,0.15)' }}
             onMouseOut={(e) => { e.currentTarget.style.background = 'var(--bg-card)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow-glass)' }}
             >
               <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold' }}>{t('dashboard.generalBalance')}</span>
               <span style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-primary)' }}>$124,532.00</span>
             </div>
             
             <div className="glass-panel hover-lift hide-on-mobile" style={{ 
               padding: '1rem 1.5rem', display: 'flex', flexDirection: 'column', 
               borderLeft: '4px solid var(--accent-secondary)', borderRadius: '12px', cursor: 'default',
               transition: 'all 0.3s ease'
             }}
             onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(0, 204, 255, 0.05)'; e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 5px 20px rgba(0,204,255,0.15)' }}
             onMouseOut={(e) => { e.currentTarget.style.background = 'var(--bg-card)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow-glass)' }}
             >
               <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold' }}>{t('dashboard.gain24h')}</span>
               <span style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--success)' }}>+$4,231.50</span>
             </div>
          </div>
        </div>
      </header>
      
      <div className="dashboard-grid" style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(12, 1fr)', 
        gap: '2rem',
        alignItems: 'start'
      }}>
        {/* Left Column (Main Charts) */}
        <div className="dashboard-main-col" style={{ gridColumn: 'span 8', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '10px' }}>
            <h3 style={{ margin: 0, fontSize: '1.4rem' }}>{t('dashboard.assetPerformance')}</h3>
            <Link to="/market" className="hover-lift" style={{ 
              color: 'var(--bg-primary)', 
              background: 'var(--accent-secondary)', 
              padding: '0.6rem 1.2rem', 
              borderRadius: '8px', 
              fontSize: '0.95rem', 
              cursor: 'pointer', 
              textDecoration: 'none', 
              fontWeight: 'bold',
              boxShadow: '0 4px 15px rgba(0, 204, 255, 0.3)'
            }}>{t('dashboard.seeAllMarket')}</Link>
          </div>

          <PortfolioChart />
          
          <div className="charts-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: '2rem' }}>
            <ChartWidget coinName="Bitcoin" symbol="BTC" currentPrice="$43,900.00" change="+4.5%" />
            <ChartWidget coinName="Ethereum" symbol="ETH" currentPrice="$2,240.50" change="+2.1%" />
          </div>
          
        </div>

        {/* Right Column (Widgets) */}
        <div className="dashboard-side-col" style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <TradingWidget />
          <TrendingWidget />
          <ActivityWidget />
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .dashboard-grid {
            grid-template-columns: 1fr !important;
          }
          .dashboard-main-col, .dashboard-side-col {
            grid-column: span 12 !important;
          }
        }
        @media (max-width: 768px) {
          .dashboard-header {
            flex-direction: column;
            align-items: flex-start !important;
            gap: 1.5rem;
          }
          .charts-grid {
            grid-template-columns: 1fr !important;
          }
          .dashboard-header h1 {
            font-size: 1.8rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
