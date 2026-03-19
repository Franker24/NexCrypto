import React, { useState } from 'react';
import { X, ArrowDown, ArrowRightLeft, Copy, CheckCircle2 } from 'lucide-react';

export const TransactionForm = ({ actionType, data, copied, setCopied }) => {
  const mockupAddress = "0x7a59e13...Bf3dA9";
  
  switch (actionType) {
    case 'Deposit':
      return (
         <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
           <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', fontSize: '0.95rem' }}>Recibe fondos directamente escaneando el código QR o copiando tu dirección única.</p>
           <div style={{ background: '#fff', padding: '1rem', borderRadius: '16px', alignSelf: 'center', marginBottom: '1rem' }}>
             <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=0x7a59Bf3dA9" alt="QR Code Deposit" style={{ width: '150px', height: '150px', display: 'block' }} />
           </div>
           
           <div>
             <label style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', display: 'block', marginBottom: '0.5rem' }}>Red de Depósito</label>
             <select style={{ width: '100%', background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '0.8rem', outline: 'none', marginBottom: '1rem' }}>
               <option>Ethereum (ERC-20)</option>
               <option>Tron (TRC-20)</option>
               <option>Solana</option>
               <option>Bitcoin</option>
             </select>
           </div>

           <label style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Dirección de Depósito</label>
           <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', padding: '0.8rem 1rem', border: '1px solid var(--border-color)', justifyContent: 'space-between' }}>
             <span style={{ fontFamily: 'monospace', letterSpacing: '1px', fontSize: '1rem', color: '#fff' }}>{mockupAddress}</span>
             <button onClick={() => { setCopied(true); setTimeout(() => setCopied(false), 2000) }} style={{ background: 'transparent', border: 'none', color: copied ? 'var(--success)' : 'var(--accent-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', padding: '0.2rem' }}>
               {copied ? <CheckCircle2 size={20} /> : <Copy size={20} />}
             </button>
           </div>
         </div>
      );
    case 'Withdraw':
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <div>
            <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Enviar a (Dirección destino)</label>
            <input type="text" placeholder="Ej: 0x..." style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '1rem', color: '#fff', fontSize: '1rem', outline: 'none' }} />
          </div>
          <div>
            <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Monto a retirar</label>
            <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', padding: '0.5rem 1rem', border: '1px solid var(--border-color)' }}>
             <input type="number" placeholder="0.00" style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '1.2rem', width: '100%', outline: 'none' }} />
             <button style={{ color: 'var(--accent-primary)', background: 'transparent', border: 'none', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.9rem' }}>MAX</button>
            </div>
          </div>
          <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid var(--border-color)', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            Comisión de red: <span style={{ color: '#fff', fontWeight: 'bold' }}>~$2.50 USD</span>
          </div>
        </div>
      );
    case 'Transfer':
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem', fontSize: '0.95rem' }}>Transfiere activos gratuitamente (0 fee) internamente a otros usuarios.</p>
          <div>
            <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Email del destinatario o ID de cuenta</label>
            <input type="text" placeholder="usuario@email.com" style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '1rem', color: '#fff', fontSize: '1rem', outline: 'none' }} />
          </div>
          <div>
            <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Monto a transferir (USD)</label>
            <input type="number" placeholder="$0.00" style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '1rem', color: 'var(--accent-primary)', fontSize: '1.4rem', outline: 'none', fontWeight: 'bold' }} />
          </div>
        </div>
      );
    case 'Swap':
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
           <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.2rem', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
             <label style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>De (Pagas)</label>
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
               <input type="number" placeholder="0.0" style={{ width: '60%', background: 'transparent', border: 'none', color: '#fff', fontSize: '1.8rem', outline: 'none' }} />
               <select style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: 'none', borderRadius: '10px', padding: '0.6rem 1rem', outline: 'none', fontWeight: 'bold', fontSize: '1rem' }}>
                 <option>USDT</option>
                 <option>BTC</option>
                 <option>ETH</option>
               </select>
             </div>
           </div>
           
           <div style={{ alignSelf: 'center', background: 'rgba(255,255,255,0.1)', padding: '10px', borderRadius: '50%', margin: '-16px 0', zIndex: 2, position: 'relative', border: '4px solid var(--bg-card)' }}>
             <ArrowDown size={18} color="var(--accent-secondary)" />
           </div>

           <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.2rem', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
             <label style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>A (Recibes)</label>
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
               <input type="number" placeholder="0.0" disabled style={{ width: '60%', background: 'transparent', border: 'none', color: 'var(--text-secondary)', fontSize: '1.8rem', outline: 'none' }} />
               <select style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: 'none', borderRadius: '10px', padding: '0.6rem 1rem', outline: 'none', fontWeight: 'bold', fontSize: '1rem' }}>
                 <option>BTC</option>
                 <option>ETH</option>
                 <option>SOL</option>
               </select>
             </div>
            </div>
         </div>
      );
    case 'Details':
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
            <div style={{ 
              padding: '20px', background: 'rgba(255,255,255,0.03)', borderRadius: '24px', 
              border: '1px solid var(--border-color)', boxShadow: 'inset 0 0 20px rgba(255,255,255,0.05)' 
            }}>
              {data?.icon}
            </div>
          </div>
          
          <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
            <h1 style={{ margin: '0 0 0.5rem 0', fontSize: '2.4rem', fontWeight: '800' }}>{data?.amount}</h1>
            <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '1rem' }}>{data?.asset}</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Estado</span>
              <span style={{ color: data?.status === 'Completado' ? 'var(--success)' : 'var(--accent-primary)', fontWeight: 'bold' }}>{data?.status}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Fecha y Hora</span>
              <span>{data?.date}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)' }}>ID de Transacción</span>
              <span style={{ fontFamily: 'monospace', opacity: 0.8 }}>#TX-{(data?.id || 0) * 123456}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)' }}>ID de Bloque</span>
              <span style={{ fontFamily: 'monospace', opacity: 0.8 }}>829,142</span>
            </div>
          </div>
        </div>
      );
    default:
      return null;
  }
};

