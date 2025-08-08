import React from 'react';

interface Portfolio {
  _id: string;
  name: string;
  description?: string;
}

interface PortfolioSelectorProps {
  portfolios: Portfolio[];
  selectedPortfolioId: string | null;
  onSelect: (portfolioId: string) => void;
}

const PortfolioSelector: React.FC<PortfolioSelectorProps> = ({
  portfolios,
  selectedPortfolioId,
  onSelect,
}) => {
  return (
    <div className="relative">
      <label htmlFor="portfolio-select" className="block text-sm font-medium text-gray-700 mb-2">
        Select Portfolio
      </label>
      <div className="relative">
        <select
          id="portfolio-select"
          value={selectedPortfolioId || ''}
          onChange={(e) => onSelect(e.target.value)}
          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md bg-white"
        >
          <option value="">Select a portfolio</option>
          {portfolios.map((portfolio) => (
            <option key={portfolio._id} value={portfolio._id}>
              {portfolio.name}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
      {portfolios.length === 0 && (
        <p className="mt-2 text-sm text-gray-500">
          No portfolios available. Create your first portfolio to get started.
        </p>
      )}
    </div>
  );
};

export default PortfolioSelector; 