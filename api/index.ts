import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import belvoRoutes from '../server/routes/belvo';

dotenv.config();

const app: Express = express();

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:8080',
    'http://localhost:3000',
    'https://expensemanager-97c8b.web.app',
    'https://expensemanager-97c8b.firebaseapp.com',
    ...(process.env.FRONTEND_URL ? [process.env.FRONTEND_URL] : [])
  ],
  credentials: true,
}));
app.use(express.json());

// Health check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Rotas Belvo
app.use('/api/belvo', belvoRoutes as any);

// Root
app.get('/api', (req: Request, res: Response) => {
  res.json({
    message: 'Finance Palace Backend API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      belvo: '/api/belvo'
    }
  });
});

// Fallback
app.all('*', (req: Request, res: Response) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.path,
    method: req.method
  });
});

export default app;
