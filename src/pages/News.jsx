import React, { useState, useEffect } from 'react';
import { Clock, TrendingUp, Zap, ChevronDown, Search, ArrowRight, BookOpen, Users, TrendingDown, Minus } from 'lucide-react';

// ── Category color map ──────────────────────────────────────────
const CATEGORY_COLORS = {
  Bitcoin:    { bg: 'rgba(247,147,26,0.15)', border: 'rgba(247,147,26,0.5)', text: '#f7931a' },
  DeFi:       { bg: 'rgba(139,92,246,0.15)', border: 'rgba(139,92,246,0.5)', text: '#8b5cf6' },
  Regulación: { bg: 'rgba(59,130,246,0.15)', border: 'rgba(59,130,246,0.5)', text: '#3b82f6' },
  Mercado:    { bg: 'rgba(0,255,136,0.12)',  border: 'rgba(0,255,136,0.4)',  text: '#00ff88' },
};

const CategoryBadge = ({ cat, size = 'sm' }) => {
  const c = CATEGORY_COLORS[cat] || { bg: 'rgba(255,255,255,0.08)', border: 'rgba(255,255,255,0.2)', text: '#fff' };
  return (
    <span style={{
      background: c.bg, border: `1px solid ${c.border}`, color: c.text,
      padding: size === 'sm' ? '3px 10px' : '5px 14px',
      borderRadius: '20px', fontWeight: 'bold',
      fontSize: size === 'sm' ? '0.72rem' : '0.8rem',
      whiteSpace: 'nowrap'
    }}>{cat}</span>
  );
};

// ── Sentiment badge ─────────────────────────────────────────────
const SENTIMENTS = ['Alcista', 'Bajista', 'Neutral'];
const SentimentBadge = ({ id }) => {
  const s = SENTIMENTS[id % 3];
  const cfg = {
    Alcista: { color: '#00ff88', Icon: TrendingUp,   bg: 'rgba(0,255,136,0.1)' },
    Bajista: { color: '#ff4d4d', Icon: TrendingDown, bg: 'rgba(255,77,77,0.1)' },
    Neutral: { color: '#aaa',    Icon: Minus,        bg: 'rgba(255,255,255,0.05)' },
  }[s];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '4px',
      background: cfg.bg, color: cfg.color,
      padding: '3px 10px', borderRadius: '20px', fontSize: '0.72rem', fontWeight: 'bold', whiteSpace: 'nowrap'
    }}>
      <cfg.Icon size={12} /> {s}
    </span>
  );
};

// ── Reading time ────────────────────────────────────────────────
const ReadTime = ({ id }) => (
  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
    <BookOpen size={13} /> {(id % 4) + 2} min
  </span>
);

// ── Live readers (animated) ─────────────────────────────────────
const LiveReaders = ({ base = 180 }) => {
  const [count, setCount] = useState(base);
  useEffect(() => {
    const t = setInterval(() => setCount(n => n + Math.floor(Math.random() * 7) - 3), 3000);
    return () => clearInterval(t);
  }, []);
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#ff9900', fontSize: '0.85rem', fontWeight: 'bold' }}>
      <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#ff9900', animation: 'pulse 1.5s infinite', display: 'inline-block' }} />
      🔥 {count} leyendo ahora
    </span>
  );
};

// ── Breaking news ticker ────────────────────────────────────────
const TICKER_ITEMS = [
  '⚡ BTC +4.5% — Nuevo máximo semanal',
  '📊 ETH supera los $2,400 en volumen récord',
  '🏦 BlackRock amplía su ETF de Bitcoin',
  '📉 CPI de EE.UU. baja — mercado reacciona positivo',
  '🌐 MicroStrategy compra 9,000 BTC adicionales',
  '🇸🇻 El Salvador lanza Puerto Bitcoin volcánico',
  '⚖️ SEC retrasa decisión sobre ETF de Ethereum',
];

