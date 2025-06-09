// src/pages/Transactions.tsx
import React, { useState } from 'react';
import {
  Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip,
  TextField, Button, MenuItem
} from '@mui/material';
import { dummyPortfolio } from '../data/dummyData';
import type { Transaction } from '../types/portfolio';
import Grid from '@mui/material/Grid';

const initialForm: Omit<Transaction, 'id' | 'total'> = {
  type: 'BUY',
  symbol: '',
  shares: 0,
  price: 0,
  date: '',
};

const Transactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(dummyPortfolio.recentTransactions);
  const [form, setForm] = useState(initialForm);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'shares' || name === 'price' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.symbol || !form.date || form.shares <= 0 || form.price <= 0) return;
    const newTx: Transaction = {
      ...form,
      id: Date.now().toString(),
      total: form.shares * form.price,
    };
    setTransactions((prev) => [newTx, ...prev]);
    setForm(initialForm);
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>Transactions</Typography>

      {/* Transaction Form */}
      <Paper sx={{ p: 2, mb: 4 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} alignItems="center">
            <Grid>
              <TextField
                select
                label="Type"
                name="type"
                value={form.type}
                onChange={handleChange}
                fullWidth
              >
                <MenuItem value="BUY">Buy</MenuItem>
                <MenuItem value="SELL">Sell</MenuItem>
              </TextField>
            </Grid>
            <Grid>
              <TextField
                label="Symbol"
                name="symbol"
                value={form.symbol}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid>
              <TextField
                label="Shares"
                name="shares"
                type="number"
                value={form.shares}
                onChange={handleChange}
                fullWidth
                required
                inputProps={{ min: 1 }}
              />
            </Grid>
            <Grid>
              <TextField
                label="Price"
                name="price"
                type="number"
                value={form.price}
                onChange={handleChange}
                fullWidth
                required
                inputProps={{ min: 0.01, step: 0.01 }}
              />
            </Grid>
            <Grid>
              <TextField
                label="Date"
                name="date"
                type="date"
                value={form.date}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Add
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      {/* Transactions Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Symbol</TableCell>
              <TableCell>Shares</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((tx) => (
              <TableRow key={tx.id}>
                <TableCell>{tx.date}</TableCell>
                <TableCell>
                  <Chip
                    label={tx.type}
                    color={tx.type === 'BUY' ? 'success' : 'error'}
                    size="small"
                  />
                </TableCell>
                <TableCell>{tx.symbol}</TableCell>
                <TableCell>{tx.shares}</TableCell>
                <TableCell>${tx.price}</TableCell>
                <TableCell>${tx.total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Transactions;