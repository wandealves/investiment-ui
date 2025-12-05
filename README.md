# Investment Manager

Uma aplicação completa de gestão de investimentos desenvolvida com **ReactJS + Vite + TypeScript** e **Aceternity UI**, conectada a uma API .NET.

## 🚀 Funcionalidades

- ✅ **Autenticação** completa com JWT (Login/Logout)
- 📊 **Dashboard** com métricas e gráficos
- 💼 **Gestão de Carteiras** (CRUD completo)
- 📈 **Gestão de Ativos** (CRUD completo)
- 💳 **Registro de Transações** (Compra, Venda, Dividendos, JCP, Split)
- 📑 **Relatórios** com exportação CSV
- 🌓 **Dark/Light Mode**
- 📱 **Responsivo** (Mobile-first)
- 🎨 **UI Moderna** com Aceternity UI + Tailwind CSS

## 🛠️ Stack Tecnológica

- **React 18+** - Biblioteca UI
- **Vite** - Build tool
- **TypeScript 5+** - Tipagem estática
- **Zustand** - State management
- **React Query** - Data fetching e cache
- **React Router Dom** - Roteamento
- **Axios** - HTTP client
- **Aceternity UI** - Componentes UI
- **Tailwind CSS** - Estilização
- **Chart.js** - Gráficos
- **Lucide Icons** - Ícones
- **React Hook Form + Zod** - Formulários e validação

## 📦 Instalação

### Pré-requisitos

- Node.js 18+ instalado
- npm ou yarn
- API .NET rodando em `http://localhost:5000`

### Passo a Passo

1. **Clone o repositório**
```bash
git clone <url-do-repositorio>
cd investiment-ui
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**

Copie o arquivo `.env.example` para `.env` e ajuste conforme necessário:
```bash
cp .env.example .env
```

O arquivo `.env` deve conter:
```env
VITE_API_BASE_URL=http://localhost:5000
VITE_APP_NAME=Investment Manager
```

4. **Inicie o servidor de desenvolvimento**
```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:3000`

## 🏗️ Estrutura do Projeto

```
src/
├── api/                    # Configuração Axios e endpoints
│   ├── axios.ts
│   ├── client.ts
│   └── endpoints/
├── components/             # Componentes reutilizáveis
│   ├── ui/                # Componentes UI base
│   ├── common/            # Componentes comuns
│   └── charts/            # Componentes de gráficos
├── features/              # Features organizadas por domínio
│   ├── auth/
│   ├── dashboard/
│   ├── carteiras/
│   ├── ativos/
│   ├── transacoes/
│   └── relatorios/
├── hooks/                 # Custom hooks
├── layout/                # Layouts da aplicação
├── lib/                   # Utilitários e configurações
├── pages/                 # Páginas principais
├── router/                # Configuração de rotas
├── store/                 # Zustand stores
├── types/                 # TypeScript types
├── utils/                 # Funções utilitárias
├── App.tsx               # Componente raiz
├── main.tsx              # Entry point
└── index.css             # Estilos globais
```

## 🎯 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview

# Lint
npm run lint
```

## 📱 Rotas da Aplicação

- `/login` - Página de login
- `/` - Dashboard (protegida)
- `/carteiras` - Listagem de carteiras (protegida)
- `/carteiras/:id` - Detalhes da carteira (protegida)
- `/ativos` - Listagem de ativos (protegida)
- `/ativos/:id` - Detalhes do ativo (protegida)
- `/transacoes` - Listagem de transações (protegida)
- `/relatorios` - Relatórios (protegida)

## 🔐 Autenticação

A aplicação utiliza JWT (JSON Web Token) para autenticação:

1. O usuário faz login com email e senha
2. A API retorna um token JWT
3. O token é armazenado no localStorage
4. Todas as requisições subsequentes incluem o token no header `Authorization: Bearer <token>`
5. Rotas protegidas redirecionam para `/login` se o usuário não estiver autenticado

## 🎨 Temas

A aplicação suporta Dark e Light mode. O tema é persistido no localStorage e pode ser alternado através do botão na navbar.

## 📊 Gráficos

Os gráficos são implementados com Chart.js:
- **Alocação por Ativo** - Gráfico de pizza (Doughnut)
- **Evolução do Patrimônio** - Gráfico de linha (Line)

## 🔧 Configuração da API

A aplicação espera que a API .NET esteja rodando em `http://localhost:5000` por padrão. Você pode alterar isso no arquivo `.env`:

```env
VITE_API_BASE_URL=http://sua-api.com
```

O Vite está configurado para fazer proxy das requisições `/api/*` para a API backend.

## 📝 Tipos TypeScript

Todos os tipos estão definidos em `src/types/`:
- `entities.types.ts` - Entidades do domínio
- `dto.types.ts` - Data Transfer Objects
- `api.types.ts` - Tipos relacionados à API
- `chart.types.ts` - Tipos para gráficos

## 🧪 Próximos Passos

- [ ] Implementar testes unitários (Vitest)
- [ ] Implementar testes E2E (Playwright)
- [ ] Adicionar biblioteca de toast notifications (sonner)
- [ ] Implementar gráficos completos com Chart.js
- [ ] Adicionar mais validações de formulários
- [ ] Implementar paginação nas listagens
- [ ] Adicionar filtros avançados
- [ ] Implementar exportação de relatórios

## 📄 Licença

Este projeto está sob a licença MIT.

## 👨‍💻 Desenvolvimento

O código segue as melhores práticas de desenvolvimento React:
- **Clean Code** - Código limpo e legível
- **SOLID** - Princípios SOLID aplicados
- **Type Safety** - 100% TypeScript
- **Component Composition** - Componentes reutilizáveis
- **Separation of Concerns** - Separação clara de responsabilidades
- **Error Handling** - Tratamento robusto de erros

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

## 📞 Suporte

Para suporte, abra uma issue no repositório.

---

Desenvolvido com ❤️ usando React + Vite + TypeScript
