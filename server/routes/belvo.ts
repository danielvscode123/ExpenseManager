import express, { Router, Request, Response } from 'express';
import axios from 'axios';

const router = Router();

const BELVO_API_URL = 'https://api.belvo.io/api';
const BELVO_SECRET_ID = process.env.BELVO_SECRET_ID || '';
const BELVO_SECRET_PASSWORD = process.env.BELVO_SECRET_PASSWORD || '';

const belvoClient = axios.create({
  baseURL: BELVO_API_URL,
  auth: {
    username: BELVO_SECRET_ID,
    password: BELVO_SECRET_PASSWORD,
  },
});

// Listar instituições
router.get('/institutions', async (req: Request, res: Response) => {
  try {
    const response = await belvoClient.get('/institutions/', {
      params: {
        country_code: 'BR',
        page_size: 50,
      },
    });
    res.json(response.data);
  } catch (error: any) {
    console.error('Erro ao listar instituições:', error.message);
    res.status(error.response?.status || 500).json({
      error: 'Erro ao carregar instituições',
      details: error.response?.data || error.message,
    });
  }
});

// Criar link
router.post('/links', async (req: Request, res: Response) => {
  try {
    const { institution, username, password } = req.body;
    const response = await belvoClient.post('/links/', {
      institution,
      username,
      password,
    });
    res.json(response.data);
  } catch (error: any) {
    console.error('Erro ao criar link:', error.message);
    res.status(error.response?.status || 500).json({
      error: 'Erro ao conectar banco',
      details: error.response?.data || error.message,
    });
  }
});

// Listar links
router.get('/links', async (req: Request, res: Response) => {
  try {
    const response = await belvoClient.get('/links/');
    res.json(response.data);
  } catch (error: any) {
    console.error('Erro ao listar links:', error.message);
    res.status(error.response?.status || 500).json({
      error: 'Erro ao carregar links',
      details: error.response?.data || error.message,
    });
  }
});

// Obter contas
router.get('/accounts', async (req: Request, res: Response) => {
  try {
    const { link } = req.query;
    const response = await belvoClient.get('/accounts/', {
      params: link ? { link } : undefined,
    });
    res.json(response.data);
  } catch (error: any) {
    console.error('Erro ao obter contas:', error.message);
    res.status(error.response?.status || 500).json({
      error: 'Erro ao carregar contas',
      details: error.response?.data || error.message,
    });
  }
});

// Obter transações
router.get('/transactions', async (req: Request, res: Response) => {
  try {
    const { account, date_from, date_to } = req.query;
    const response = await belvoClient.get('/transactions/', {
      params: {
        account,
        date_from,
        date_to,
      },
    });
    res.json(response.data);
  } catch (error: any) {
    console.error('Erro ao obter transações:', error.message);
    res.status(error.response?.status || 500).json({
      error: 'Erro ao carregar transações',
      details: error.response?.data || error.message,
    });
  }
});

// Deletar link
router.delete('/links/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await belvoClient.delete(`/links/${id}/`);
    res.json({ success: true });
  } catch (error: any) {
    console.error('Erro ao deletar link:', error.message);
    res.status(error.response?.status || 500).json({
      error: 'Erro ao desconectar banco',
      details: error.response?.data || error.message,
    });
  }
});

export default router;
