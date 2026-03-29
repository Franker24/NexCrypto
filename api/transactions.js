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
      const transactions = await prisma.transaction.findMany({
        where: { userId: decoded.id },
        orderBy: { date: 'desc' }
      });
      return res.status(200).json(transactions);
    }

    if (req.method === 'POST') {
      const { type, asset, amount, price, total, wallet, fee } = await readJsonBody(req);
      const newTransaction = await prisma.transaction.create({
        data: {
          userId: decoded.id,
          type,
          asset,
          amount,
          price,
          total,
          wallet,
          fee
        }
      });
      return res.status(201).json({
        message: 'Transacción realizada con éxito',
        transaction: newTransaction
      });
    }

    res.status(405).json({ message: 'Method Not Allowed' });
  } catch (error) {
    res.status(401).json({ message: 'Token inválido o expirado' });
  }
}
