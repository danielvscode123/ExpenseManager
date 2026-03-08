import { useState, useCallback } from 'react';
import * as belvoService from '@/services/belvoService';
import type {
  Institution,
  BelvoLink,
  BelvoAccount,
  BelvoTransaction,
} from '@/services/belvoService';

export function useBelvo() {
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [links, setLinks] = useState<BelvoLink[]>([]);
  const [accounts, setAccounts] = useState<BelvoAccount[]>([]);
  const [transactions, setTransactions] = useState<BelvoTransaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(null);

  // Buscar instituições
  const fetchInstitutions = useCallback(async (search?: string) => {
    setIsLoading(true);
    setError(null);
    try {
      let data = await belvoService.getInstitutions('BR');
      if (search) {
        data = data.filter((inst: Institution) =>
          inst.name.toLowerCase().includes(search.toLowerCase())
        );
      }
      setInstitutions(data);
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar instituições');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Conectar banco
  const connectBank = useCallback(
    async (institutionId: string, username: string, password: string) => {
      setIsLoading(true);
      setError(null);
      try {
        const link = await belvoService.createLink(
          institutionId,
          username,
          password
        );
        await fetchLinks();
        return link;
      } catch (err: any) {
        setError(err.message || 'Erro ao conectar banco');
        console.error(err);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  // Buscar links
  const fetchLinks = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await belvoService.getLinks();
      setLinks(data);
      // Se há links, buscar contas do primeiro
      if (data.length > 0) {
        await fetchAccounts(data[0].id);
      }
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar links');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Buscar contas
  const fetchAccounts = useCallback(async (linkId?: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await belvoService.getAccounts(linkId);
      setAccounts(data);
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar contas');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Buscar transações
  const fetchTransactions = useCallback(
    async (accountId: string, dateFrom?: string, dateTo?: string) => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await belvoService.getTransactions(
          accountId,
          dateFrom,
          dateTo
        );
        setTransactions(data);
        setSelectedAccountId(accountId);
      } catch (err: any) {
        setError(err.message || 'Erro ao carregar transações');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  // Desconectar banco
  const disconnectBank = useCallback(async (linkId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await belvoService.deleteLink(linkId);
      await fetchLinks();
      setAccounts([]);
      setTransactions([]);
      setSelectedAccountId(null);
    } catch (err: any) {
      setError(err.message || 'Erro ao desconectar');
      console.error(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    institutions,
    links,
    accounts,
    transactions,
    selectedAccountId,
    isLoading,
    error,
    fetchInstitutions,
    connectBank,
    fetchLinks,
    fetchAccounts,
    fetchTransactions,
    disconnectBank,
  };
}
