import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { Home, BarChart2, Newspaper, Wallet, Settings, Hexagon, User, LogOut, MoreVertical } from 'lucide-react';
import { useUser } from '../context/UserContext';
import './Sidebar.css';

const Sidebar = () => {
  const { user, logout } = useUser();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const menuRef = useRef(null);

  // Escuchar clicks fuera del menú para evitar dejarlo abierto
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const navItems = [
    { name: 'Dashboard', icon: <Home size={22} />, path: '/' },
    { name: 'Market', icon: <BarChart2 size={22} />, path: '/market' },
    { name: 'News', icon: <Newspaper size={22} />, path: '/news' },
    { name: 'Wallet', icon: <Wallet size={22} />, path: '/wallet' },
    { name: 'Settings', icon: <Settings size={22} />, path: '/settings' },
  ];

  return (
    <aside className="sidebar glass-panel">
      <div className="sidebar-logo">
        <div className="logo-icon-wrapper">
          <Hexagon className="logo-icon" size={32} color="var(--accent-primary)" />
        </div>
        <h2 className="text-gradient logo-text">NexCrypto</h2>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            to={item.path}
            key={item.name}
            className={({ isActive }) => `nav-item hover-lift ${isActive ? 'active' : ''}`}
          >
            <div className="nav-icon-wrapper" style={{ minWidth: '24px', display: 'flex', justifyContent: 'center' }}>
              {item.icon}
            </div>
            <span className="nav-label">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer" ref={menuRef} style={{ position: 'relative' }}>
        {showProfileMenu && (
          <div className="profile-popover" style={{
            position: 'absolute', bottom: 'calc(100% + 15px)', left: '0.5rem', right: '0.5rem',
            background: 'var(--bg-card)', border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '16px', padding: '0.5rem', boxShadow: '0 15px 40px rgba(0,0,0,0.6)',
            animation: 'slideUpPopover 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)', zIndex: 100,
            overflow: 'hidden'
          }}>
            <NavLink to="/settings" onClick={() => setShowProfileMenu(false)} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', borderRadius: '10px', color: 'var(--text-primary)', textDecoration: 'none', cursor: 'pointer', transition: 'all 0.2s', fontSize: '0.95rem', fontWeight: '600' }} onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#fff'; }} onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-primary)'; }}>
              <User size={18} color="var(--accent-secondary)"/> Mi Perfil
            </NavLink>
            <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', margin: '5px 8px' }}></div>
            <div onClick={() => { setShowProfileMenu(false); logout(); }} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', borderRadius: '10px', color: 'var(--danger)', cursor: 'pointer', transition: 'all 0.2s', fontSize: '0.95rem', fontWeight: 'bold' }} onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(255,77,77,0.1)'; }} onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; }}>
              <LogOut size={18} /> Cerrar Sesión
            </div>
          </div>
        )}

        <div 
          className="user-profile" 
          onClick={() => setShowProfileMenu(!showProfileMenu)} 
          style={{ 
            cursor: 'pointer', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            padding: '8px',
            margin: '0',
            borderRadius: '12px',
            transition: 'background 0.2s ease, transform 0.2s ease'
          }}
          onMouseOver={(e) => { 
            e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; 
            if(!showProfileMenu) e.currentTarget.style.transform = 'translateY(-2px)';
          }} 
          onMouseOut={(e) => { 
            e.currentTarget.style.background = 'transparent'; 
            if(!showProfileMenu) e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div className="avatar" style={{ 
              minWidth: '40px', height: '40px', borderRadius: '10px', overflow: 'hidden', 
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
            }}>
            {user?.avatar ? (
              <img src={user.avatar} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              (user?.name?.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'JD')
            )}
          </div>
            <div className="user-info">
              <span className="user-name" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100px' }}>
                {user?.name || 'John Doe'}
              </span>
              <span className="user-type">{user?.type || 'Pro Trader'}</span>
            </div>
          </div>
          <MoreVertical className="more-icon" size={18} color="var(--text-secondary)" style={{ opacity: 0.8 }} />
        </div>
      </div>
      
      <style>{`
        @keyframes slideUpPopover {
          from { opacity: 0; transform: translateY(15px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </aside>
  );
};

export default Sidebar;
