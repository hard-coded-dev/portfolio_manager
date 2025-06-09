import express from 'express';
import { body } from 'express-validator';
import { auth } from '../middleware/auth';
import {
  createPortfolio,
  getPortfolios,
  getPortfolio,
  updatePortfolio,
  deletePortfolio
} from '../controllers/portfolioController';

const router = express.Router();

// All portfolio routes require authentication
router.use(auth);

// Validation middleware
const portfolioValidation = [
  body('name').notEmpty().withMessage('Portfolio name is required'),
  body('description').optional().isString().withMessage('Description must be a string')
];

// Routes
router.post('/', portfolioValidation, createPortfolio);
router.get('/', getPortfolios);
router.get('/:id', getPortfolio);
router.put('/:id', portfolioValidation, updatePortfolio);
router.delete('/:id', deletePortfolio);

export default router; 