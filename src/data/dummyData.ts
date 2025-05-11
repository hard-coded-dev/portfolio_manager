// src/data/dummyData.ts
import type { PortfolioSummary } from '../types/portfolio';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';

export const dummyPortfolio: PortfolioSummary = {
  totalValue: 150000,
  totalCost: 140000,
  totalProfitLoss: 10000,
  totalProfitLossPercentage: 7.14,
  holdings: [
    {
      symbol: 'AAPL',
      name: 'Apple Inc.',
      shares: 10,
      avgPrice: 150,
      currentPrice: 175,
      totalValue: 1750,
      profitLoss: 250,
      profitLossPercentage: 16.67
    },
    {
      symbol: 'MSFT',
      name: 'Microsoft Corporation',
      shares: 5,
      avgPrice: 280,
      currentPrice: 300,
      totalValue: 1500,
      profitLoss: 100,
      profitLossPercentage: 7.14
    }
  ],
  recentTransactions: [
    {
      id: '1',
      type: 'BUY',
      symbol: 'AAPL',
      shares: 5,
      price: 150,
      date: '2024-03-15',
      total: 750
    },
    {
      id: '2',
      type: 'SELL',
      symbol: 'MSFT',
      shares: 2,
      price: 300,
      date: '2024-03-14',
      total: 600
    }
  ]
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28CFE', '#FF6699'];

const assetData = dummyPortfolio.holdings.map((h) => ({
  name: h.symbol,
  value: h.totalValue,
}));

// Dummy performance data (replace with real data as needed)
const performanceData = [
  { month: 'Jan', value: 120000 },
  { month: 'Feb', value: 125000 },
  { month: 'Mar', value: 130000 },
  { month: 'Apr', value: 140000 },
  { month: 'May', value: 150000 },
];
