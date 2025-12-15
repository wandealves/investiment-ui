# Guia de Migração - Integração Backend-Frontend

## Visão Geral

Este documento descreve todas as mudanças realizadas para integrar o backend .NET com o frontend React TypeScript do sistema de gestão de investimentos.

**Data da Integração**: 2025-12-15
**Versão**: 1.0.0

---

## 📋 Sumário de Mudanças

### Backend (.NET)
1. ✅ Formato de resposta padronizado (sem wrappers)
2. ✅ Endpoint de busca de ativos corrigido
3. ✅ Endpoint `/auth/me` implementado
4. ✅ Novo endpoint `/carteiras/{id}/ativos`

### Frontend (React + TypeScript)
1. ✅ Tipos de entidades atualizados
2. ✅ DTOs alinhados com o backend
3. ✅ Paths de endpoints atualizados para `/api/v1/*`
4. ✅ Sistema de notificações toast implementado (Sonner)
5. ✅ Endpoints e hooks de dashboard criados

---

## 🔄 Mudanças de Nomenclatura

### Campos Renomeados

| Frontend (ANTES) | Backend (AGORA) | Entidade |
|------------------|-----------------|----------|
| `ticker` | `codigo` | Ativo |
| `dataCriacao` | `criadaEm` | Carteira |
| `data` | `dataTransacao` | Transacao |
| `valor` | `valorTotal` | Transacao |

### Tipos de ID

| Entidade | Tipo Anterior | Tipo Atual |
|----------|---------------|------------|
| `Carteira.id` | string | number |
| `Ativo.id` | string | number |
| `CarteiraAtivo.ativoId` | string | number |
| `Transacao.carteiraId` | string | number |
| `Transacao.ativoId` | string | number |

**Nota**: IDs do tipo `Guid` (como `Usuario.id` e `Transacao.id`) permanecem como `string`.

---

## 🌐 Formato de Resposta da API

### ANTES

```json
{
  "success": true,
  "data": {
    "id": 1,
    "nome": "Minha Carteira"
  }
}
```

### AGORA

```json
{
  "id": 1,
  "nome": "Minha Carteira"
}
```

### Formato de Erro

```json
{
  "errors": ["Mensagem de erro"],
  "validationErrors": {
    "campo": ["Erro de validação"]
  }
}
```

---

## 🔗 Endpoints Atualizados

### Mudanças de Path

Todos os endpoints agora usam o prefixo `/api/v1`:

| Endpoint Anterior | Endpoint Atual |
|-------------------|----------------|
| `/auth/login` | `/api/v1/auth/login` |
| `/carteiras` | `/api/v1/carteiras` |
| `/ativos` | `/api/v1/ativos` |
| `/transacoes` | `/api/v1/transacoes` |
| `/relatorios/*` | `/api/v1/relatorios/*` |

### Endpoints Corrigidos

**Busca de Ativos**:
- **Antes**: `GET /ativos/termo/{termo}`
- **Agora**: `GET /api/v1/ativos/search?q={query}`

**Exemplo**:
```typescript
// ANTES
ativosEndpoints.search('PETR4') // GET /ativos/termo/PETR4

// AGORA
ativosEndpoints.search('PETR4') // GET /api/v1/ativos/search?q=PETR4
```

### Novos Endpoints

#### 1. Autenticação - Dados do Usuário
```http
GET /api/v1/auth/me
Authorization: Bearer {token}
```

**Resposta**:
```json
{
  "id": "uuid",
  "nome": "João Silva",
  "email": "joao@example.com"
}
```

#### 2. Ativos da Carteira (Posições)
```http
GET /api/v1/carteiras/{id}/ativos
Authorization: Bearer {token}
```

**Resposta**:
```json
[
  {
    "ativoId": 1,
    "ativoNome": "Petrobras PN",
    "ativoCodigo": "PETR4",
    "ativoTipo": "Ação",
    "quantidadeAtual": 100,
    "precoMedio": 28.50,
    "valorInvestido": 2850.00,
    "valorAtual": 3200.00,
    "rentabilidade": 12.28,
    "dividendosRecebidos": 150.00
  }
]
```

#### 3. Dashboard - Métricas
```http
GET /api/v1/dashboard/metrics
Authorization: Bearer {token}
```

