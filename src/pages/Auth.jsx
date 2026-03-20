import React, { useState } from 'react';
import { Hexagon, Mail, Lock, User as UserIcon, ArrowRight } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { useTranslation } from 'react-i18next';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { login, register, loading, error: authError } = useUser();
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');
    
    let result;
    if (isLogin) {
      result = await login(email, password);
    } else {
      result = await register(email, password, name);
    }

    if (!result.success) {
      setLocalError(result.message);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'radial-gradient(circle at 50% 0%, rgba(0, 204, 255, 0.1) 0%, var(--bg-primary) 60%)',
      padding: '2rem'
    }}>
        <div style={{ position: 'relative', width: '100%', maxWidth: '440px', animation: 'scaleUp 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}>
            {/* Borde brillante animado trasero */}
            <div className="glow-border"></div>

            <div className="auth-box" style={{ position: 'relative', padding: '3.5rem 2.5rem', borderRadius: '24px', zIndex: 1 }}>
                
                {/* Cabecera / Logo Premium */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '2.5rem' }}>
                    <div style={{ 
                        width: '72px', height: '72px', borderRadius: '20px', 
                        background: 'linear-gradient(135deg, rgba(0, 255, 136, 0.2), rgba(0, 204, 255, 0.2))',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        marginBottom: '1.2rem',
                        boxShadow: 'inset 0 0 20px rgba(255,255,255,0.05), 0 10px 25px rgba(0, 204, 255, 0.2)',
                        border: '1px solid rgba(255,255,255,0.1)'
                    }}>
                        <Hexagon size={36} color="#fff" style={{ filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.8))' }} />
                    </div>
                    <h2 style={{ margin: 0, fontSize: '2.2rem', fontWeight: '800', letterSpacing: '-0.5px', background: 'linear-gradient(to right, #fff 30%, var(--text-secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        {isLogin ? t('auth.login') : t('auth.register')}
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', marginTop: '0.6rem', textAlign: 'center', fontSize: '0.95rem', lineHeight: '1.5' }}>
                        {isLogin ? 'Inicia sesión para acceder a tu portafolio.' : 'Únete a la plataforma más avanzada.'}
                    </p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                    {!isLogin && (
                        <div className="input-group">
                            <input 
                              type="text" 
                              placeholder={t('auth.name')} 
                              required 
                              className="auth-input" 
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                            />
                            <UserIcon className="input-icon" size={20} />
                        </div>
                    )}

                    <div className="input-group">
                        <input 
                          type="email" 
                          placeholder={t('auth.email')} 
                          required 
                          className="auth-input" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <Mail className="input-icon" size={20} />
                    </div>

                    <div className="input-group" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '5px' }}>
                        <div style={{ position: 'relative', width: '100%', display: 'flex', alignItems: 'center' }}>
                            <input 
                              type="password" 
                              placeholder={t('auth.password')} 
                              required 
                              minLength="8" 
                              className="auth-input" 
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                            />
                            <Lock className="input-icon" size={20} />
                        </div>
                        <div style={{ 
                            maxHeight: password.length > 0 ? '20px' : '0',
                            overflow: 'hidden',
                            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                            opacity: password.length > 0 ? 1 : 0,
                            width: '100%'
                        }}>
                            <span style={{ 
                                color: password.length >= 8 ? 'var(--accent-primary)' : 'var(--text-secondary)', 
                                fontSize: '0.75rem', 
                                marginLeft: '0.5rem', 
                                opacity: 0.7,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '5px',
                                transition: 'color 0.3s ease'
                            }}>
                                {password.length >= 8 ? '✓' : '*'} Mínimo 8 caracteres
                            </span>
                        </div>
                    </div>

                    {(localError || authError) && (
                      <div style={{ color: 'var(--danger)', fontSize: '0.85rem', textAlign: 'center', background: 'rgba(255, 77, 77, 0.1)', padding: '0.8rem', borderRadius: '10px', border: '1px solid rgba(255, 77, 77, 0.2)' }}>
                        {localError || authError}
                      </div>
                    )}

                    {isLogin && (
                      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-0.5rem' }}>
                        <span className="forgot-pass">¿Olvidaste tu contraseña?</span>
                      </div>
                    )}

                    <button type="submit" disabled={loading} className="submit-btn" style={{ opacity: loading ? 0.7 : 1 }}>
                     {loading ? t('auth.loading') : isLogin ? t('auth.loginBtn') : t('auth.registerBtn')}
                        {!loading && <ArrowRight size={20} strokeWidth={3} />}
                    </button>
                </form>

                <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '1.5rem' }}>
                        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.1))' }}></div>
                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>O continuar con</span>
                        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, rgba(255,255,255,0.1))' }}></div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <button type="button" className="sso-btn">
                            <div className="sso-icon-wrapper">
                                <svg width="20" height="20" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.7 17.74 9.5 24 9.5z"/>
                                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                                    <path fill="none" d="M0 0h48v48H0z"/>
                                </svg>
                            </div>
                            <span>Google</span>
                        </button>
                        <button type="button" className="sso-btn">
                            <div className="sso-icon-wrapper">
                                <Github size={20} color="#fff" />
                            </div>
                            <span>GitHub</span>
                        </button>
                    </div>
                </div>

                <div style={{ marginTop: '2.5rem', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                     {isLogin ? '¿Aún no operaste en la plataforma?' : '¿Ya posees una billetera vinculada?'} 
                      <span onClick={() => setIsLogin(!isLogin)} className="toggle-auth">
                        {isLogin ? t('auth.switchToRegister') : t('auth.switchToLogin')}
                     </span>
                </div>
            </div>
        </div>

        <style>{`
          .auth-box {
            background: rgba(14, 18, 25, 0.85);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.08);
            box-shadow: 0 30px 60px rgba(0, 0, 0, 0.8);
          }
          
          .glow-border {
            position: absolute;
            top: -2px; left: -2px; right: -2px; bottom: -2px;
            background: linear-gradient(135deg, var(--accent-primary) 0%, transparent 40%, transparent 60%, var(--accent-secondary) 100%);
            border-radius: 26px;
            z-index: 0;
            opacity: 0.6;
            filter: blur(8px);
          }

          .input-group {
            position: relative;
            display: flex;
            align-items: center;
          }

          .auth-input {
            width: 100%;
            padding: 1.2rem 1rem 1.2rem 3.5rem;
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 14px;
            color: #fff;
            font-size: 1rem;
            outline: none;
            transition: all 0.3s ease;
          }

          .input-icon {
            position: absolute;
            left: 1.2rem;
            color: var(--text-secondary);
            transition: all 0.3s ease;
            pointer-events: none;
          }

          /* Al hacer foco en el input, cambiamos el color del icono (que está después del input visualmente) */
          .auth-input:focus {
            border-color: var(--accent-primary);
            background: rgba(0, 255, 136, 0.02);
            box-shadow: 0 0 0 4px rgba(0, 255, 136, 0.1);
          }
          
          .auth-input:focus + .input-icon {
            color: var(--accent-primary);
            transform: scale(1.1);
          }

          .submit-btn {
            width: 100%;
            padding: 1.2rem;
            margin-top: 0.8rem;
            background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
            color: var(--bg-primary);
            border: none;
            border-radius: 14px;
            font-size: 1.05rem;
            font-weight: 800;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
            box-shadow: 0 10px 25px rgba(0, 204, 255, 0.3);
            transition: all 0.3s ease;
          }

          .submit-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 15px 35px rgba(0, 204, 255, 0.4);
          }

          .sso-btn {
            padding: 0.9rem;
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            color: #fff;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
            font-weight: 600;
            transition: all 0.3s ease;
            font-size: 0.95rem;
          }

          .sso-icon-wrapper {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 20px;
            height: 20px;
          }

          .sso-btn:hover {
            background: rgba(255, 255, 255, 0.08);
            transform: translateY(-2px);
            border-color: rgba(255, 255, 255, 0.2);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.4);
          }

          .forgot-pass {
            color: var(--text-secondary);
            font-size: 0.85rem;
            cursor: pointer;
            font-weight: 600;
            transition: color 0.3s ease;
          }
          .forgot-pass:hover {
            color: var(--accent-primary);
          }

          .toggle-auth {
            color: var(--accent-secondary);
            font-weight: 800;
            cursor: pointer;
            margin-left: 6px;
            transition: color 0.3s ease;
            display: inline-block;
          }
          .toggle-auth:hover {
            color: var(--accent-primary);
            text-decoration: underline;
          }

          @keyframes scaleUp {
            from { opacity: 0; transform: scale(0.95) translateY(20px); }
            to { opacity: 1; transform: scale(1) translateY(0); }
          }
          
          @media (max-width: 480px) {
            .auth-box {
              padding: 2rem 1.5rem !important;
            }
            .auth-input {
              padding-top: 1rem !important;
              padding-bottom: 1rem !important;
            }
          }
        `}</style>
    </div>
  );
};

export default Auth;
