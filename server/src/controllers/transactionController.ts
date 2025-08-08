import { Request, Response } from 'express';
import Transaction from '../models/Transaction';
import { Portfolio } from '../models/Portfolio';
import { IUser } from '../models/User';

interface AuthRequest extends Request {
  user?: IUser;
}

// Get all transactions for a portfolio
export const getPortfolioTransactions = async (req: AuthRequest, res: Response) => {
  try {
    const { portfolioId } = req.params;
    
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    // Verify portfolio exists and belongs to user
    const portfolio = await Portfolio.findOne({
      _id: portfolioId,
      user: req.user._id
    });

    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }

    const transactions = await Transaction.find({ portfolioId })
      .sort({ date: -1 });

    res.json(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ message: 'Error fetching transactions' });
  }
};

// Create a new transaction
export const createTransaction = async (req: AuthRequest, res: Response) => {
  try {
    const { portfolioId } = req.params;
    const { type, symbol, shares, price, date } = req.body;

    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    // Verify portfolio exists and belongs to user
    const portfolio = await Portfolio.findOne({
      _id: portfolioId,
      user: req.user._id
    });

    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }

    const transaction = new Transaction({
      portfolioId,
      type,
      symbol: symbol.toUpperCase(),
      shares,
      price,
      date: date || new Date()
    });

    await transaction.save();

    res.status(201).json(transaction);
  } catch (error) {
    console.error('Error creating transaction:', error);
    res.status(500).json({ message: 'Error creating transaction' });
  }
};

// Update a transaction
export const updateTransaction = async (req: AuthRequest, res: Response) => {
  try {
    const { portfolioId, transactionId } = req.params;
    const { type, symbol, shares, price, date } = req.body;

    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    // Verify portfolio exists and belongs to user
    const portfolio = await Portfolio.findOne({
      _id: portfolioId,
      user: req.user._id
    });

    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }

    const transaction = await Transaction.findOneAndUpdate(
      { _id: transactionId, portfolioId },
      {
        type,
        symbol: symbol.toUpperCase(),
        shares,
        price,
        date
      },
      { new: true }
    );

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    res.json(transaction);
  } catch (error) {
    console.error('Error updating transaction:', error);
    res.status(500).json({ message: 'Error updating transaction' });
  }
};

// Delete a transaction
export const deleteTransaction = async (req: AuthRequest, res: Response) => {
  try {
    const { portfolioId, transactionId } = req.params;

    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    // Verify portfolio exists and belongs to user
    const portfolio = await Portfolio.findOne({
      _id: portfolioId,
      user: req.user._id
    });

    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }

    const transaction = await Transaction.findOneAndDelete({
      _id: transactionId,
      portfolioId
    });

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    res.json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    console.error('Error deleting transaction:', error);
    res.status(500).json({ message: 'Error deleting transaction' });
  }
}; 