**Resposta**:
```json
{
  "patrimonioTotal": 50000.00,
  "rentabilidadeTotal": 15.5,
  "quantidadeCarteiras": 3,
  "quantidadeAtivos": 12,
  "melhorAtivo": {
    "codigo": "BBAS3",
    "rentabilidade": 25.3
  },
  "piorAtivo": {
    "codigo": "PETR4",
    "rentabilidade": -5.2
  }
}
```

#### 4. Dashboard - Alocação
```http
GET /api/v1/dashboard/alocacao
Authorization: Bearer {token}
```

**Resposta**:
```json
[
  {
    "tipo": "Ação",
    "valor": 30000.00,
    "percentual": 60.0
  },
  {
    "tipo": "FII",
    "valor": 15000.00,
    "percentual": 30.0
  },
  {
    "tipo": "Renda Fixa",
    "valor": 5000.00,
    "percentual": 10.0
  }
]
```

#### 5. Dashboard - Evolução Patrimonial
```http
GET /api/v1/dashboard/evolucao
Authorization: Bearer {token}
```

**Resposta**:
```json
[
  {
    "data": "2025-01",
    "valor": 45000.00
  },
  {
    "data": "2025-02",
    "valor": 47500.00
  },
  {
    "data": "2025-03",
    "valor": 50000.00
  }
]
```

---

## 📦 Alterações nos Tipos TypeScript

### Ativo

```typescript
// ANTES
export interface Ativo {
  id: string
  ticker: string
  nome: string
  tipo: TipoAtivo
  setor?: string
  descricao?: string
  dataCriacao: string
  dataAtualizacao?: string
}

// AGORA
export interface Ativo {
  id: number
  codigo: string
  nome: string
  tipo: string
  descricao?: string
}
```

### Carteira

```typescript
// ANTES
export interface Carteira {
  id: string
  usuarioId: string
  nome: string
  descricao?: string
  valorTotal: number
  rentabilidade: number
  dataCriacao: string
  dataAtualizacao?: string
  ativos?: CarteiraAtivo[]
}

// AGORA
export interface Carteira {
  id: number
  usuarioId: string
  nome: string
  descricao?: string
  valorTotal: number
  rentabilidade: number
  criadaEm: string
  totalAtivos?: number
  totalTransacoes?: number
  ativos?: CarteiraAtivo[]
}
```

### CarteiraAtivo (Posição)

```typescript
// ANTES
export interface CarteiraAtivo {
  id: string
  carteiraId: string
  ativoId: string
  ativo: Ativo
  quantidade: number
  precoMedio: number
  valorInvestido: number
  valorAtual: number
  rentabilidade: number
  percentualCarteira: number
  dataCriacao: string
  dataAtualizacao?: string
}

// AGORA
export interface CarteiraAtivo {
  ativoId: number
  ativoNome: string
  ativoCodigo: string
  ativoTipo: string
  quantidadeAtual: number
  precoMedio: number
  valorInvestido: number
  precoAtual?: number
  valorAtual?: number
  lucro?: number
  rentabilidade?: number
  dividendosRecebidos: number
  dataPrimeiraCompra?: string
  dataUltimaTransacao?: string
}
```

### Transacao

```typescript
// ANTES
export interface Transacao {
  id: string
  carteiraId: string
  ativoId: string
  ativo?: Ativo
  tipo: TipoTransacao
  quantidade: number
  preco: number
  valor: number
  taxas?: number
  data: string
  observacoes?: string
  dataCriacao: string
}

// AGORA
export interface Transacao {
  id: string
  carteiraId: number
  ativoId: number
  ativoNome?: string
  ativoCodigo?: string
  quantidade: number
  preco: number
  valorTotal: number
  tipoTransacao: string
  dataTransacao: string
}
```

### TipoTransacao

```typescript
// ANTES
export type TipoTransacao = 'COMPRA' | 'VENDA' | 'DIVIDENDO' | 'JCP' | 'SPLIT'

// AGORA
export type TipoTransacao = 'Compra' | 'Venda' | 'Dividendo' | 'JCP' | 'Bonus' | 'Split' | 'Grupamento'
```

---

## 🎨 Sistema de Notificações Toast

### Implementação com Sonner

**Instalação**:
```bash
npm install sonner
```

**Uso**:
```typescript
import { toast } from '@/hooks/useToast'

// Sucesso
toast.success('Carteira criada com sucesso!')

// Erro
toast.error('Erro ao criar carteira')

// Informação
toast.info('Processando...')
```

