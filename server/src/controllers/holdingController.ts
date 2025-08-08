import { Request, Response } from 'express';
import Transaction from '../models/Transaction';
import { Portfolio } from '../models/Portfolio';
import { IUser } from '../models/User';

interface AuthRequest extends Request {
  user?: IUser;
}

interface Holding {
  symbol: string;
  shares: number;
  averagePrice: number;
  currentPrice: number;
  totalValue: number;
  profitLoss: number;
  profitLossPercentage: number;
}

// Get current holdings for a portfolio
export const getPortfolioHoldings = async (req: AuthRequest, res: Response) => {
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

    // Get all transactions for the portfolio
    const transactions = await Transaction.find({ portfolioId })
      .sort({ date: 1 });

    // Calculate holdings from transactions
    const holdingsMap = new Map<string, Holding>();

    for (const transaction of transactions) {
      const { symbol, type, shares, price } = transaction;
      const currentHolding = holdingsMap.get(symbol) || {
        symbol,
        shares: 0,
        averagePrice: 0,
        currentPrice: price, // This will be updated with real-time data
        totalValue: 0,
        profitLoss: 0,
        profitLossPercentage: 0
      };

      if (type === 'buy') {
        const totalCost = (currentHolding.shares * currentHolding.averagePrice) + (shares * price);
        const totalShares = currentHolding.shares + shares;
        currentHolding.shares = totalShares;
        currentHolding.averagePrice = totalCost / totalShares;
      } else if (type === 'sell') {
        if (currentHolding.shares < shares) {
          return res.status(400).json({ 
            message: `Invalid transaction: Trying to sell more shares than owned for ${symbol}` 
          });
        }
        currentHolding.shares -= shares;
      }

      holdingsMap.set(symbol, currentHolding);
    }

    // Convert holdings map to array and calculate current values
    const holdings = Array.from(holdingsMap.values())
      .filter(holding => holding.shares > 0)
      .map(holding => {
        // TODO: Fetch real-time price data from a stock API
        // For now, using the last transaction price as current price
        const totalValue = holding.shares * holding.currentPrice;
        const profitLoss = totalValue - (holding.shares * holding.averagePrice);
        const profitLossPercentage = (profitLoss / (holding.shares * holding.averagePrice)) * 100;

        return {
          ...holding,
          totalValue,
          profitLoss,
          profitLossPercentage
        };
      });

    res.json(holdings);
  } catch (error) {
    console.error('Error calculating holdings:', error);
    res.status(500).json({ message: 'Error calculating holdings' });
  }
}; 