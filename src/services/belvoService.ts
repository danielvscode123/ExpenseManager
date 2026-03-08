import axios from 'axios';

const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:3001/api';

const belvoClient = axios.create({
  baseURL: `${BACKEND_API_URL}/belvo`,
});

console.log('✓ Belvo Client inicializado (via backend proxy)');

export interface Institution {
  id: string;
  name: string;
  code: string;
  country_codes: string[];
}

export interface BelvoLink {
  id: string;
  institution: string;
  status: string;
  created_at: string;
}

export interface BelvoAccount {
  id: string;
  name: string;
  number: string;
  type: string;
  balance: {
    current: number;
    available: number;
  };
  link: string;
}

export interface BelvoTransaction {
  id: string;
  description: string;
  amount: number;
  date: string;
  type: string;
  status: string;
}

// Listar instituições bancárias
export async function getInstitutions(countryCode: string = 'BR') {
  try {
    const response = await belvoClient.get('/institutions');
    return response.data.results || [];
  } catch (error: any) {
    console.error('Erro ao listar instituições:', error.response?.data || error);
    throw new Error('Erro ao carregar instituições');
  }
}

// Criar link (conectar banco)
export async function createLink(
  institutionId: string,
  username: string,
  password: string
) {
  try {
    const response = await belvoClient.post('/links', {
      institution: institutionId,
      username: username,
      password: password,
    });
    return response.data;
  } catch (error: any) {
    console.error('Erro ao criar link:', error.response?.data || error);
    const message = error.response?.data?.error ||
                   'Erro ao conectar banco. Verifique credenciais.';
    throw new Error(message);
  }
}

// Obter contas
export async function getAccounts(linkId?: string) {
  try {
    const response = await belvoClient.get('/accounts', {
      params: linkId ? { link: linkId } : undefined,
    });
    return response.data.results || [];
  } catch (error: any) {
    console.error('Erro ao obter contas:', error.response?.data || error);
    throw new Error('Erro ao carregar contas');
  }
}

// Obter transações
export async function getTransactions(
  accountId: string,
  dateFrom?: string,
  dateTo?: string
) {
  try {
    const response = await belvoClient.get('/transactions', {
      params: {
        account: accountId,
        date_from: dateFrom,
        date_to: dateTo,
      },
    });
    return response.data.results || [];
  } catch (error: any) {
    console.error('Erro ao obter transações:', error.response?.data || error);
    throw new Error('Erro ao carregar transações');
  }
}

// Listar links
export async function getLinks() {
  try {
    const response = await belvoClient.get('/links');
    return response.data.results || [];
  } catch (error: any) {
    console.error('Erro ao listar links:', error.response?.data || error);
    throw new Error('Erro ao carregar links');
  }
}

// Deletar link
export async function deleteLink(linkId: string) {
  try {
    await belvoClient.delete(`/links/${linkId}`);
  } catch (error: any) {
    console.error('Erro ao deletar link:', error.response?.data || error);
    throw new Error('Erro ao desconectar banco');
  }
}