**Configuração no App**:
```typescript
import { Toaster } from 'sonner'

function App() {
  return (
    <>
      <Toaster position="top-right" richColors />
      {/* Resto da aplicação */}
    </>
  )
}
```

---

## 🔧 Configuração do Proxy (Vite)

O proxy do Vite deve estar configurado para redirecionar requisições `/api` para o backend:

```typescript
// vite.config.ts
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
})
```

---

## ⚠️ Breaking Changes

### 1. IDs como Numbers

Código que anteriormente tratava IDs como strings precisa ser atualizado:

```typescript
// ANTES
const carteira = carteiras.find(c => c.id === '123')

// AGORA
const carteira = carteiras.find(c => c.id === 123)
```

### 2. Referências a `ticker`

Todas as referências a `ticker` devem ser substituídas por `codigo`:

```typescript
// ANTES
<span>{ativo.ticker}</span>

// AGORA
<span>{ativo.codigo}</span>
```

### 3. Campos de Data

```typescript
// ANTES
<span>{carteira.dataCriacao}</span>

// AGORA
<span>{carteira.criadaEm}</span>
```

### 4. Campos de Transação

```typescript
// ANTES
const total = transacao.valor
const dataTransacao = transacao.data

// AGORA
const total = transacao.valorTotal
const dataTransacao = transacao.dataTransacao
```

---

## 🧪 Testando a Integração

### 1. Testar Autenticação

```bash
# Login
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","senha":"password123"}'

# Me (com token)
curl http://localhost:5000/api/v1/auth/me \
  -H "Authorization: Bearer {TOKEN}"
```

### 2. Testar Endpoints de Carteira

```bash
# Listar carteiras
curl http://localhost:5000/api/v1/carteiras \
  -H "Authorization: Bearer {TOKEN}"

# Obter ativos da carteira
curl http://localhost:5000/api/v1/carteiras/1/ativos \
  -H "Authorization: Bearer {TOKEN}"
```

### 3. Testar Dashboard

```bash
# Métricas
curl http://localhost:5000/api/v1/dashboard/metrics \
  -H "Authorization: Bearer {TOKEN}"

# Alocação
curl http://localhost:5000/api/v1/dashboard/alocacao \
  -H "Authorization: Bearer {TOKEN}"

# Evolução
curl http://localhost:5000/api/v1/dashboard/evolucao \
  -H "Authorization: Bearer {TOKEN}"
```

---

## 📝 Checklist de Migração

### Backend
- [x] Respostas sem wrapper `{ success, data }`
- [x] Endpoint `/ativos/search` implementado
- [x] Endpoint `/auth/me` funcional
- [x] Endpoint `/carteiras/{id}/ativos` criado
- [x] Endpoints de dashboard implementados (`/metrics`, `/alocacao`, `/evolucao`)
- [ ] `CarteiraResponse` enriquecida com cálculos (pendente)

### Frontend
- [x] Tipos atualizados em `entities.types.ts`
- [x] DTOs atualizados em `dto.types.ts`
- [x] Paths dos endpoints com `/api/v1`
- [x] Sonner implementado para toasts
- [x] Endpoints e hooks de dashboard criados
- [x] Referências `ticker` → `codigo` nos componentes

### Testes
- [ ] Fluxo de autenticação
- [ ] CRUD de carteiras
- [ ] CRUD de ativos
- [ ] CRUD de transações
- [ ] Dashboard completo

---

## 🚀 Próximos Passos

### Implementações Pendentes

1. **Backend - Endpoints de Dashboard**:
   - Criar `DashboardService` com lógica de agregação
   - Implementar cálculos de métricas, alocação e evolução
   - Registrar endpoints no `Program.cs`

2. **Backend - Enriquecer CarteiraResponse**:
   - Adicionar cálculo de `valorTotal`
   - Adicionar cálculo de `rentabilidade`

3. **Frontend - Substituir Referências**:
   - Buscar e substituir `ticker` → `codigo` em componentes
   - Atualizar labels de interface

4. **Testes de Integração**:
   - Testar fluxo completo end-to-end
   - Validar cálculos de posição e rentabilidade
   - Verificar autenticação e autorização

---

## 📞 Suporte

Para questões ou problemas relacionados à integração, consulte:
- **Backend**: `/Investment/Investment.Api/Endpoints/`
- **Frontend**: `/src/api/endpoints/`
- **Tipos**: `/src/types/`

---

**Última Atualização**: 2025-12-15
**Autor**: Claude Code (Integração Backend-Frontend)
