import prisma from '../lib/prisma.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import readJsonBody from '../lib/readJsonBody';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { email, password } = await readJsonBody(req);
    const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
    const adminPassword = process.env.ADMIN_PASSWORD;
    const normalizedEmail = email?.trim().toLowerCase();

    if (!email || !password) {
      return res.status(400).json({ message: 'Email y contraseña son obligatorios' });
    }


    let user = await prisma.user.findUnique({ where: { email: normalizedEmail } });
    if (!user && adminEmail && adminPassword && normalizedEmail === adminEmail && password === adminPassword) {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      user = await prisma.user.create({
        data: {
        name: process.env.ADMIN_NAME?.trim() || 'Admin NexCrypto',
        email: adminEmail,
        password: hashedPassword,
        username: process.env.ADMIN_USERNAME?.trim() || '@admin',
        phone: process.env.ADMIN_PHONE?.trim() || '',
        type: 'Owner',
        balance: 9999999
        }
      });
    }
    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '30d' }
    );

    res.status(200).json({
      message: 'Login exitoso',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        username: user.username,
        phone: user.phone,
        type: user.type,
        avatar: user.avatar,
        balance: user.balance
      },
      token
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}
