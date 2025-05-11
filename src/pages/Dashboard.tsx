// src/pages/Dashboard.tsx
import React from 'react';
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

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28CFE', '#FF6699'];

const assetData = dummyPortfolio.holdings.map((h) => ({
  name: h.symbol,
  value: h.totalValue,
}));

const Dashboard = () => {
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      {/* Summary Cards */}
      <Box sx={{ display: 'flex', gap: 3, mb: 4, flexWrap: 'wrap' }}>
        <Paper sx={{ p: 2, flex: 1, minWidth: '200px' }}>
          <Typography variant="h6">Total Value</Typography>
          <Typography variant="h4">${dummyPortfolio.totalValue.toLocaleString()}</Typography>
        </Paper>
        <Paper sx={{ p: 2, flex: 1, minWidth: '200px' }}>
          <Typography variant="h6">Total Profit/Loss</Typography>
          <Typography variant="h4" color={dummyPortfolio.totalProfitLoss >= 0 ? 'success.main' : 'error.main'}>
            ${dummyPortfolio.totalProfitLoss.toLocaleString()}
          </Typography>
        </Paper>
        <Paper sx={{ p: 2, flex: 1, minWidth: '200px' }}>
          <Typography variant="h6">Return</Typography>
          <Typography variant="h4" color={dummyPortfolio.totalProfitLossPercentage >= 0 ? 'success.main' : 'error.main'}>
            {dummyPortfolio.totalProfitLossPercentage.toFixed(2)}%
          </Typography>
        </Paper>
      </Box>

      {/* Asset Allocation Pie Chart */}
      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>Asset Allocation</Typography>
      <Box sx={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={assetData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {assetData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </Box>

      {/* Holdings Table */}
      <Typography variant="h5" sx={{ mb: 2 }}>Current Holdings</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Symbol</TableCell>
              <TableCell>Shares</TableCell>
              <TableCell>Avg Price</TableCell>
              <TableCell>Current Price</TableCell>
              <TableCell>Total Value</TableCell>
              <TableCell>Profit/Loss</TableCell>
              <TableCell>Return</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dummyPortfolio.holdings.map((holding) => (
              <TableRow key={holding.symbol}>
                <TableCell>{holding.symbol}</TableCell>
                <TableCell>{holding.shares}</TableCell>
                <TableCell>${holding.avgPrice}</TableCell>
                <TableCell>${holding.currentPrice}</TableCell>
                <TableCell>${holding.totalValue}</TableCell>
                <TableCell color={holding.profitLoss >= 0 ? 'success.main' : 'error.main'}>
                  ${holding.profitLoss}
                </TableCell>
                <TableCell color={holding.profitLossPercentage >= 0 ? 'success.main' : 'error.main'}>
                  {holding.profitLossPercentage.toFixed(2)}%
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Dashboard;
