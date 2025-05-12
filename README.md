# Portfolio Manager

A modern web application for managing and tracking your investment portfolio. Built with React, TypeScript, and Material-UI, this application provides a comprehensive solution for monitoring your investments, tracking performance, and managing transactions.

## Features

- **Portfolio Overview**: View your total portfolio value, cost basis, and profit/loss metrics
- **Holdings Management**: Track individual stock holdings with detailed information including:
  - Current share price
  - Average purchase price
  - Number of shares
  - Total value
  - Profit/Loss calculations
- **Transaction History**: Record and view your buy/sell transactions with:
  - Transaction type (Buy/Sell)
  - Number of shares
  - Price per share
  - Total transaction value
  - Transaction date
- **Performance Analytics**: Visualize your portfolio performance with interactive charts
- **Responsive Design**: Access your portfolio from any device with a modern, responsive interface

## Tech Stack

- **Frontend Framework**: React 19
- **Language**: TypeScript
- **UI Components**: Material-UI (MUI)
- **Charts**: Recharts
- **Build Tool**: Vite
- **Routing**: React Router DOM

## Getting Started

### Prerequisites

- Node.js (version 20 or higher)
- npm (comes with Node.js)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/portfolio_manager.git
   cd portfolio_manager
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

To create a production build:

```bash
npm run build
```

## Project Structure

```
portfolio_manager/
├── src/
│   ├── components/     # React components
│   ├── types/         # TypeScript type definitions
│   ├── pages/         # Page components
│   └── utils/         # Utility functions
├── public/            # Static assets
└── dist/             # Production build output
```

## Data Models

### Holding
```typescript
interface Holding {
  symbol: string;
  name: string;
  shares: number;
  avgPrice: number;
  currentPrice: number;
  totalValue: number;
  profitLoss: number;
  profitLossPercentage: number;
}
```

### Transaction
```typescript
interface Transaction {
  id: string;
  type: 'BUY' | 'SELL';
  symbol: string;
  shares: number;
  price: number;
  date: string;
  total: number;
}
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Material-UI for the component library
- Recharts for the charting capabilities
- Vite for the build tooling
