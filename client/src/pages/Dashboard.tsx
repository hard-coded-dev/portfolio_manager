// src/pages/Dashboard.tsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Box,
  Paper, 
  Typography, 
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { dummyPortfolio } from '../data/dummyData';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend
} from 'recharts';
import CreatePortfolioModal from '../components/CreatePortfolioModal';
import PortfolioSelector from '../components/PortfolioSelector';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28CFE', '#FF6699'];

const assetData = dummyPortfolio.holdings.map((h) => ({
  name: h.symbol,
  value: h.totalValue,
}));

interface Stock {
  symbol: string;
  quantity: number;
  averagePrice: number;
  lastUpdated: string;
}

interface Portfolio {
  _id: string;
  name: string;
  description?: string;
  stocks: Stock[];
  createdAt: string;
  updatedAt: string;
}

interface Transaction {
  _id: string;
  portfolioId: string;
  type: 'buy' | 'sell';
  symbol: string;
  shares: number;
  price: number;
  date: string;
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

const Dashboard: React.FC = () => {
  const { user, token } = useAuth();
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [selectedPortfolioId, setSelectedPortfolioId] = useState<string | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [error, setError] = useState('');

  const fetchPortfolios = async () => {
    if (!token) {
      setPortfolios([]);
      return;
    }
    try {
      const response = await fetch('http://localhost:5000/api/portfolios', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error('Failed to fetch portfolios');
      const data = await response.json();
      setPortfolios(data);
    } catch (err) {
      setError('Failed to load portfolios');
      console.error('Error fetching portfolios:', err);
    }
  };

  const fetchPortfolioData = async (portfolioId: string) => {
    if (!token) {
      setTransactions([]);
      setHoldings([]);
      return;
    }
    try {
      // Fetch transactions
      const transactionsResponse = await fetch(`http://localhost:5000/api/portfolios/${portfolioId}/transactions`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!transactionsResponse.ok) throw new Error('Failed to fetch transactions');
      const transactionsData = await transactionsResponse.json();
      setTransactions(transactionsData);

      // Fetch holdings
      const holdingsResponse = await fetch(`http://localhost:5000/api/portfolios/${portfolioId}/holdings`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!holdingsResponse.ok) throw new Error('Failed to fetch holdings');
      const holdingsData = await holdingsResponse.json();
      setHoldings(holdingsData);
    } catch (err) {
      setError('Failed to load portfolio data');
      console.error('Error fetching portfolio data:', err);
    }
  };

  useEffect(() => {
    fetchPortfolios();
  }, [token]);

  useEffect(() => {
    if (selectedPortfolioId) {
      fetchPortfolioData(selectedPortfolioId);
    } else {
      setTransactions([]);
      setHoldings([]);
    }
  }, [selectedPortfolioId]);

  const handlePortfolioSelect = (portfolioId: string) => {
    setSelectedPortfolioId(portfolioId);
  };

  // Calculate portfolio summary
  const portfolioSummary = holdings.reduce(
    (acc, holding) => ({
      totalValue: acc.totalValue + holding.totalValue,
      totalProfitLoss: acc.totalProfitLoss + holding.profitLoss,
      totalCost: acc.totalCost + (holding.shares * holding.averagePrice)
    }),
    { totalValue: 0, totalProfitLoss: 0, totalCost: 0 }
  );

  const totalProfitLossPercentage = portfolioSummary.totalCost > 0
    ? (portfolioSummary.totalProfitLoss / portfolioSummary.totalCost) * 100
    : 0;

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Portfolio Overview</h1>
          {user && (
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-200"
            >
              Create Portfolio
            </button>
          )}
        </div>
        {user ? (
          <PortfolioSelector
            portfolios={portfolios}
            selectedPortfolioId={selectedPortfolioId}
            onSelect={handlePortfolioSelect}
          />
        ) : (
          <div className="text-gray-600">
            <p className="mb-2">Welcome! Sign in to manage your portfolios and view holdings and transactions.</p>
            <p>Use the Login/Sign Up buttons in the top-right to get started.</p>
          </div>
        )}
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          {error}
        </div>
      )}

      {user && selectedPortfolioId ? (
        <>
          {/* Portfolio Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Total Value</h3>
              <p className="text-2xl font-bold text-gray-900">
                ${portfolioSummary.totalValue.toFixed(2)}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Total Profit/Loss</h3>
              <p className={`text-2xl font-bold ${portfolioSummary.totalProfitLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ${portfolioSummary.totalProfitLoss.toFixed(2)}
              </p>
              <p className={`text-sm ${portfolioSummary.totalProfitLoss >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {totalProfitLossPercentage.toFixed(2)}%
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Total Cost</h3>
              <p className="text-2xl font-bold text-gray-900">
                ${portfolioSummary.totalCost.toFixed(2)}
              </p>
            </div>
          </div>

          {/* Holdings and Transactions Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Holdings Card */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Holdings</h2>
              </div>
              <div className="p-6">
                {holdings.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Symbol</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shares</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Price</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">P/L</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {holdings.map((holding) => (
                          <tr key={holding.symbol} className="hover:bg-gray-50">
                            <td className="px-4 py-3 text-sm font-medium text-gray-900">{holding.symbol}</td>
                            <td className="px-4 py-3 text-sm text-gray-500">{holding.shares}</td>
                            <td className="px-4 py-3 text-sm text-gray-500">${holding.averagePrice.toFixed(2)}</td>
                            <td className="px-4 py-3 text-sm text-gray-500">${holding.currentPrice.toFixed(2)}</td>
                            <td className="px-4 py-3 text-sm text-gray-500">${holding.totalValue.toFixed(2)}</td>
                            <td className={`px-4 py-3 text-sm ${holding.profitLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              ${holding.profitLoss.toFixed(2)} ({holding.profitLossPercentage.toFixed(2)}%)
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">No holdings found</p>
                )}
              </div>
            </div>

            {/* Transactions Card */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Recent Transactions</h2>
              </div>
              <div className="p-6">
                {transactions.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Symbol</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shares</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {transactions.map((transaction) => (
                          <tr key={transaction._id} className="hover:bg-gray-50">
                            <td className="px-4 py-3 text-sm text-gray-500">
                              {new Date(transaction.date).toLocaleDateString()}
                            </td>
                            <td className={`px-4 py-3 text-sm font-medium ${
                              transaction.type === 'buy' ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {transaction.type.toUpperCase()}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-900">{transaction.symbol}</td>
                            <td className="px-4 py-3 text-sm text-gray-500">{transaction.shares}</td>
                            <td className="px-4 py-3 text-sm text-gray-500">${transaction.price.toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">No transactions found</p>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          {user ? (
            <p className="text-gray-500">Select a portfolio to view its holdings and transactions</p>
          ) : (
            <p className="text-gray-500">Create or log into your account to manage portfolios.</p>
          )}
        </div>
      )}

      {user && (
        <CreatePortfolioModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSuccess={() => {
            setIsCreateModalOpen(false);
            fetchPortfolios();
          }}
        />
      )}
    </div>
  );
};

export default Dashboard;
