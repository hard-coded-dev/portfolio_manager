// src/types/portfolio.ts
export interface Holding {
    symbol: string;
    name: string;
    shares: number;
    avgPrice: number;
    currentPrice: number;
    totalValue: number;
    profitLoss: number;
    profitLossPercentage: number;
  }
  
  export interface Transaction {
    id: string;
    type: 'BUY' | 'SELL';
    symbol: string;
    shares: number;
    price: number;
    date: string;
    total: number;
  }
  
  export interface PortfolioSummary {
    totalValue: number;
    totalCost: number;
    totalProfitLoss: number;
    totalProfitLossPercentage: number;
    holdings: Holding[];
    recentTransactions: Transaction[];
  }
  