import React, { useState, useEffect, useRef } from 'react';
import { User, Lock, Bell, Globe, ShieldCheck, Upload, Wallet, Link, Book, Settings2, X, CheckCircle2, AlertTriangle, Monitor, LogOut } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { useTranslation } from 'react-i18next';

// === Componente Toast Rápido para Feedback Visual ===
const ToastMessage = ({ message, type, onClose }) => {
  return (
    <div style={{
      position: 'fixed', bottom: '30px', right: '30px', 
      background: type === 'error' ? 'var(--danger)' : 'var(--success)', 
      color: type === 'error' ? '#fff' : 'var(--bg-primary)', 
      padding: '1.2rem 2rem', borderRadius: '12px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.4)', zIndex: 9999,
      display: 'flex', alignItems: 'center', gap: '15px',
      animation: 'slideUpToast 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
    }}>
      {type === 'error' ? <AlertTriangle size={20} /> : <CheckCircle2 size={20} />}
      <span style={{ fontWeight: 'bold', fontSize: '1rem' }}>{message}</span>
      <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'inherit', cursor: 'pointer', padding: '0', display: 'flex', marginLeft: '10px' }}>
        <X size={18}/>
      </button>
      <style>{`
        @keyframes slideUpToast {
          from { opacity: 0; transform: translateY(50px) scale(0.9); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
};

// === Componente Toggle Interruptor ===
const SettingToggle = ({ label, description, defaultChecked = false, onChange }) => {
  const [checked, setChecked] = useState(defaultChecked);
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.2rem', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid var(--border-color)', marginBottom: '0.8rem' }}>
      <div style={{ paddingRight: '1rem' }}>
        <h4 style={{ margin: '0 0 0.4rem 0', color: 'var(--text-primary)', fontSize: '1.05rem' }}>{label}</h4>
        <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.4' }}>{description}</p>
      </div>
      <div 
        onClick={() => { 
          const newVal = !checked;
          setChecked(newVal);
          if (onChange) onChange(newVal);
        }}
        style={{ 
          width: '50px', height: '28px', borderRadius: '30px', background: checked ? 'var(--success)' : 'rgba(255,255,255,0.1)',
          position: 'relative', cursor: 'pointer', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: checked ? '0 0 10px rgba(0,255,136,0.3)' : 'none', flexShrink: 0
        }}
      >
        <div style={{ 
          width: '24px', height: '24px', borderRadius: '50%', background: '#fff',
          position: 'absolute', top: '2px', left: checked ? '24px' : '2px', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
        }} />
      </div>
    </div>
  );
};

const Settings = () => {
  const { user, setUser, logout } = useUser();
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState('profile');
  const [toast, setToast] = useState(null);
  const fileInputRef = React.useRef(null);

  // Funciones de Feedback Global
  const showNotification = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // --- ESTADOS: Perfil ---
  const [profileData, setProfileData] = useState({ ...user });
  
  // Sincronizar con el usuario global si cambia (ej: post-login/register)
  useEffect(() => {
    if (user) setProfileData({ ...user });
  }, [user]);

  const { updateProfile, loading: isSavingProfile } = useUser();

  const handleProfileSave = async () => {
    const result = await updateProfile(profileData);
    if (result.success) {
      showNotification('Perfil actualizado correctamente en todo el sistema.');
    } else {
      showNotification('Error al actualizar el perfil.', 'error');
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        showNotification('La imagen es muy pesada (máx 2MB)', 'error');
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        const newAvatar = reader.result;
        setProfileData(prev => ({ ...prev, avatar: newAvatar }));
        setUser(prev => ({ ...prev, avatar: newAvatar }));
        showNotification('Foto de perfil actualizada');
      };
      reader.readAsDataURL(file);
    }
  };

  // --- ESTADOS: Seguridad ---
  const [passwords, setPasswords] = useState({ current: '', new: '' });
  
  const handlePasswordUpdate = () => {
    if (!passwords.current || !passwords.new) {
      showNotification('Debes completar las contraseñas.', 'error');
      return;
    }
    if (passwords.new.length < 8) {
      showNotification('La nueva contraseña debe tener 8 caracteres.', 'error');
      return;
    }
    setPasswords({ current: '', new: '' });
    showNotification('Tu contraseña se actualizó al instante.');
  };

  const handle2FA = (active) => {
    showNotification(active ? 'Google Authenticator habilitado.' : 'Aplicación Autenticadora desactivada.', active ? 'success' : 'error');
  };

  // --- ESTADOS: Wallet ---
  const [connectedWallets, setConnectedWallets] = useState([
    { id: 1, name: 'MetaMask', address: '0x7a59...Bf3dA9', icon: 'https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg' }
  ]);
  
  const handleDisconnectWallet = (id) => {
    setConnectedWallets(connectedWallets.filter(w => w.id !== id));
    showNotification('Billetera desconectada de tu cuenta.', 'error');
  };

  const handleConnectWallet = () => {
    showNotification('Abre la extensión de tu billetera para autorizar la Web3.', 'success');
  };

  const handleSlippageChange = (e) => {
    showNotification(`Slippage actualizado a ${e.target.value === 'custom' ? 'Personalizado' : e.target.value + '%'}`);
  };

  // --- ESTADOS: Preferencias ---
  const handlePrefChange = (type, val) => {
    if (type === 'fiat') showNotification(`Moneda Base cambiada a ${val.toUpperCase()}`);
    if (type === 'lang') showNotification('Idioma principal modificado.');
  };


  return (
    <div className="settings-page fade-in">
      <header className="dashboard-header" style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2.4rem', margin: 0, color: 'var(--text-primary)' }}>{t('settings.title')}</h1>
        <p className="text-secondary" style={{ fontSize: '1.1rem', margin: '0.5rem 0 0' }}>{t('settings.subtitle')}</p>
      </header>

      {toast && <ToastMessage message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 260px) minmax(0, 1fr)', gap: '2rem', alignItems: 'start' }}>
        
        {/* Menú Lateral de Ajustes */}
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          <button onClick={() => setActiveTab('profile')} className="hover-bg" style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', padding: '1.2rem', border: 'none', background: activeTab === 'profile' ? 'rgba(0, 204, 255, 0.1)' : 'transparent', color: activeTab === 'profile' ? 'var(--accent-secondary)' : 'var(--text-secondary)', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem', textAlign: 'left', transition: 'all 0.3s' }}>
            <User size={20} /> {t('settings.tabs.profile')}
          </button>
          <button onClick={() => setActiveTab('security')} className="hover-bg" style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', padding: '1.2rem', border: 'none', background: activeTab === 'security' ? 'rgba(0, 204, 255, 0.1)' : 'transparent', color: activeTab === 'security' ? 'var(--accent-secondary)' : 'var(--text-secondary)', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem', textAlign: 'left', transition: 'all 0.3s' }}>
            <Lock size={20} /> {t('settings.tabs.security')}
          </button>
          <button onClick={() => setActiveTab('wallet')} className="hover-bg" style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', padding: '1.2rem', border: 'none', background: activeTab === 'wallet' ? 'rgba(0, 204, 255, 0.1)' : 'transparent', color: activeTab === 'wallet' ? 'var(--accent-secondary)' : 'var(--text-secondary)', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem', textAlign: 'left', transition: 'all 0.3s' }}>
            <Wallet size={20} /> {t('settings.tabs.wallet')}
          </button>
          <button onClick={() => setActiveTab('notifications')} className="hover-bg" style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', padding: '1.2rem', border: 'none', background: activeTab === 'notifications' ? 'rgba(0, 204, 255, 0.1)' : 'transparent', color: activeTab === 'notifications' ? 'var(--accent-secondary)' : 'var(--text-secondary)', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem', textAlign: 'left', transition: 'all 0.3s' }}>
            <Bell size={20} /> {t('settings.tabs.notifications')}
          </button>
          <button onClick={() => setActiveTab('preferences')} className="hover-bg" style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', padding: '1.2rem', border: 'none', background: activeTab === 'preferences' ? 'rgba(0, 204, 255, 0.1)' : 'transparent', color: activeTab === 'preferences' ? 'var(--accent-secondary)' : 'var(--text-secondary)', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem', textAlign: 'left', transition: 'all 0.3s' }}>
            <Monitor size={20} /> {t('settings.tabs.preferences')}
          </button>
          
          <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <button 
              onClick={logout}
              className="hover-lift" 
              style={{ 
                display: 'flex', alignItems: 'center', gap: '12px', width: '100%', padding: '1.2rem', 
                border: 'none', background: 'rgba(255, 77, 77, 0.1)', color: 'var(--danger)', 
                borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem', 
                textAlign: 'left', transition: 'all 0.3s' 
              }}>
              <LogOut size={20} /> {t('sidebar.logout')}
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* ==================== PANEL: PERFIL ====================== */}
        {/* ========================================================= */}
        {activeTab === 'profile' && (
          <div className="glass-panel scale-up" style={{ padding: '2.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '1.5rem', marginBottom: '2rem' }}>
              <div style={{ background: 'rgba(0,204,255,0.1)', padding: '12px', borderRadius: '12px' }}>
                <User color="var(--accent-secondary)" size={24} />
              </div>
              <h2 style={{ margin: 0, fontSize: '1.6rem' }}>{t('settings.profile.title')}</h2>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '3rem' }}>
              <div style={{ position: 'relative' }}>
                <div style={{ width: '110px', height: '110px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.8rem', fontWeight: '900', color: 'var(--bg-primary)', boxShadow: '0 10px 30px rgba(0, 204, 255, 0.4)', overflow: 'hidden' }}>
                  {profileData?.avatar ? (
                    <img src={profileData.avatar} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    profileData?.name ? profileData.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U'
                  )}
                </div>
                <button 
                  onClick={() => fileInputRef.current.click()}
                  style={{ position: 'absolute', bottom: '0', right: '0', background: 'var(--accent-primary)', color: 'var(--bg-primary)', border: 'none', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.3)', transition: 'transform 0.2s', zIndex: 2 }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <Upload size={18} strokeWidth={3} />
                </button>
                <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleAvatarChange} 
                    accept="image/*" 
                    style={{ display: 'none' }} 
                />
              </div>
              <div>
                <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.2rem' }}>Foto de Perfil</h3>
                <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Formatos soportados: JPG, PNG o GIF. Máximo 2MB.</p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: '1.5rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 'bold' }}>{t('settings.profile.fullName')}</label>
                <input type="text" value={profileData.name} onChange={(e) => setProfileData({...profileData, name: e.target.value})} style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '1rem', color: '#fff', fontSize: '1rem', outline: 'none' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 'bold' }}>{t('settings.profile.username')}</label>
                <input type="text" value={profileData.username} onChange={(e) => setProfileData({...profileData, username: e.target.value})} style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '1rem', color: '#fff', fontSize: '1rem', outline: 'none' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 'bold' }}>{t('settings.profile.email')}</label>
                <input type="email" value="john.doe@email.com" readOnly style={{ width: '100%', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', padding: '1rem', color: 'var(--text-secondary)', fontSize: '1rem', outline: 'none', cursor: 'not-allowed' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 'bold' }}>{t('settings.profile.phone')}</label>
                <input type="tel" value={profileData.phone} onChange={(e) => setProfileData({...profileData, phone: e.target.value})} style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '1rem', color: '#fff', fontSize: '1rem', outline: 'none' }} />
              </div>
            </div>
            
            <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={handleProfileSave} disabled={isSavingProfile} className="hover-lift" style={{ padding: '1rem 3rem', background: 'var(--accent-secondary)', color: 'var(--bg-primary)', border: 'none', borderRadius: '12px', fontWeight: 'bold', fontSize: '1rem', cursor: isSavingProfile ? 'not-allowed' : 'pointer', boxShadow: '0 5px 20px rgba(0, 204, 255, 0.25)', opacity: isSavingProfile ? 0.7 : 1 }}>
                {isSavingProfile ? t('settings.profile.saving') : t('settings.profile.saveBtn')}
              </button>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* =================== PANEL: SEGURIDAD ==================== */}
        {/* ========================================================= */}
        {activeTab === 'security' && (
          <div className="glass-panel scale-up" style={{ padding: '2.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '1.5rem', marginBottom: '2rem' }}>
              <div style={{ background: 'rgba(0,255,136,0.1)', padding: '12px', borderRadius: '12px' }}>
                <ShieldCheck color="var(--success)" size={24} />
              </div>
              <h2 style={{ margin: 0, fontSize: '1.6rem' }}>Seguridad y Acceso</h2>
            </div>
            
            <div style={{ marginBottom: '3rem' }}>
              <h3 style={{ marginBottom: '1.2rem', color: 'var(--text-primary)' }}>Autenticación de Dos Factores (2FA)</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Añade una capa extra de seguridad para prevenir accesos no autorizados a tus fondos.</p>
              <SettingToggle 
                label="Aplicación Autenticadora (Recomendado)" 
                description="Usa Google Authenticator o Authy para generar códigos de acceso únicos." 
                defaultChecked={true}
                onChange={(active) => handle2FA(active)}
              />
              <SettingToggle 
                label="Autenticación por SMS" 
                description="Recibe un código por texto cada vez que intentes retirar activos de tu billetera." 
                onChange={(active) => showNotification(active ? 'SMS 2FA Activado.' : 'SMS 2FA Desactivado.', active ? 'success' : 'error')}
              />
            </div>

            <div>
              <h3 style={{ marginBottom: '1.2rem', color: 'var(--text-primary)' }}>Actualizar Contraseña</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', maxWidth: '450px' }}>
                <input 
                  type="password" placeholder="Contraseña Actual" 
                  value={passwords.current} onChange={(e) => setPasswords({...passwords, current: e.target.value})}
                  style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '1.2rem 1rem', color: '#fff', fontSize: '1rem', outline: 'none' }} 
                />
                <input 
                  type="password" placeholder="Nueva Contraseña (8+ caracteres)" 
                  value={passwords.new} onChange={(e) => setPasswords({...passwords, new: e.target.value})}
                  style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '1.2rem 1rem', color: '#fff', fontSize: '1rem', outline: 'none' }} 
                />
                <button 
                  onClick={handlePasswordUpdate}
                  className="hover-lift" style={{ 
                  padding: '1.2rem', background: 'transparent', border: '1px solid var(--success)', 
                  color: 'var(--success)', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', marginTop: '0.5rem',
                  transition: 'all 0.3s'
                }}
                onMouseOver={(e) => { e.currentTarget.style.background = 'var(--success)'; e.currentTarget.style.color = 'var(--bg-primary)'; }}
                onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--success)'; }}>
                  Confirmar Cambio de Contraseña
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* ===================== PANEL: WALLET ===================== */}
        {/* ========================================================= */}
        {activeTab === 'wallet' && (
          <div className="glass-panel scale-up" style={{ padding: '2.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '1.5rem', marginBottom: '2rem' }}>
              <div style={{ background: 'rgba(188, 0, 255, 0.1)', padding: '12px', borderRadius: '12px' }}>
                <Wallet color="#bc00ff" size={24} />
              </div>
              <h2 style={{ margin: 0, fontSize: '1.6rem' }}>Configuración de Wallet</h2>
            </div>
            
            <div style={{ marginBottom: '3rem' }}>
              <h3 style={{ marginBottom: '1.2rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Link size={18} color="var(--accent-secondary)"/> Conexiones Web3
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Administra billeteras externas conectadas a tu cuenta principal.</p>
              
              {connectedWallets.length === 0 && (
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontStyle: 'italic', marginBottom: '1rem' }}>No hay billeteras conectadas.</p>
              )}

              {connectedWallets.map(wallet => (
                <div key={wallet.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.2rem', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid var(--border-color)', marginBottom: '0.8rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <img src={wallet.icon} alt={wallet.name} style={{ width: '32px' }} />
                    <div>
                      <h4 style={{ margin: '0 0 0.3rem 0', color: 'var(--text-primary)', fontSize: '1.05rem' }}>{wallet.name}</h4>
                      <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{wallet.address}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleDisconnectWallet(wallet.id)}
                    className="hover-bg" style={{ padding: '0.6rem 1.2rem', background: 'rgba(255,77,77,0.1)', color: 'var(--danger)', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.3s' }}>
                    Desconectar
                  </button>
                </div>
              ))}
              
              <div onClick={handleConnectWallet} className="hover-lift" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.2rem', background: 'rgba(255,255,255,0.01)', borderRadius: '12px', border: '1px dashed rgba(255,255,255,0.2)', cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Link size={16} color="var(--text-secondary)" /></div>
                  <h4 style={{ margin: 0, color: 'var(--accent-secondary)', fontSize: '1rem' }}>Vincular Nueva Billetera Web3 (MetaMask/Phantom)</h4>
                </div>
              </div>
            </div>

            <div style={{ marginBottom: '3rem' }}>
              <h3 style={{ marginBottom: '1.2rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Book size={18} color="var(--accent-primary)"/> Libreta Blanca (Whitelist)
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Gestiona las direcciones autorizadas para retiros.</p>
              <SettingToggle 
                label="Limitar retiros a Libreta de Direcciones" 
                description="Bloquea cualquier retiro a direcciones nuevas que no estén guardadas en tu libreta. (Requiere 24h para desactivar esta regla de seguridad)." 
                defaultChecked={true} 
                onChange={(active) => showNotification(active ? 'Lista Blanca bloqueada correctamente.' : 'Iniciando proceso de desbloqueo (24h)...', active ? 'success' : 'error')}
              />
              <button 
                onClick={() => showNotification("Funcionalidad encriptada temporalmente cerrada.")}
                className="hover-lift" style={{ padding: '0.8rem 1.5rem', background: 'transparent', border: '1px solid var(--accent-primary)', color: 'var(--accent-primary)', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', marginTop: '0.8rem' }}>
                Gestionar Libreta de Direcciones
              </button>
            </div>

            <div>
              <h3 style={{ marginBottom: '1.2rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Settings2 size={18} color="var(--success)"/> Preferencias de Trading (Swap)
              </h3>
              <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '200px' }}>
                  <label style={{ display: 'block', marginBottom: '0.8rem', color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 'bold' }}>Tolerancia de Deslizamiento (Slippage)</label>
                  <select onChange={handleSlippageChange} style={{ width: '100%', background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '1.2rem 1rem', outline: 'none', cursor: 'pointer', fontSize: '0.95rem' }}>
                    <option value="0.1" style={{ color: '#000' }}>0.1% (Seguro - Recomendado para Stablecoins)</option>
                    <option value="0.5" style={{ color: '#000' }} selected>0.5% (Estándar - Recomendado para BTC/ETH)</option>
                    <option value="1" style={{ color: '#000' }}>1.0% (Rápido - Para volatilidad)</option>
                    <option value="custom" style={{ color: '#000' }}>Personalizado...</option>
                  </select>
                </div>
                <div style={{ flex: 1, minWidth: '200px' }}>
                  <label style={{ display: 'block', marginBottom: '0.8rem', color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 'bold' }}>Preferencia de Gas Fee (Red Externa)</label>
                  <select onChange={() => showNotification('Preferencia de Gas actualizada.')} style={{ width: '100%', background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '1.2rem 1rem', outline: 'none', cursor: 'pointer', fontSize: '0.95rem' }}>
                    <option value="low" style={{ color: '#000' }}>Económico (Comisión Baja, Más Lento)</option>
                    <option value="med" style={{ color: '#000' }} selected>Medio (Balance de Velocidad y Costo)</option>
                    <option value="high" style={{ color: '#000' }}>Alto (Prioritaria - Instantánea)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* ================= PANEL: NOTIFICACIONES ================= */}
        {/* ========================================================= */}
        {activeTab === 'notifications' && (
          <div className="glass-panel scale-up" style={{ padding: '2.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '1.5rem', marginBottom: '2rem' }}>
              <div style={{ background: 'rgba(255,204,0,0.1)', padding: '12px', borderRadius: '12px' }}>
                <Bell color="#FFCC00" size={24} />
              </div>
              <h2 style={{ margin: 0, fontSize: '1.6rem' }}>Centro de Notificaciones</h2>
            </div>
            
            <SettingToggle 
              label="Alertas de Precios Extremos" 
              description="Te notificaremos si tus activos varían un 10%." 
              defaultChecked={true} 
              onChange={(act) => showNotification(`Alertas de precio ${act ? 'activadas' : 'silenciadas'}.`)}
            />
            <SettingToggle 
              label="Ejecución de Órdenes de Mercado" 
              description="Confirmación visible al instante cuando un trade en tu cuenta se complete con éxito." 
              defaultChecked={true} 
              onChange={() => showNotification('Preferencias actualizadas.')}
            />
            <SettingToggle 
              label="Depósitos y Retiros" 
              description="Recibe reportes obligatorios sobre transferencias entrantes o salientes de tu Wallet." 
              defaultChecked={true} 
              onChange={() => showNotification('Preferencias actualizadas.')}
            />
            <SettingToggle 
              label="Boletín Semanal (Newsletter)" 
              description="Recibe el mejor resumen del mercado (Cripto y CEDEARs) todos los domingos en la mañana." 
              defaultChecked={false} 
              onChange={(act) => showNotification(act ? '¡Te suscribiste al Newsletter!' : 'Suscripción al Newsletter cancelada.')}
            />
          </div>
        )}

        {/* ========================================================= */}
        {/* ================== PANEL: PREFERENCIAS ================== */}
        {/* ========================================================= */}
        {activeTab === 'preferences' && (
          <div className="glass-panel scale-up" style={{ padding: '2.5rem' }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '1.5rem', marginBottom: '2rem' }}>
              <div style={{ background: 'rgba(255,255,255,0.1)', padding: '12px', borderRadius: '12px' }}>
                <Monitor color="#fff" size={24} />
              </div>
              <h2 style={{ margin: 0, fontSize: '1.6rem' }}>Preferencias de Visualización</h2>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '3rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.8rem', color: 'var(--text-secondary)', fontSize: '0.95rem', fontWeight: 'bold' }}>Moneda Base del Portafolio</label>
                <select onChange={(e) => handlePrefChange('fiat', e.target.value)} style={{ width: '100%', maxWidth: '350px', background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '1.2rem 1rem', outline: 'none', cursor: 'pointer', fontSize: '1rem' }}>
                  <option value="usd" style={{ color: '#000' }}>Dólar Estadounidense (USD)</option>
                  <option value="eur" style={{ color: '#000' }}>Euro Común (EUR)</option>
                  <option value="ars" style={{ color: '#000' }}>Peso Argentino (ARS)</option>
                </select>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.8rem' }}>Todos los valores de mercado y saldos de la billetera se indicarán en esta moneda.</p>
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '0.8rem', color: 'var(--text-secondary)', fontSize: '0.95rem', fontWeight: 'bold' }}>Idioma de la Interfaz</label>
                <select onChange={(e) => handlePrefChange('lang', e.target.value)} style={{ width: '100%', maxWidth: '350px', background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '1.2rem 1rem', outline: 'none', cursor: 'pointer', fontSize: '1rem' }}>
                  <option value="es" style={{ color: '#000' }}>Español (América Latina)</option>
                  <option value="en" style={{ color: '#000' }}>English (US)</option>
                  <option value="pt" style={{ color: '#000' }}>Português (Brasil)</option>
                </select>
              </div>
            </div>

            <div style={{ paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
              <h3 style={{ marginBottom: '1.2rem', color: 'var(--text-primary)' }}>Ajustes de Privacidad del Dashboard</h3>
              <SettingToggle 
                label="Módulo de Privacidad (Ocultar Saldos)" 
                description="Mantén difuminados todos los balances globales de tu pantalla hasta que pases el mouse encima." 
                defaultChecked={false} 
                onChange={(act) => showNotification(act ? 'Balances ocultos activados.' : 'Balances de Wallet visibles.')}
              />
              <SettingToggle 
                label="Limitar animaciones gráficas (Accesibilidad)" 
                description="Deshabilita el difuminado y los colores brillantes para mejorar el rendimiento de la batería." 
                defaultChecked={false} 
                onChange={(act) => showNotification(act ? 'Modo Simple y Accesibilidad encendido.' : 'Gráficos avanzados encendidos.')}
              />
            </div>
          </div>
        )}

      </div>

      <style>{`
        .hover-bg:hover {
          background: rgba(255,255,255,0.05) !important;
        }
        .scale-up {
          animation: scaleUp 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        @keyframes scaleUp {
          from { opacity: 0; transform: scale(0.98); }
          to { opacity: 1; transform: scale(1); }
        }
        @media (max-width: 900px) {
          .settings-page > div {
            display: flex !important;
            flex-direction: column !important;
          }
          .settings-page input, .settings-page select {
            max-width: 100% !important;
          }
        }
        @media (max-width: 768px) {
           .mobile-logout-tag {
              display: block !important;
           }
        }
      `}</style>
    </div>
  );
};

export default Settings;
