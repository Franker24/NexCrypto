import dbConnect from './lib/mongodb';
import Transaction from './models/Transaction';
import jwt from 'jsonwebtoken';
import readJsonBody from './lib/readJsonBody';

export default async function handler(req, res) {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'No autorizado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
    await dbConnect();

    if (req.method === 'GET') {
      const transactions = await Transaction.find({ userId: decoded.id }).sort({ date: -1 });
      return res.status(200).json(transactions);
    }

    if (req.method === 'POST') {
      const { type, asset, amount, price, total, wallet, fee } = await readJsonBody(req);
      const newTransaction = await Transaction.create({
        userId: decoded.id,
        type,
        asset,
        amount,
        price,
        total,
        wallet,
        fee
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
