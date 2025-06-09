import { Request, Response } from 'express';
import { Portfolio, IPortfolio } from '../models/Portfolio';

// Create a new portfolio
export const createPortfolio = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description } = req.body;
    const userId = req.user?._id;

    const portfolio = new Portfolio({
      user: userId,
      name,
      description,
      stocks: []
    });

    await portfolio.save();

    res.status(201).json(portfolio);
  } catch (error: any) {
    if (error.code === 11000) {
      res.status(400).json({ message: 'Portfolio with this name already exists' });
    } else {
      res.status(500).json({ message: 'Error creating portfolio' });
    }
  }
};

// Get all portfolios for a user
export const getPortfolios = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?._id;
    const portfolios = await Portfolio.find({ user: userId });
    res.json(portfolios);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching portfolios' });
  }
};

// Get a single portfolio
export const getPortfolio = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user?._id;

    const portfolio = await Portfolio.findOne({ _id: id, user: userId });
    if (!portfolio) {
      res.status(404).json({ message: 'Portfolio not found' });
      return;
    }

    res.json(portfolio);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching portfolio' });
  }
};

// Update a portfolio
export const updatePortfolio = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const userId = req.user?._id;

    const portfolio = await Portfolio.findOneAndUpdate(
      { _id: id, user: userId },
      { name, description },
      { new: true, runValidators: true }
    );

    if (!portfolio) {
      res.status(404).json({ message: 'Portfolio not found' });
      return;
    }

    res.json(portfolio);
  } catch (error: any) {
    if (error.code === 11000) {
      res.status(400).json({ message: 'Portfolio with this name already exists' });
    } else {
      res.status(500).json({ message: 'Error updating portfolio' });
    }
  }
};

// Delete a portfolio
export const deletePortfolio = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user?._id;

    const portfolio = await Portfolio.findOneAndDelete({ _id: id, user: userId });
    if (!portfolio) {
      res.status(404).json({ message: 'Portfolio not found' });
      return;
    }

    res.json({ message: 'Portfolio deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting portfolio' });
  }
}; 