export const getButtonText = (actionType) => {
  switch (actionType) {
    case 'Deposit': return 'Entendido';
    case 'Withdraw': return 'Confirmar Retiro';
    case 'Transfer': return 'Enviar Fondos';
    case 'Swap': return 'Ejecutar Swap';
    case 'Details': return 'Cerrar Detalles';
    default: return 'Continuar';
  }
};

const TransactionModal = ({ isOpen, onClose, actionType, data }) => {
  if (!isOpen) return null;

  const [copied, setCopied] = useState(false);

  return (
    <div className="modal-overlay" style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
      background: 'rgba(0,0,0,0.7)',
      backdropFilter: 'blur(8px)',
      zIndex: 1000,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '1rem',
      animation: 'fadeIn 0.3s ease'
    }} onClick={(e) => { if (e.target.className === 'modal-overlay') onClose(); }}>
      
      <div className="glass-panel modal-content" style={{
        width: '100%', maxWidth: '450px', padding: '2.5rem',
        position: 'relative',
        boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
        background: 'rgba(11,14,20,0.95)',
        border: '1px solid rgba(255,255,255,0.1)',
        animation: 'slideUp 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards'
      }}>
        
        {/* Mobile Drag Handle */}
        <div className="hide-on-desktop" style={{ 
          width: '50px', height: '5px', background: 'rgba(255,255,255,0.1)', 
          borderRadius: '10px', margin: '-1.5rem auto 1.5rem auto' 
        }}></div>

        <button onClick={onClose} style={{
          position: 'absolute', top: '1.5rem', right: '1.5rem',
          background: 'rgba(255,255,255,0.05)', border: 'none', color: 'var(--text-secondary)',
          cursor: 'pointer', padding: '0.5rem', borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s'
        }}
        onMouseOver={(e) => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.1)' }}
        onMouseOut={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }}
        >
          <X size={20} />
        </button>

        <h2 className="modal-title" style={{ margin: '0 0 2rem 0', fontSize: '1.6rem', color: 'var(--text-primary)' }}>
          {actionType === 'Deposit' ? 'Depositar Cripto' : 
           actionType === 'Withdraw' ? 'Retirar Fondos' : 
           actionType === 'Transfer' ? 'Transferencia Interna' : 
           actionType === 'Details' ? 'Detalles del Movimiento' : 'Swap de Activos'}
        </h2>

        <TransactionForm actionType={actionType} data={data} copied={copied} setCopied={setCopied} />

        <button 
          onClick={onClose}
          className="hover-lift"
          style={{
          width: '100%', marginTop: '2.5rem', padding: '1rem',
          borderRadius: '12px', border: 'none',
          background: 'var(--accent-primary)',
          color: 'var(--bg-primary)',
          fontWeight: 'bold', fontSize: '1.1rem',
          cursor: 'pointer',
          boxShadow: '0 0 20px rgba(0, 255, 136, 0.2)'
        }}>
          {getButtonText(actionType)}
        </button>

      </div>
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(40px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes slideUpFull {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }

        @media (max-width: 768px) {
          .modal-overlay {
            align-items: flex-end !important;
            padding: 0 !important;
          }
          .modal-content {
            max-width: 100% !important;
            border-radius: 24px 24px 0 0 !important;
            padding: 2.5rem 1.5rem 4rem 1.5rem !important;
            animation: slideUpFull 0.4s cubic-bezier(0.2, 0.8, 0.2, 1) forwards !important;
            max-height: 92vh;
            overflow-y: auto;
          }
          .modal-title {
            text-align: center;
            margin-bottom: 2.5rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default TransactionModal;
