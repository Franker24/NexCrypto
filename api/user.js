import prisma from './lib/prisma.js';
import jwt from 'jsonwebtoken';
import readJsonBody from './lib/readJsonBody';

export default async function handler(req, res) {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'No autorizado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');


    if (req.method === 'GET') {
      const user = await prisma.user.findUnique({ where: { id: decoded.id } });
      if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
      delete user.password;
      return res.status(200).json(user);
    }

    if (req.method === 'POST') {
      const updatedData = await readJsonBody(req);
      const user = await prisma.user.update({
        where: { id: decoded.id },
        data: updatedData
      });
      delete user.password;
      return res.status(200).json({
        message: 'Perfil actualizado correctamente',
        user
      });
    }

    res.status(405).json({ message: 'Method Not Allowed' });
  } catch (error) {
    res.status(401).json({ message: 'Token inválido o expirado' });
  }
}
