import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, unique: true },
  phone: String,
  type: { type: String, default: 'Standard User' },
  avatar: String,
  balance: { type: Number, default: 0 },
  joinedAt: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', UserSchema);