const NewsTicker = () => (
  <div className="news-ticker-wrap" style={{
    background: 'rgba(0,255,136,0.06)', borderTop: '1px solid rgba(0,255,136,0.15)',
    borderBottom: '1px solid rgba(0,255,136,0.15)', padding: '10px 0',
    overflow: 'hidden', marginBottom: '2rem', borderRadius: '12px'
  }}>
    <div className="news-ticker-content" style={{ display: 'flex', gap: '4rem', animation: 'ticker 30s linear infinite', width: 'max-content' }}>
      {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
        <span key={i} style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', whiteSpace: 'nowrap' }}>
          <span style={{ color: 'var(--accent-primary)', fontWeight: 'bold', marginRight: '0.5rem' }}>NEXCRYPTO</span>
          {item}
        </span>
      ))}
    </div>
  </div>
);

// ── Data ────────────────────────────────────────────────────────
const categories = ['Todo', 'Bitcoin', 'DeFi', 'Regulación', 'Mercado'];

const featuredNews = {
  id: 0, category: 'Bitcoin',
  title: 'Bitcoin supera expectativas tras la última reunión de la FED',
  source: 'CryptoInsider', time: 'Hace 1 hr',
  image: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
  summary: 'El mercado muestra fuerte soporte institucional después de los comentarios previstos del presidente de la Reserva Federal. Analistas predicen un nuevo máximo histórico este trimestre.',
};

