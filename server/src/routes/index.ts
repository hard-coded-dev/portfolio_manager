import express from 'express';
import authRoutes from './auth';
import portfolioRoutes from './portfolioRoutes';
import transactionRoutes from './transaction';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/portfolios', portfolioRoutes);
router.use('/portfolios', transactionRoutes); // Mount transaction routes under portfolios

export default router; 