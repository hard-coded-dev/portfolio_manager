import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from './User';

// Interface for stock holding
interface IStockHolding {
  symbol: string;
  quantity: number;
  averagePrice: number;
  lastUpdated: Date;
}

// Interface for portfolio
export interface IPortfolio extends Document {
  user: IUser['_id'];
  name: string;
  description?: string;
  stocks: IStockHolding[];
  createdAt: Date;
  updatedAt: Date;
}

const stockHoldingSchema = new Schema<IStockHolding>({
  symbol: {
    type: String,
    required: true,
    uppercase: true,
    trim: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 0
  },
  averagePrice: {
    type: Number,
    required: true,
    min: 0
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

const portfolioSchema = new Schema<IPortfolio>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  stocks: [stockHoldingSchema]
}, {
  timestamps: true
});

// Index for faster queries
portfolioSchema.index({ user: 1, name: 1 }, { unique: true });

export const Portfolio = mongoose.model<IPortfolio>('Portfolio', portfolioSchema); 