const popularNews = [
  { id: 1, title: 'El ETF de Bitcoin rompe récord de volumen en su primera semana', source: 'CriptoNoticias', time: 'Hace 4 hrs', category: 'Bitcoin', image: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', featured: true },
  { id: 2, title: 'Ethereum Foundation anuncia la fecha para Dencun', source: 'CoinDesk', time: 'Hace 6 hrs', category: 'DeFi', image: 'https://images.unsplash.com/photo-1622737133809-d95047b9e673?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
  { id: 3, title: 'Nuevas regulaciones podrían afectar a las DeFi en Europa', source: 'Bloomberg', time: 'Hace 12 hrs', category: 'Regulación', image: 'https://images.unsplash.com/photo-1639762681485-074b7f4fc651?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
];

const recentNews = [
  { id: 4, title: 'Solana (SOL) se recupera después de la interrupción de red', source: 'Decrypt', time: 'Hace 10 min', category: 'DeFi', image: 'https://images.unsplash.com/photo-1622630998477-20aa696ecb05?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60', details: 'Tras una caída temporal que duró poco más de 5 horas, los validadores de la red Solana lograron un reinicio exitoso. El precio del token experimentó volatilidad inicial pero los analistas confían en la robustez institucional.' },
  { id: 5, title: 'Binance lanza plataforma de staking para inversores institucionales', source: 'Crypto News', time: 'Hace 45 min', category: 'Mercado', image: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80', details: 'El exchange anunció hoy VIP Staking, un servicio diseñado específicamente para fondos institucionales que buscan rentabilidades seguras con sus criptoactivos inactivos, priorizando seguridad de custodia.' },
  { id: 8, title: 'Bitcoin: Ballenas acumulan más de 100,000 BTC en el último mes', source: 'Blockchain Monitor', time: 'Hace 50 min', category: 'Bitcoin', image: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80', details: 'Datos on-chain revelan un movimiento masivo de Bitcoin desde exchanges hacia billeteras frías. Las direcciones que poseen entre 1,000 y 10,000 BTC han aumentado su balance significativamente, sugiriendo una fase de acumulación a largo plazo.' },
  { id: 6, title: 'Desarrolladores de Cardano presentan nueva hoja de ruta', source: 'CardanoFeed', time: 'Hace 1 hr', category: 'DeFi', image: 'https://images.unsplash.com/photo-1639762681057-408e52192e55?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80', details: 'La fundación detrás de Cardano reveló su actualización más ambiciosa. Promete mejorar drásticamente la escalabilidad y los tiempos de procesamiento de los contratos inteligentes en la mainnet para 2026.' },
  { id: 9, title: 'SEC pospone decisión sobre los ETFs de Ethereum al contado', source: 'Reuters', time: 'Hace 1.2 hrs', category: 'Regulación', image: 'https://images.unsplash.com/photo-1639762681485-074b7f4fc651?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80', details: 'La Comisión de Bolsa y Valores de EE. UU. ha retrasado nuevamente su veredicto sobre las solicitudes de ETFs de Ethereum presentadas por BlackRock y Fidelity. El mercado esperaba una decisión para mayo.' },
  { id: 7, title: 'El token de Uniswap sube un 15% tras anuncio sorpresivo', source: 'CoinTelegraph', time: 'Hace 1.5 hrs', category: 'DeFi', image: 'https://images.unsplash.com/photo-1622737133809-d95047b9e673?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80', details: 'Sorpresivamente, el equipo de Uniswap Labs propuso activar la votación de comisiones (fee switch) que recompensaría directamente a los poseedores del token UNI con un porcentaje de las comisiones.' },
  { id: 10, title: 'MicroStrategy anuncia nueva compra de 9,000 Bitcoins', source: 'Michael Saylor Twitter', time: 'Hace 2 hrs', category: 'Bitcoin', image: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80', details: 'La empresa liderada por Michael Saylor continúa su estrategia de tesorería en Bitcoin. Con esta última adquisición, la compañía ya posee cerca del 1% del suministro total de la madre de todas las criptomonedas.' },
  { id: 11, title: 'El Salvador inaugura primer puerto Bitcoin impulsado por energía volcánica', source: 'El Salvador News', time: 'Hace 3 hrs', category: 'Mercado', image: 'https://images.unsplash.com/photo-1622630998477-20aa696ecb05?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80', details: 'El presidente Nayib Bukele anunció la finalización de la fase 1 de Bitcoin City. La infraestructura portuaria operará completamente con energía geotérmica renovable extraída de la cordillera volcánica central.' },
];

// ── Component ───────────────────────────────────────────────────
const News = () => {
  const [expandedId, setExpandedId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Todo');

  const redirect = () => window.open('https://es.investing.com/news/cryptocurrency-news', '_blank');

  const filteredNews = recentNews.filter(item => {
    const matchSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.source.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCat = activeCategory === 'Todo' || item.category === activeCategory;
    return matchSearch && matchCat;
  });

  return (
    <div className="news-page fade-in">

      {/* ── Header ── */}
      <header className="dashboard-header" style={{ marginBottom: '1.5rem' }}>
        <div className="news-header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <h1 style={{ margin: 0 }}>Crypto News</h1>
            <p className="text-secondary" style={{ fontSize: '1.05rem', margin: '0.4rem 0 0' }}>Tu puente de información en la blockchain.</p>
          </div>
          <div className="news-search-input-wrap" style={{
            position: 'relative', background: 'rgba(255,255,255,0.05)', borderRadius: '16px',
            padding: '2px 15px', border: '1px solid var(--border-color)', display: 'flex',
            alignItems: 'center', minWidth: '280px', maxWidth: '380px', width: '100%',
            boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.2)'
          }}>
            <Search size={17} color="var(--text-secondary)" />
            <input
              type="text" placeholder="Buscar noticias, fuentes..."
              value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
              style={{ background: 'transparent', border: 'none', color: '#fff', padding: '11px 10px', width: '100%', outline: 'none', fontSize: '0.95rem' }}
            />
          </div>
        </div>
      </header>

      {/* ── Ticker ── */}
      <NewsTicker />

      {/* ── Category Tabs ── */}
      <div className="news-tabs" style={{ display: 'flex', gap: '8px', marginBottom: '2.5rem', overflowX: 'auto', paddingBottom: '8px', scrollbarWidth: 'none' }}>
        {categories.map(cat => {
          const c = CATEGORY_COLORS[cat];
          const isActive = activeCategory === cat;
          return (
            <button key={cat} onClick={() => setActiveCategory(cat)} style={{
              padding: '7px 18px', borderRadius: '20px', fontWeight: 'bold', cursor: 'pointer',
              whiteSpace: 'nowrap', transition: 'all 0.25s ease', fontSize: '0.88rem',
              background: isActive ? (c ? c.bg : 'rgba(0,255,136,0.15)') : 'rgba(255,255,255,0.03)',
              border: isActive ? `1px solid ${c ? c.border : 'rgba(0,255,136,0.5)'}` : '1px solid var(--border-color)',
              color: isActive ? (c ? c.text : 'var(--accent-primary)') : 'var(--text-secondary)',
              boxShadow: isActive ? `0 0 12px ${c ? c.border : 'rgba(0,255,136,0.3)'}` : 'none',
            }}>
              {cat}
            </button>
          );
        })}
      </div>

      {/* ── Featured Article ── */}
      <div className="hover-lift news-featured" onClick={redirect}
        style={{ position: 'relative', borderRadius: '24px', overflow: 'hidden', marginBottom: '3rem',
          minHeight: '400px', display: 'flex', alignItems: 'flex-end', cursor: 'pointer',
          border: '1px solid var(--border-color)', boxShadow: '0 20px 60px rgba(0,0,0,0.6)' }}
      >
        <img src={featuredNews.image} alt="Featured" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }} />
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to top, rgba(11,14,20,1) 20%, rgba(11,14,20,0.5) 60%, rgba(11,14,20,0) 100%)', zIndex: 1 }} />
        <div className="news-featured-body" style={{ position: 'relative', zIndex: 2, padding: '3rem', width: '100%', maxWidth: '820px' }}>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '1.2rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ background: 'var(--accent-primary)', color: 'var(--bg-primary)', padding: '5px 14px', borderRadius: '20px', fontWeight: 'bold', fontSize: '0.73rem', display: 'inline-flex', alignItems: 'center', gap: '5px', boxShadow: '0 0 15px var(--accent-primary)' }}>
              <Zap size={13} /> NOTICIA DESTACADA
            </span>
            <CategoryBadge cat={featuredNews.category} size="md" />
            <SentimentBadge id={featuredNews.id} />
            <LiveReaders base={342} />
          </div>
          <h2 style={{ fontSize: '2.6rem', marginBottom: '1rem', lineHeight: '1.15', fontWeight: '800', textShadow: '0 4px 15px rgba(0,0,0,0.8)' }}>{featuredNews.title}</h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.1rem', marginBottom: '1.8rem', lineHeight: '1.6' }}>{featuredNews.summary}</p>
          <div className="news-featured-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', gap: '1.2rem', color: 'rgba(255,255,255,0.65)', fontSize: '0.9rem', alignItems: 'center' }}>
              <span style={{ fontWeight: '700', color: 'var(--accent-primary)' }}>{featuredNews.source}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Clock size={14} /> {featuredNews.time}</span>
              <ReadTime id={featuredNews.id} />
            </div>
            <button className="hover-lift" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', padding: '10px 22px', borderRadius: '12px', color: '#fff', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', backdropFilter: 'blur(10px)', cursor: 'pointer' }}>
              Leer Artículo <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* ── Popular: Magazine Layout ── */}
      <div style={{ marginBottom: '4rem' }}>
        <h3 className="news-section-title" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.8rem', fontSize: '1.35rem' }}>
          <TrendingUp color="var(--accent-primary)" size={24} /> MÁS POPULAR
        </h3>
        <div className="news-magazine" style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gridTemplateRows: 'auto auto', gap: '1.5rem' }}>
          {/* Big card */}
          {popularNews[0] && (
            <div className="glass-panel hover-lift" onClick={redirect}
              style={{ cursor: 'pointer', overflow: 'hidden', padding: 0, gridRow: '1 / span 2', display: 'flex', flexDirection: 'column', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <div style={{ height: '280px', overflow: 'hidden', position: 'relative' }}>
                <img src={popularNews[0].image} alt={popularNews[0].title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                  onMouseOver={e => e.target.style.transform = 'scale(1.05)'}
                  onMouseOut={e => e.target.style.transform = 'scale(1)'} />
                <div style={{ position: 'absolute', top: '14px', left: '14px', display: 'flex', gap: '8px' }}>
                  <CategoryBadge cat={popularNews[0].category} />
                  <SentimentBadge id={popularNews[0].id} />
                </div>
              </div>
              <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.3rem', lineHeight: '1.4', fontWeight: '700', flex: 1 }}>{popularNews[0].title}</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
                  <span style={{ fontWeight: '700', color: 'var(--accent-primary)' }}>{popularNews[0].source}</span>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <ReadTime id={popularNews[0].id} />
                    <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Clock size={14} /> {popularNews[0].time}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* Two small cards */}
          {popularNews.slice(1).map(item => (
            <div key={item.id} className="glass-panel hover-lift news-small-card" onClick={redirect}
              style={{ cursor: 'pointer', overflow: 'hidden', padding: 0, display: 'flex', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <div className="news-small-thumb" style={{ width: '130px', flexShrink: 0, overflow: 'hidden', position: 'relative' }}>
                <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '1.2rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', gap: '6px', marginBottom: '0.7rem', flexWrap: 'wrap' }}>
                  <CategoryBadge cat={item.category} />
                  <SentimentBadge id={item.id} />
                </div>
                <h4 style={{ margin: '0 0 0.8rem 0', fontSize: '0.95rem', lineHeight: '1.4', fontWeight: '600' }}>{item.title}</h4>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                  <span style={{ fontWeight: '700', color: 'var(--accent-primary)' }}>{item.source}</span>
                  <ReadTime id={item.id} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Accordion List ── */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h3 className="news-section-title" style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.35rem', margin: 0 }}>
            <Clock color="var(--accent-secondary)" size={24} /> MÁS PARA TI
          </h3>
          {(searchQuery || activeCategory !== 'Todo') && (
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{filteredNews.length} resultados</span>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
          {filteredNews.length > 0 ? filteredNews.map(item => {
            const isOpen = expandedId === item.id;
            const catColor = CATEGORY_COLORS[item.category]?.text || 'var(--accent-secondary)';
            return (
              <div key={item.id} onClick={() => setExpandedId(prev => prev === item.id ? null : item.id)}
                style={{ padding: '1.3rem 1.8rem', background: isOpen ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.02)', borderRadius: '18px', border: isOpen ? `1px solid rgba(255,255,255,0.12)` : '1px solid rgba(255,255,255,0.06)', cursor: 'pointer', transition: 'all 0.35s ease', boxShadow: isOpen ? '0 10px 30px rgba(0,0,0,0.3)' : 'none' }}
              >
                {/* Row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: 9, height: 9, borderRadius: '50%', background: catColor, boxShadow: `0 0 8px ${catColor}`, flexShrink: 0 }} />
                  <h4 style={{ margin: 0, fontSize: '1.05rem', flex: 1, fontWeight: '600', color: isOpen ? 'var(--accent-primary)' : 'var(--text-primary)', transition: 'color 0.3s' }}>{item.title}</h4>
                  <div className="news-accordion-meta" style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-secondary)', fontSize: '0.85rem', flexShrink: 0 }}>
                    <CategoryBadge cat={item.category} />
                    <SentimentBadge id={item.id} />
                    <ReadTime id={item.id} />
                    <span className="hide-on-mobile" style={{ minWidth: '75px', textAlign: 'right', fontSize: '0.8rem' }}>{item.time}</span>
                    <ChevronDown size={20} style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.35s ease', color: isOpen ? 'var(--accent-primary)' : 'var(--text-secondary)' }} />
                  </div>
                </div>

                {/* Expand */}
                <div style={{ maxHeight: isOpen ? '500px' : '0', opacity: isOpen ? 1 : 0, overflow: 'hidden', transition: 'all 0.45s cubic-bezier(0.4,0,0.2,1)', marginTop: isOpen ? '1.3rem' : 0 }}>
                  <div className="news-accordion-expand" style={{ display: 'flex', gap: '2rem', paddingTop: '1.3rem', borderTop: '1px solid rgba(255,255,255,0.07)', flexWrap: 'wrap' }}>
                    <img src={item.image} alt="thumb" style={{ width: '200px', height: '130px', objectFit: 'cover', borderRadius: '14px', boxShadow: '0 8px 20px rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.08)' }} />
                    <div style={{ flex: 1, minWidth: '250px' }}>
                      <div style={{ display: 'flex', gap: '10px', marginBottom: '0.8rem', alignItems: 'center' }}>
                        <span style={{ color: 'var(--accent-primary)', fontWeight: 'bold', fontSize: '0.9rem' }}>{item.source}</span>
                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>· {item.time}</span>
                        <LiveReaders base={40 + item.id * 13} />
                      </div>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.97rem', lineHeight: '1.7', margin: '0 0 1.2rem 0' }}>{item.details}</p>
                      <button className="hover-lift" onClick={e => { e.stopPropagation(); window.open('https://es.investing.com/news/cryptocurrency-news', '_blank'); }}
                        style={{ background: 'transparent', border: `1px solid ${catColor}`, color: catColor, padding: '7px 18px', borderRadius: '10px', fontWeight: 'bold', fontSize: '0.88rem', cursor: 'pointer' }}>
                        Leer Nota Completa <ArrowRight size={14} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: 4 }} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          }) : (
            <div style={{ textAlign: 'center', padding: '4rem 2rem', background: 'rgba(255,255,255,0.01)', borderRadius: '24px', border: '1px dashed var(--border-color)' }}>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>No encontramos noticias que coincidan.</p>
              <button onClick={() => { setSearchQuery(''); setActiveCategory('Todo'); }}
                style={{ background: 'none', border: 'none', color: 'var(--accent-primary)', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}>
                Limpiar filtros
              </button>
            </div>
          )}
        </div>

        {filteredNews.length > 0 && (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem' }}>
            <button className="hover-lift" onClick={redirect}
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', color: '#fff', padding: '11px 36px', borderRadius: '14px', fontWeight: 'bold', fontSize: '0.95rem', cursor: 'pointer' }}>
              Cargar más noticias
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes ticker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.4; transform: scale(0.8); }
        }

        /* ── Tablet (≤ 900px) ────────────────────────────────── */
        @media (max-width: 900px) {
          /* Magazine layout: stack vertically */
          .news-magazine { grid-template-columns: 1fr !important; grid-template-rows: auto !important; }
          .news-magazine > div:first-child { grid-row: auto !important; }

          /* Small popular cards: stack image on top */
          .news-small-card { flex-direction: column !important; }
          .news-small-card .news-small-thumb { width: 100% !important; height: 160px !important; }
        }

        /* ── Mobile (≤ 640px) ────────────────────────────────── */
        @media (max-width: 640px) {
          /* Header */
          .news-header-row { flex-direction: column !important; align-items: flex-start !important; }
          .news-header-row > div:last-child { width: 100% !important; max-width: none !important; min-width: unset !important; }
          .news-search-input-wrap { min-width: unset !important; max-width: none !important; width: 100% !important; }

          /* Featured hero */
          .news-featured { min-height: 300px !important; border-radius: 16px !important; }
          .news-featured-body { padding: 1.6rem !important; }
          .news-featured-body h2 { font-size: 1.5rem !important; margin-bottom: 0.7rem !important; }
          .news-featured-body p  { font-size: 0.9rem !important; margin-bottom: 1rem !important; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
          .news-featured-footer  { flex-direction: column !important; gap: 0.8rem !important; }
          .news-featured-footer button { width: 100% !important; justify-content: center !important; }

          /* Category tabs */
          .news-tabs { gap: 6px !important; margin-bottom: 1.5rem !important; }
          .news-tabs button { padding: 6px 13px !important; font-size: 0.8rem !important; }

          /* Ticker */
          .news-ticker-wrap { border-radius: 8px !important; padding: 8px 0 !important; }

          /* Accordion row */
          .news-accordion-meta { gap: 6px !important; flex-wrap: wrap !important; }
          .news-accordion-meta .cat-label { display: none !important; }
          .news-accordion-expand { flex-direction: column !important; }
          .news-accordion-expand img { width: 100% !important; height: 160px !important; }

          /* Section headings */
          .news-section-title { font-size: 1.1rem !important; }

          /* General */
          .hide-on-mobile { display: none !important; }
        }
      `}</style>
    </div>
  );
};

export default News;
