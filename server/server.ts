import express, { Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import belvoRoutes from './routes/belvo.js';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3001;

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

// Verificar variáveis de ambiente
if (!process.env.BELVO_SECRET_ID || !process.env.BELVO_SECRET_PASSWORD) {
  console.warn('⚠️ AVISO: BELVO_SECRET_ID ou BELVO_SECRET_PASSWORD não configurados');
}

// Rotas
app.use('/api/belvo', belvoRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor Belvo rodando em http://localhost:${PORT}`);
  console.log(`📌 Health check: http://localhost:${PORT}/health`);
});
