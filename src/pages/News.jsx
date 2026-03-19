import React, { useState } from 'react';
import { Clock, TrendingUp, Zap, ChevronDown, Search, Filter, ArrowRight } from 'lucide-react';

const categories = ['Todo', 'Bitcoin', 'DeFi', 'Regulación', 'Mercado'];

const featuredNews = {
  id: 0,
  title: 'Bitcoin supera expectativas tras la última reunión de la FED',
  source: 'CryptoInsider',
  time: 'Hace 1 hr',
  category: 'Bitcoin',
  image: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
  summary: 'El mercado muestra fuerte soporte institucional después de los comentarios previstos del presidente de la Reserva Federal. Analistas predicen un nuevo máximo histórico este trimestre.'
};

const popularNews = [
  { id: 1, title: 'El ETF de Bitcoin rompe récord de volumen en su primera semana', source: 'CriptoNoticias', time: 'Hace 4 hrs', category: 'Bitcoin', image: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
  { id: 2, title: 'Ethereum Foundation anuncia la fecha para Dencun', source: 'CoinDesk', time: 'Hace 6 hrs', category: 'DeFi', image: 'https://images.unsplash.com/photo-1622737133809-d95047b9e673?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
  { id: 3, title: 'Nuevas regulaciones podrían afectar a las DeFi en Europa', source: 'Bloomberg', time: 'Hace 12 hrs', category: 'Regulación', image: 'https://images.unsplash.com/photo-1639762681485-074b7f4fc651?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' }
];

const recentNews = [
  { 
    id: 4, 
    title: 'Solana (SOL) se recupera después de la interrupción de red', 
    source: 'Decrypt', 
    time: 'Hace 10 min',
    category: 'DeFi',
    image: 'https://images.unsplash.com/photo-1622630998477-20aa696ecb05?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60',
    details: 'Tras una caída temporal que duró poco más de 5 horas, los validadores de la red Solana lograron un reinicio exitoso. El precio del token experimentó volatilidad inicial pero los analistas confían en la robustez institucional.'
  },
  { 
    id: 5, 
    title: 'Binance lanza plataforma de staking para inversores institucionales', 
    source: 'Crypto News', 
    time: 'Hace 45 min',
    category: 'Mercado',
    image: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    details: 'El exchange anunció hoy VIP Staking, un servicio diseñado específicamente para fondos institucionales que buscan rentabilidades seguras con sus criptoactivos inactivos, priorizando seguridad de custodia.'
  },
  { 
    id: 8, 
    title: 'Bitcoin: Ballenas acumulan más de 100,000 BTC en el último mes', 
    source: 'Blockchain Monitor', 
    time: 'Hace 50 min',
    category: 'Bitcoin',
    image: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    details: 'Datos on-chain revelan un movimiento masivo de Bitcoin desde exchanges hacia billeteras frías. Las direcciones que poseen entre 1,000 y 10,000 BTC han aumentado su balance significativamente, sugiriendo una fase de acumulación a largo plazo.'
  },
  { 
    id: 6, 
    title: 'Desarrolladores de Cardano presentan nueva hoja de ruta', 
    source: 'CardanoFeed', 
    time: 'Hace 1 hr',
    category: 'DeFi',
    image: 'https://images.unsplash.com/photo-1639762681057-408e52192e55?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    details: 'La fundación detrás de Cardano reveló su actualización más ambiciosa. Promete mejorar drásticamente la escalabilidad y los tiempos de procesamiento de los contratos inteligentes en la mainnet para 2026.'
  },
  { 
    id: 9, 
    title: 'SEC pospone decisión sobre los ETFs de Ethereum al contado', 
    source: 'Reuters', 
    time: 'Hace 1.2 hrs',
    category: 'Regulación',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f4fc651?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    details: 'La Comisión de Bolsa y Valores de EE. UU. ha retrasado nuevamente su veredicto sobre las solicitudes de ETFs de Ethereum presentadas por BlackRock y Fidelity. El mercado esperaba una decisión para mayo.'
  },
  { 
    id: 7, 
    title: 'El token de Uniswap sube un 15% tras anuncio sorpresivo', 
    source: 'CoinTelegraph', 
    time: 'Hace 1.5 hrs',
    category: 'DeFi',
    image: 'https://images.unsplash.com/photo-1622737133809-d95047b9e673?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    details: 'Sorpresivamente, el equipo de Uniswap Labs propuso activar la votación de comisiones (fee switch) que recompensaría directamente a los poseedores del token UNI con un porcentaje de las comisiones.'
  },
  { 
    id: 10, 
    title: 'MicroStrategy anuncia nueva compra de 9,000 Bitcoins', 
    source: 'Michael Saylor Twitter', 
    time: 'Hace 2 hrs',
    category: 'Bitcoin',
    image: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    details: 'La empresa liderada por Michael Saylor continúa su estrategia de tesorería en Bitcoin. Con esta última adquisición, la compañía ya posee cerca del 1% del suministro total de la madre de todas las criptomonedas.'
  },
  { 
    id: 11, 
    title: 'El Salvador inaugura primer puerto Bitcoin impulsado por energía volcánica', 
    source: 'El Salvador News', 
    time: 'Hace 3 hrs',
    category: 'Mercado',
    image: 'https://images.unsplash.com/photo-1622630998477-20aa696ecb05?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    details: 'El presidente Nayib Bukele anunció la finalización de la fase 1 de Bitcoin City. La infraestructura portuaria operará completamente con energía geotérmica renovable extraída de la cordillera volcánica central.'
  },
];

const News = () => {
  const [expandedId, setExpandedId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Todo');

  const toggleExpand = (id) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  const handleExternalRedirect = () => {
    window.open('https://es.investing.com/news/cryptocurrency-news', '_blank');
  };

  const filteredNews = recentNews.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.source.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'Todo' || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="news-page fade-in">
      <header className="dashboard-header" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <h1>Crypto News</h1>
            <p className="text-secondary" style={{ fontSize: '1.1rem' }}>Tu puente de información en la blockchain.</p>
          </div>
          
          {/* Search Bar */}
          <div style={{ 
            position: 'relative', 
            background: 'rgba(255,255,255,0.05)', 
            borderRadius: '16px', 
            padding: '2px 15px',
            border: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            minWidth: '300px',
            width: '100%',
            maxWidth: '400px',
            boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.2)'
          }}>
            <Search size={18} color="var(--text-secondary)" />
            <input 
              type="text" 
              placeholder="Buscar noticias, fuentes o temas..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ 
                background: 'transparent', border: 'none', color: '#fff', 
                padding: '12px 10px', width: '100%', outline: 'none', fontSize: '0.95rem' 
              }} 
            />
          </div>
        </div>
      </header>

      {/* Category Tabs */}
      <div className="responsive-tabs" style={{ 
        display: 'flex', gap: '10px', marginBottom: '2.5rem', 
        overflowX: 'auto', paddingBottom: '10px', scrollbarWidth: 'none' 
      }}>
        {categories.map(cat => (
          <button 
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: '8px 20px',
              borderRadius: '20px',
              border: activeCategory === cat ? 'none' : '1px solid var(--border-color)',
              background: activeCategory === cat ? 'var(--accent-primary)' : 'rgba(255,255,255,0.03)',
              color: activeCategory === cat ? 'var(--bg-primary)' : 'var(--text-secondary)',
              fontWeight: 'bold',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.3s ease',
              boxShadow: activeCategory === cat ? '0 0 15px rgba(0,255,136,0.3)' : 'none'
            }}>
            {cat}
          </button>
        ))}
      </div>

      {/* FEATURED MAIN ARTICLE */}
      <div className="hover-lift" style={{ 
        position: 'relative', 
        borderRadius: '24px', 
        overflow: 'hidden', 
        marginBottom: '3rem',
        minHeight: '420px',
        display: 'flex',
        alignItems: 'flex-end',
        cursor: 'pointer',
        border: '1px solid var(--border-color)',
        boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
        animation: 'fadeIn 0.8s ease'
      }}
      onClick={handleExternalRedirect}
      >
        <img src={featuredNews.image} alt="Featured" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }} />
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to top, rgba(11, 14, 20, 1) 15%, rgba(11, 14, 20, 0.4) 60%, rgba(11, 14, 20, 0) 100%)', zIndex: 1 }}></div>
        
        <div style={{ position: 'relative', zIndex: 2, padding: '3.5rem 3rem', width: '100%', maxWidth: '850px' }}>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '1.5rem' }}>
            <span style={{ 
              background: 'var(--accent-primary)', color: 'var(--bg-primary)', padding: '6px 14px', 
              borderRadius: '20px', fontWeight: 'bold', fontSize: '0.75rem', display: 'inline-flex', 
              alignItems: 'center', gap: '6px', boxShadow: '0 0 15px var(--accent-primary)'
            }}>
              <Zap size={14} /> NOTICIA DESTACADA
            </span>
            <span style={{ 
              background: 'rgba(255,255,255,0.1)', color: '#fff', padding: '6px 14px', 
              borderRadius: '20px', fontWeight: 'bold', fontSize: '0.75rem', backdropFilter: 'blur(10px)'
            }}>
              {featuredNews.category}
            </span>
          </div>
          <h2 style={{ fontSize: '3rem', marginBottom: '1.2rem', lineHeight: '1.1', fontWeight: '800', textShadow: '0 4px 15px rgba(0,0,0,0.8)' }}>{featuredNews.title}</h2>
          <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.2rem', marginBottom: '2rem', lineHeight: '1.6', opacity: 0.9 }}>{featuredNews.summary}</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '1.5rem', color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem' }}>
              <span style={{ fontWeight: '700', color: 'var(--accent-primary)' }}>{featuredNews.source}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Clock size={16} /> {featuredNews.time}</span>
            </div>
            <button className="hover-lift" style={{ 
              background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', padding: '12px 24px', 
              borderRadius: '12px', color: '#fff', fontWeight: 'bold', display: 'flex', alignItems: 'center', 
              gap: '10px', backdropFilter: 'blur(10px)', cursor: 'pointer'
            }}>
              Leer Artículo <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* MÁS POPULAR - HORIZONTAL GRID */}
      <div style={{ marginBottom: '4rem' }}>
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '2rem', color: 'var(--text-primary)', fontSize: '1.4rem' }}>
          <TrendingUp color="var(--accent-primary)" size={26} />
          MÁS POPULAR
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          {popularNews.map(item => (
            <div key={item.id} className="glass-panel hover-lift" 
              onClick={handleExternalRedirect}
              style={{ 
              cursor: 'pointer', overflow: 'hidden', padding: 0, display: 'flex', flexDirection: 'column', 
              border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' 
            }}>
              <div style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
                <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <span style={{ 
                  position: 'absolute', top: '15px', right: '15px', background: 'rgba(0,0,0,0.6)', 
                  backdropFilter: 'blur(5px)', color: '#fff', fontSize: '0.75rem', padding: '4px 10px', 
                  borderRadius: '10px', fontWeight: 'bold' 
                }}>
                  {item.category}
                </span>
              </div>
              <div style={{ padding: '1.8rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <h4 style={{ margin: '0 0 1.2rem 0', fontSize: '1.15rem', lineHeight: '1.5', flex: 1, fontWeight: '700' }}>{item.title}</h4>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  <span style={{ fontWeight: '700', color: 'var(--accent-primary)' }}>{item.source}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Clock size={16} /> {item.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MÁS RECIENTE - ACCORDION LIST */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-primary)', fontSize: '1.4rem' }}>
            <Clock color="var(--accent-secondary)" size={26} />
            MÁS PARA TI
          </h3>
          {searchQuery || activeCategory !== 'Todo' ? (
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              Mostrando {filteredNews.length} resultados
            </span>
          ) : null}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {filteredNews.length > 0 ? filteredNews.map(item => {
            const isExpanded = expandedId === item.id;
            
            return (
              <div key={item.id} className="hover-lift" style={{ 
                display: 'flex', 
                flexDirection: 'column',
                padding: '1.5rem 2rem', 
                background: isExpanded ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.02)', 
                borderRadius: '20px', 
                border: '1px solid rgba(255,255,255,0.08)',
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: isExpanded ? '0 10px 30px rgba(0,0,0,0.3)' : 'none'
               }}
               onClick={() => toggleExpand(item.id)}
              >
                {/* HEAD */}
                <div style={{ display: 'flex', alignItems: 'center', width: '100%', gap: '1rem' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--accent-secondary)', boxShadow: '0 0 10px var(--accent-secondary)', flexShrink: 0 }}></div>
                  <h4 style={{ margin: '0', fontSize: '1.1rem', flex: 1, fontWeight: '600', color: isExpanded ? 'var(--accent-primary)' : 'var(--text-primary)', transition: 'color 0.3s' }}>{item.title}</h4>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    <span className="hide-on-mobile" style={{ background: 'rgba(255,255,255,0.05)', padding: '4px 12px', borderRadius: '8px', fontWeight: 'bold', fontSize: '0.8rem' }}>{item.category}</span>
                    <span className="hide-on-mobile" style={{ minWidth: '80px', textAlign: 'right' }}>{item.time}</span>
                    <ChevronDown size={22} style={{ 
                      transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)', 
                      transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      color: isExpanded ? 'var(--accent-primary)' : 'var(--text-secondary)'
                    }} />
                  </div>
                </div>

                {/* ACCORDION REVEAL BODY */}
                <div style={{ 
                  maxHeight: isExpanded ? '600px' : '0px', 
                  opacity: isExpanded ? 1 : 0, 
                  overflow: 'hidden', 
                  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                  marginTop: isExpanded ? '1.5rem' : '0' 
                }}>
                  <div style={{ 
                    display: 'flex', 
                    gap: '2rem', 
                    paddingTop: '1.5rem', 
                    borderTop: '1px solid rgba(255,255,255,0.08)',
                    alignItems: 'flex-start',
                    flexWrap: 'wrap'
                  }}>
                    <img src={item.image} alt="Thumbnail" style={{ 
                      width: '220px', 
                      height: '140px', 
                      objectFit: 'cover', 
                      borderRadius: '16px',
                      boxShadow: '0 8px 25px rgba(0,0,0,0.4)',
                      border: '1px solid rgba(255,255,255,0.1)'
                    }} />
                    <div style={{ flex: 1, minWidth: '280px' }}>
                      <div style={{ display: 'flex', gap: '10px', marginBottom: '1rem' }}>
                        <span style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>{item.source}</span>
                        <span style={{ color: 'var(--text-secondary)' }}>•</span>
                        <span style={{ color: 'var(--text-secondary)' }}>Publicado {item.time}</span>
                      </div>
                      <p style={{ 
                        color: 'var(--text-secondary)', 
                        fontSize: '1rem', 
                        lineHeight: '1.7', 
                        margin: '0 0 1.5rem 0' 
                      }}>
                        {item.details}
                      </p>
                      <button 
                        className="hover-lift" 
                        onClick={(e) => { e.stopPropagation(); handleExternalRedirect(); }}
                        style={{ 
                        background: 'transparent', border: '1px solid var(--accent-primary)', color: 'var(--accent-primary)',
                        padding: '8px 20px', borderRadius: '10px', fontWeight: 'bold', fontSize: '0.9rem', cursor: 'pointer'
                      }}>
                        Leer Nota Completa
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          }) : (
            <div style={{ 
              textAlign: 'center', padding: '4rem 2rem', background: 'rgba(255,255,255,0.01)', 
              borderRadius: '24px', border: '1px dashed var(--border-color)' 
            }}>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>No encontramos noticias que coincidan con tu búsqueda.</p>
              <button 
                onClick={() => { setSearchQuery(''); setActiveCategory('Todo'); }}
                style={{ background: 'none', border: 'none', color: 'var(--accent-primary)', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}
              >
                Limpiar filtros
              </button>
            </div>
          )}
        </div>

        {/* Load More Simulator */}
        {filteredNews.length > 0 && (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem' }}>
            <button 
              className="hover-lift" 
              onClick={handleExternalRedirect}
              style={{ 
              background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', color: '#fff',
              padding: '12px 40px', borderRadius: '15px', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer'
            }}>
              Cargar más noticias
            </button>
          </div>
        )}
      </div>
      
      <style>{`
        .responsive-tabs::-webkit-scrollbar {
          display: none;
        }
        @media (max-width: 768px) {
          .dashboard-header {
            flex-direction: column;
            align-items: flex-start !important;
          }
          .dashboard-header > div:last-child {
            width: 100% !important;
            max-width: none !important;
          }
          .hide-on-mobile {
            display: none !important;
          }
          h2 {
            font-size: 2rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default News;
