import dbConnect from '../lib/mongodb';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { email, password } = req.body;

  try {
    await dbConnect();

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '30d' }
    );

    res.status(200).json({
      message: 'Login exitoso',
      user: {
        id: user._id,
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
