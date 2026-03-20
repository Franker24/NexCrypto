import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ============================================================
// DEV-ONLY: Mock API middleware (Vite local development)
// In production (Vercel), the real api/ serverless functions run.
// ============================================================
const ADMIN_EMAIL = 'admin@gmail.com';
const ADMIN_PASS = 'admin123';

const MOCK_USERS = [
  {
    id: 'admin_owner_001',
    name: 'Admin NexCrypto',
    email: ADMIN_EMAIL,
    password: ADMIN_PASS,
    username: '@admin',
    phone: '+54 9 11 0000-0000',
    type: 'Owner',
    avatar: null,
    balance: 9999999.00
  }
];

function parseBody(req) {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try { resolve(JSON.parse(body)); }
      catch { resolve({}); }
    });
  });
}

function jsonResponse(res, statusCode, data) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(data));
}

function getTokenUser(req) {
  const auth = req.headers.authorization || '';
  const token = auth.replace('Bearer ', '').trim();
  // In dev, token is just the user id
  return MOCK_USERS.find(u => u.id === token) || null;
}

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'dev-api',
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          if (!req.url.startsWith('/api/')) return next();

          const url = req.url.split('?')[0];

          // --- POST /api/auth/login ---
          if (url === '/api/auth/login' && req.method === 'POST') {
            const { email, password } = await parseBody(req);
            const user = MOCK_USERS.find(u => u.email === email && u.password === password);
            if (user) {
              const { password: _, ...safeUser } = user;
              return jsonResponse(res, 200, { message: 'Login exitoso', user: safeUser, token: user.id });
            }
            return jsonResponse(res, 401, { message: 'Credenciales inválidas. Verifica tu email y contraseña.' });
          }

          // --- POST /api/auth/register ---
          if (url === '/api/auth/register' && req.method === 'POST') {
            const { email, password, name } = await parseBody(req);
            if (MOCK_USERS.find(u => u.email === email)) {
              return jsonResponse(res, 400, { message: 'El email ya está en uso.' });
            }
            const newUser = {
              id: 'user_' + Math.random().toString(36).substr(2, 9),
              name: name || 'Nuevo Usuario',
              email,
              password,
              username: '@' + (name || 'user').toLowerCase().replace(/\s+/g, '_'),
              phone: '',
              type: 'Standard User',
              avatar: null,
              balance: 0
            };
            MOCK_USERS.push(newUser);
            const { password: _, ...safeUser } = newUser;
            return jsonResponse(res, 201, { message: 'Registro exitoso', user: safeUser, token: newUser.id });
          }

          // --- GET /api/user (profile) ---
          if (url === '/api/user' && req.method === 'GET') {
            const u = getTokenUser(req);
            if (!u) return jsonResponse(res, 401, { message: 'No autorizado' });
            const { password: _, ...safeUser } = u;
            return jsonResponse(res, 200, safeUser);
          }

          // --- POST /api/user (update profile) ---
          if (url === '/api/user' && req.method === 'POST') {
            const u = getTokenUser(req);
            if (!u) return jsonResponse(res, 401, { message: 'No autorizado' });
            const body = await parseBody(req);
            Object.assign(u, body);
            const { password: _, ...safeUser } = u;
            return jsonResponse(res, 200, { message: 'Perfil actualizado', user: safeUser });
          }

          // --- GET /api/transactions ---
          if (url === '/api/transactions' && req.method === 'GET') {
            return jsonResponse(res, 200, [
              { _id: '1', type: 'Compra', asset: 'BTC', amount: '0.45', price: '$42,500', total: '$19,125', date: '2024-10-24', status: 'Completado' },
              { _id: '2', type: 'Venta', asset: 'ETH', amount: '2.10', price: '$2,200', total: '$4,620', date: '2024-10-23', status: 'Completado' },
              { _id: '3', type: 'Depósito', asset: 'USDT', amount: '5,000', price: '$1.00', total: '$5,000', date: '2024-10-20', status: 'Completado' },
            ]);
          }

          // --- POST /api/transactions ---
          if (url === '/api/transactions' && req.method === 'POST') {
            const body = await parseBody(req);
            return jsonResponse(res, 201, {
              message: 'Transacción realizada',
              transaction: { _id: Date.now().toString(), ...body, status: 'Completado', date: new Date().toISOString() }
            });
          }

          next();
        });
      }
    }
  ],
})
