import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './User';
import { IPortfolio } from './Portfolio';

export interface ITransaction extends Document {
  portfolioId: mongoose.Types.ObjectId;
  type: 'buy' | 'sell';
  symbol: string;
  shares: number;
  price: number;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

const transactionSchema = new Schema({
  portfolioId: {
    type: Schema.Types.ObjectId,
    ref: 'Portfolio',
    required: true
  },
  type: {
    type: String,
    enum: ['buy', 'sell'],
    required: true
  },
  symbol: {
    type: String,
    required: true
  },
  shares: {
    type: Number,
    required: true,
    min: 0
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  }
}, {
  timestamps: true
});

// Indexes for faster queries
transactionSchema.index({ portfolioId: 1, date: -1 });
transactionSchema.index({ symbol: 1, date: -1 });

export default mongoose.model<ITransaction>('Transaction', transactionSchema); 