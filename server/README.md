# Portfolio Manager Backend

## Environment Setup

1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Update the `.env` file with your actual values:
- `PORT`: The port your server will run on (default: 5000)
- `MONGODB_URI`: Your MongoDB connection string
- `JWT_SECRET`: A secure random string for JWT token generation
- `NODE_ENV`: Set to 'development' or 'production'

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

## Production Build

```bash
npm run build
npm start
```

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register a new user
- POST `/api/auth/login` - Login existing user

### Portfolios
- POST `/api/portfolios` - Create a new portfolio
- GET `/api/portfolios` - Get all portfolios
- GET `/api/portfolios/:id` - Get a specific portfolio
- PUT `/api/portfolios/:id` - Update a portfolio
- DELETE `/api/portfolios/:id` - Delete a portfolio

## Security Notes

- Never commit the `.env` file to version control
- Keep your JWT_SECRET secure and unique
- Use strong passwords for your MongoDB database
- Regularly update dependencies for security patches 