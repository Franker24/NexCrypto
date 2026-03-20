import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true }, // 'Compra', 'Venta', 'Depósito', 'Retiro', 'Swap'
  asset: { type: String, required: true },
  amount: { type: String, required: true },
  price: String,
  total: String,
  status: { type: String, default: 'Completado' },
  wallet: String,
  fee: String,
  date: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.models.Transaction || mongoose.model('Transaction', TransactionSchema);
