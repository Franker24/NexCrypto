import dbConnect from '../lib/mongodb';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ message: 'Faltan campos obligatorios' });
  }

  try {
    await dbConnect();

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const username = '@' + name.toLowerCase().replace(/\s+/g, '_');

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      username,
      balance: 0
    });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '30d' }
    );

    res.status(201).json({
      message: 'Registro exitoso',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        username: user.username,
        type: user.type,
        avatar: user.avatar,
        balance: user.balance,
        joinedAt: user.joinedAt
      },
      token
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
}
