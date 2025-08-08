import express from 'express';
import { auth } from '../middleware/auth';
import { createPortfolio, getPortfolios, getPortfolio, updatePortfolio, deletePortfolio } from '../controllers/portfolioController';
import { getPortfolioTransactions, createTransaction, updateTransaction, deleteTransaction } from '../controllers/transactionController';
import { getPortfolioHoldings } from '../controllers/holdingController';

const router = express.Router();

// Portfolio routes
router.post('/', auth, createPortfolio);
router.get('/', auth, getPortfolios);
router.get('/:id', auth, getPortfolio);
router.put('/:id', auth, updatePortfolio);
router.delete('/:id', auth, deletePortfolio);

// Portfolio transactions routes
router.get('/:portfolioId/transactions', auth, getPortfolioTransactions);
router.post('/:portfolioId/transactions', auth, createTransaction);
router.put('/:portfolioId/transactions/:transactionId', auth, updateTransaction);
router.delete('/:portfolioId/transactions/:transactionId', auth, deleteTransaction);

// Portfolio holdings route
router.get('/:portfolioId/holdings', auth, getPortfolioHoldings);

export default router; 