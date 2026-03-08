import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBelvo } from '@/hooks/useBelvo';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle, Loader2, Landmark, TrendingDown } from 'lucide-react';
import { AppSidebar } from '@/components/AppSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

type Step = 'banks' | 'login' | 'accounts';

export default function BankConnection() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    institutions,
    accounts,
    transactions,
    isLoading,
    error,
    links,
    fetchInstitutions,
    connectBank,
    fetchLinks,
    fetchTransactions,
    disconnectBank,
  } = useBelvo();

  const [selectedBank, setSelectedBank] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [step, setStep] = useState<Step>('banks');
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchInstitutions();
    fetchLinks();
  }, []);

  const isConnected = accounts.length > 0;

  const handleConnect = async () => {
    if (!selectedBank || !username || !password) {
      alert('Preencha todos os campos');
      return;
    }

    try {
      const link = await connectBank(selectedBank, username, password);
      setSuccessMessage('✓ Banco conectado com sucesso!');
      setUsername('');
      setPassword('');
      setStep('accounts');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      console.error('Erro:', err);
    }
  };

  const handleSelectAccount = async (accountId: string) => {
    setSelectedAccountId(accountId);
    await fetchTransactions(accountId);
  };

  const handleDisconnect = async (linkId: string) => {
    if (
      confirm(
        'Tem certeza que deseja desconectar este banco? Isso não apagará suas transações importadas.'
      )
    ) {
      try {
        await disconnectBank(linkId);
        setSuccessMessage('✓ Banco desconectado com sucesso');
        setStep('banks');
        setTimeout(() => setSuccessMessage(''), 3000);
      } catch (err) {
        console.error('Erro ao desconectar:', err);
      }
    }
  };

  const handleImportTransactions = async () => {
    if (!selectedAccountId || transactions.length === 0) return;

    try {
      // TODO: Implementar importação para o Firestore
      alert(`${transactions.length} transações prontas para importar!`);
      navigate('/transactions');
    } catch (err) {
      console.error('Erro ao importar:', err);
    }
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <AppSidebar />
        <div className="flex-1 overflow-auto">
          <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
            <div className="max-w-4xl mx-auto">
              {/* Header */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <Landmark className="w-8 h-8 text-blue-500" />
                    <div>
                      <h1 className="text-3xl font-bold text-white">
                        Conectar Banco
                      </h1>
                      <p className="text-slate-400">
                        Sincronize sua conta bancária e importe transações
                        automaticamente
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Success Message */}
              {successMessage && (
                <div className="mb-6 p-4 bg-green-900/20 border border-green-500 text-green-400 rounded-lg">
                  {successMessage}
                </div>
              )}

              {/* Estado: Não conectado - Selecionar Banco */}
              {!isConnected && step === 'banks' && (
                <Card className="bg-slate-800 border-slate-700">
                  <CardHeader>
                    <CardTitle>Selecione seu Banco</CardTitle>
                    <CardDescription>
                      Escolha a instituição financeira para conectar
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {error && (
                      <div className="bg-red-900/20 border border-red-500 text-red-400 p-4 rounded-lg flex gap-3">
                        <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold">Erro</p>
                          <p className="text-sm">{error}</p>
                        </div>
                      </div>
                    )}

                    {institutions.length === 0 && !isLoading && (
                      <div className="text-center py-8">
                        <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-slate-400" />
                        <p className="text-slate-400">
                          Carregando bancos...
                        </p>
                      </div>
                    )}

                    {institutions.length > 0 && (
                      <div className="space-y-2">
                        <Label htmlFor="bank-select" className="text-base">
                          Banco
                        </Label>
                        <Select
                          value={selectedBank}
                          onValueChange={setSelectedBank}
                        >
                          <SelectTrigger
                            id="bank-select"
                            className="bg-slate-700 border-slate-600 text-white"
                          >
                            <SelectValue placeholder="Escolha seu banco..." />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-700 border-slate-600">
                            {institutions.map((inst) => (
                              <SelectItem key={inst.id} value={inst.id}>
                                {inst.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    <Button
                      onClick={() => setStep('login')}
                      disabled={!selectedBank || isLoading}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      size="lg"
                    >
                      Continuar
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* Estado: Login */}
              {step === 'login' && !isConnected && (
                <Card className="bg-slate-800 border-slate-700">
                  <CardHeader>
                    <CardTitle>Credenciais Bancárias</CardTitle>
                    <CardDescription>
                      Insira suas credenciais de acesso ao banco. Suas
                      informações são criptografadas e nunca são armazenadas.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {error && (
                      <div className="bg-red-900/20 border border-red-500 text-red-400 p-4 rounded-lg flex gap-3">
                        <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold">Erro na conexão</p>
                          <p className="text-sm">{error}</p>
                        </div>
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="username" className="text-sm">
                        CPF/CNPJ ou Usuário
                      </Label>
                      <Input
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="000.000.000-00"
                        className="bg-slate-700 border-slate-600 text-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-sm">
                        Senha
                      </Label>
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Sua senha do banco"
                        className="bg-slate-700 border-slate-600 text-white"
                      />
                    </div>

                    <div className="bg-amber-900/20 border border-amber-600 text-amber-300 p-3 rounded-lg text-sm">
                      ⚠️ Suas credenciais são criptografadas com padrão de
                      segurança bancário (256-bit SSL)
                    </div>

                    <div className="flex gap-2">
                      <Button
                        onClick={handleConnect}
                        disabled={
                          isLoading || !username || !password
                        }
                        className="flex-1 bg-green-600 hover:bg-green-700"
                        size="lg"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Conectando...
                          </>
                        ) : (
                          'Conectar'
                        )}
                      </Button>
                      <Button
                        onClick={() => setStep('banks')}
                        variant="outline"
                        disabled={isLoading}
                        className="flex-1"
                        size="lg"
                      >
                        Voltar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Estado: Conectado - Contas */}
              {(isConnected || step === 'accounts') && (
                <div className="space-y-4">
                  {/* Contas */}
                  <Card className="bg-slate-800 border-slate-700">
                    <CardHeader>
                      <CardTitle>Suas Contas Bancárias</CardTitle>
                      <CardDescription>
                        Clique em uma conta para visualizar transações
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {accounts.length === 0 ? (
                        <div className="text-center py-8 text-slate-400">
                          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2" />
                          <p>Carregando contas...</p>
                        </div>
                      ) : (
                        <div className="grid gap-4 mb-6">
                          {accounts.map((account) => (
                            <div
                              key={account.id}
                              onClick={() =>
                                handleSelectAccount(account.id)
                              }
                              className={`p-4 rounded-lg cursor-pointer transition ${
                                selectedAccountId === account.id
                                  ? 'bg-blue-700 border border-blue-500'
                                  : 'bg-slate-700 hover:bg-slate-600 border border-slate-600'
                              }`}
                            >
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-semibold text-white">
                                    {account.name}
                                  </h4>
                                  <p className="text-xs text-slate-400 mt-1">
                                    {account.type} • {account.number}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <p className="text-2xl font-bold text-green-400">
                                    {new Intl.NumberFormat('pt-BR', {
                                      style: 'currency',
                                      currency: 'BRL',
                                    }).format(
                                      account.balance.current
                                    )}
                                  </p>
                                  <p className="text-xs text-slate-400 mt-1">
                                    Disponível:{' '}
                                    {new Intl.NumberFormat('pt-BR', {
                                      style: 'currency',
                                      currency: 'BRL',
                                    }).format(
                                      account.balance.available
                                    )}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Transações */}
                  {selectedAccountId && transactions.length > 0 && (
                    <Card className="bg-slate-800 border-slate-700">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <TrendingDown className="w-5 h-5" />
                          Transações Recentes
                        </CardTitle>
                        <CardDescription>
                          {transactions.length} transações encontradas
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 max-h-96 overflow-y-auto">
                          {transactions.map((tx) => (
                            <div
                              key={tx.id}
                              className="flex justify-between items-center p-3 bg-slate-700 rounded hover:bg-slate-600 transition"
                            >
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-white truncate">
                                  {tx.description}
                                </p>
                                <p className="text-xs text-slate-400">
                                  {new Date(
                                    tx.date
                                  ).toLocaleDateString('pt-BR')}
                                </p>
                              </div>
                              <p
                                className={`font-bold ml-4 whitespace-nowrap ${
                                  tx.type === 'OUTFLOW'
                                    ? 'text-red-400'
                                    : 'text-green-400'
                                }`}
                              >
                                {tx.type === 'OUTFLOW' ? '-' : '+'}
                                {new Intl.NumberFormat(
                                  'pt-BR',
                                  {
                                    style: 'currency',
                                    currency: 'BRL',
                                  }
                                ).format(Math.abs(tx.amount))}
                              </p>
                            </div>
                          ))}
                        </div>

                        <Button
                          onClick={handleImportTransactions}
                          className="w-full mt-4 bg-purple-600 hover:bg-purple-700"
                          size="lg"
                        >
                          Importar {transactions.length} Transações
                        </Button>
                      </CardContent>
                    </Card>
                  )}

                  {/* Ações */}
                  <div className="space-y-2">
                    <Button
                      onClick={() => navigate('/')}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      size="lg"
                    >
                      Voltar ao Dashboard
                    </Button>

                    {links.length > 0 && (
                      <Button
                        variant="destructive"
                        onClick={() => handleDisconnect(links[0].id)}
                        disabled={isLoading}
                        className="w-full"
                        size="lg"
                      >
                        Desconectar Banco
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
