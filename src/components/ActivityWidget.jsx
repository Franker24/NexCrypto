import React from 'react';
import { Bell, CheckCircle2, ShieldAlert } from 'lucide-react';

const activityData = [
  { id: 1, type: 'alert', text: 'Bitcoin acaba de quebrar la resistencia de los $44K.', time: 'Hace 5m' },
  { id: 2, type: 'success', text: 'Orden de compra ejecutada a mercado: +0.15 ETH.', time: 'Hace 2h' },
  { id: 3, type: 'info', text: 'Inicio de sesión detectado desde nuevo equipo (Mac).', time: 'Ayer' }
];

const ActivityWidget = () => (
    <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.5rem' }}>
        <Bell color="var(--accent-secondary)" size={20} />
        <h3 style={{ margin: 0, fontWeight: '600', fontSize: '1.1rem' }}>Actividad y Alertas</h3>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
        {activityData.map((act, index) => (
          <div key={act.id} style={{ 
            display: 'flex', gap: '14px', padding: '1.2rem 0', 
            borderBottom: index === activityData.length - 1 ? 'none' : '1px solid rgba(255,255,255,0.05)'
          }}>
            <div style={{ marginTop: '2px' }}>
              {act.type === 'alert' && <ShieldAlert size={18} color="var(--accent-primary)" />}
              {act.type === 'success' && <CheckCircle2 size={18} color="var(--success)" />}
              {act.type === 'info' && <Bell size={18} color="var(--text-secondary)" />}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ fontSize: '0.92rem', lineHeight: '1.4', color: 'var(--text-primary)' }}>{act.text}</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 'bold' }}>{act.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
);

export default ActivityWidget;
