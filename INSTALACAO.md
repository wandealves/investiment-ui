# 📦 Guia de Instalação - Investment Manager

## ⚡ Instalação Rápida

```bash
# 1. Instalar dependências
npm install

# 2. Iniciar o servidor de desenvolvimento
npm run dev
```

A aplicação estará rodando em **http://localhost:3000**

---

## 📋 Pré-requisitos

Antes de iniciar, certifique-se de ter:

- ✅ **Node.js 18+** instalado ([Download](https://nodejs.org/))
- ✅ **npm** (vem com Node.js) ou **yarn**
- ✅ **API .NET** rodando em `http://localhost:5000`

Para verificar suas versões:
```bash
node --version  # Deve ser >= 18
npm --version
```

---

## 🚀 Passo a Passo Detalhado

### 1️⃣ Clone o Repositório (se ainda não fez)

```bash
git clone <url-do-repositorio>
cd investiment-ui
```

### 2️⃣ Instale as Dependências

```bash
npm install
```

Isso instalará todas as dependências listadas no `package.json`:

**Dependências Principais:**
- React 18.3+
- React Router Dom 6.28+
- Axios 1.7+
- Zustand 5.0+
- TanStack React Query 5.62+
- Tailwind CSS 3.4+
- Chart.js 4.4+
- Lucide Icons
- React Hook Form + Zod
- Date-fns

**Dependências de Desenvolvimento:**
- TypeScript 5.6+
- Vite 6.0+
- ESLint
- Tailwind CSS + PostCSS + Autoprefixer

### 3️⃣ Configure as Variáveis de Ambiente

O arquivo `.env` já está criado com as configurações padrão:

```env
VITE_API_BASE_URL=http://localhost:5000
VITE_APP_NAME=Investment Manager
```

**Se sua API estiver em outra porta**, edite o arquivo `.env`:

```bash
# Para Windows
notepad .env

# Para Linux/Mac
nano .env
```

### 4️⃣ Inicie o Servidor de Desenvolvimento

```bash
npm run dev
```

Você verá uma mensagem como:

```
VITE v6.0.1  ready in XXX ms

➜  Local:   http://localhost:3000/
➜  Network: use --host to expose
```

### 5️⃣ Acesse a Aplicação

Abra seu navegador em: **http://localhost:3000**

---

## 🔧 Comandos Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia servidor de desenvolvimento (porta 3000) |
| `npm run build` | Gera build de produção em `/dist` |
| `npm run preview` | Preview da build de produção |
| `npm run lint` | Executa ESLint para verificar código |

---

## 🌐 Configuração da API

A aplicação espera que a API .NET esteja rodando e acessível.

**Proxy configurado no Vite:**
- Todas as requisições para `/api/*` serão redirecionadas para `http://localhost:5000`

**Endpoints esperados pela aplicação:**

### Autenticação
- `POST /auth/login` - Login do usuário
- `POST /auth/register` - Registro de novo usuário
- `POST /auth/logout` - Logout
- `GET /auth/me` - Dados do usuário autenticado
- `POST /auth/refresh` - Refresh token

### Carteiras
- `GET /carteiras` - Listar todas as carteiras
- `GET /carteiras/:id` - Detalhes de uma carteira
- `POST /carteiras` - Criar nova carteira
- `PUT /carteiras/:id` - Atualizar carteira
- `DELETE /carteiras/:id` - Deletar carteira
- `GET /carteiras/:id/ativos` - Listar ativos de uma carteira

### Ativos
- `GET /ativos` - Listar todos os ativos
- `GET /ativos/:id` - Detalhes de um ativo
- `GET /ativos/search?q=QUERY` - Buscar ativos
- `POST /ativos` - Criar novo ativo
- `PUT /ativos/:id` - Atualizar ativo
- `DELETE /ativos/:id` - Deletar ativo

### Transações
- `GET /transacoes` - Listar todas as transações
- `GET /transacoes/:id` - Detalhes de uma transação
- `GET /transacoes/carteira/:carteiraId` - Transações de uma carteira
- `POST /transacoes` - Criar nova transação
- `PUT /transacoes/:id` - Atualizar transação
- `DELETE /transacoes/:id` - Deletar transação

### Dashboard
- `GET /dashboard/metrics` - Métricas do dashboard
- `GET /dashboard/alocacao` - Dados de alocação
- `GET /dashboard/evolucao` - Dados de evolução

### Relatórios
- `GET /relatorios/rentabilidade` - Relatório de rentabilidade
- `GET /relatorios/movimentacoes` - Relatório de movimentações
- `POST /relatorios/exportar-csv` - Exportar CSV

---

## ⚠️ Troubleshooting

### Problema: `npm install` demora muito ou trava

**Solução:**
```bash
# Limpe o cache do npm
npm cache clean --force

# Tente instalar novamente
npm install
```

### Problema: Erro "Cannot find module"

**Solução:**
```bash
# Delete node_modules e package-lock.json
rm -rf node_modules package-lock.json

# Reinstale
npm install
```

### Problema: Porta 3000 já está em uso

**Solução:**

Edite `vite.config.ts` e altere a porta:

```typescript
server: {
  port: 3001, // ou outra porta disponível
  ...
}
```

### Problema: API não está respondendo (CORS ou 404)

**Soluções:**

1. **Verifique se a API está rodando:**
   ```bash
   curl http://localhost:5000/health
   ```

2. **Configure CORS na API .NET:**
   A API precisa permitir requisições de `http://localhost:3000`

3. **Verifique a URL da API no `.env`:**
   ```env
   VITE_API_BASE_URL=http://localhost:5000
   ```

### Problema: Página em branco após build

**Solução:**

Verifique se não há erros de TypeScript:
```bash
npm run build
```

Se houver erros, corrija-os antes de fazer o build.

---

## 📁 Estrutura de Arquivos Criados

A aplicação possui **58 arquivos TypeScript** organizados em:

- 📂 **api/** - 7 arquivos (configuração e endpoints)
- 📂 **components/** - 7 arquivos (UI e componentes comuns)
- 📂 **features/** - 11 arquivos (hooks, componentes e services por feature)
- 📂 **hooks/** - 2 arquivos (hooks customizados)
- 📂 **layout/** - 3 arquivos (layout principal, navbar, sidebar)
- 📂 **lib/** - 3 arquivos (utils, constants, react-query)
- 📂 **pages/** - 7 arquivos (páginas principais)
- 📂 **router/** - 3 arquivos (configuração de rotas)
- 📂 **store/** - 3 arquivos (Zustand stores)
- 📂 **types/** - 5 arquivos (tipos TypeScript)
- 📂 **utils/** - 2 arquivos (formatters e validators)

**Total:** ~5.000+ linhas de código TypeScript profissional!

---

## ✅ Checklist de Instalação

Antes de começar a desenvolver, certifique-se de que:

- [ ] Node.js 18+ está instalado
- [ ] `npm install` executou sem erros
- [ ] Arquivo `.env` está configurado corretamente
- [ ] API .NET está rodando em `http://localhost:5000`
- [ ] `npm run dev` inicia sem erros
- [ ] Aplicação abre em `http://localhost:3000`
- [ ] Página de login é exibida corretamente

---

## 🎉 Próximos Passos

Após a instalação:

1. **Teste o login** - Use as credenciais da sua API
2. **Explore o Dashboard** - Veja as métricas e gráficos
3. **Crie uma carteira** - Adicione sua primeira carteira
4. **Adicione ativos** - Cadastre ativos financeiros
5. **Registre transações** - Comece a rastrear seus investimentos

---

## 📞 Suporte

Se encontrar problemas:

1. Verifique a seção **Troubleshooting** acima
2. Consulte o README.md para mais informações
3. Abra uma issue no repositório

---

**Desenvolvido com ❤️ usando React + Vite + TypeScript**
