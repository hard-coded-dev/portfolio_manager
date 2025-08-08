import express from 'express';
import { body } from 'express-validator';
import { auth } from '../middleware/auth';
import {
  getPortfolioTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction
} from '../controllers/transactionController';

const router = express.Router();

// All transaction routes require authentication
router.use(auth);

// Validation middleware
const transactionValidation = [
  body('portfolioId').notEmpty().withMessage('Portfolio ID is required'),
  body('type').isIn(['BUY', 'SELL']).withMessage('Type must be either BUY or SELL'),
  body('symbol').notEmpty().withMessage('Stock symbol is required'),
  body('quantity').isFloat({ min: 0.01 }).withMessage('Quantity must be greater than 0'),
  body('price').isFloat({ min: 0.01 }).withMessage('Price must be greater than 0'),
  body('notes').optional().isString().withMessage('Notes must be a string')
];

// Routes
router.post('/', transactionValidation, createTransaction);
router.get('/', getPortfolioTransactions);
router.put('/:transactionId', updateTransaction);
router.delete('/:transactionId', deleteTransaction);

export default router; 