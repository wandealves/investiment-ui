# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (runs on port 3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

## Architecture Overview

### Application Structure

This is a React 18 + Vite + TypeScript investment management application following a **feature-based architecture**:

- **Feature Modules** (`src/features/`): Each domain (auth, dashboard, carteiras, ativos, transacoes, relatorios) contains its own components, hooks, and services
- **Centralized API Layer** (`src/api/`): Axios configuration with interceptors and endpoint definitions
- **Zustand Stores** (`src/store/`): Global state for auth and theme
- **React Query** (`src/lib/react-query.ts`): Server state management with centralized query keys
- **Type System** (`src/types/`): Organized into entities, DTOs, API types, and chart types

### Key Architectural Patterns

**1. Authentication Flow**
- JWT token stored in `localStorage` as `access_token`
- Axios request interceptor automatically adds `Authorization: Bearer <token>` header
- 401 responses trigger automatic logout and redirect to `/login`
- `ProtectedRoute` component guards authenticated routes
- `useAuthStore` (Zustand) manages auth state with persistence

**2. Data Fetching Pattern**
- React Query for all server state
- Centralized `queryKeys` object in `src/lib/react-query.ts` for cache invalidation
- Custom hooks (e.g., `useCarteiras`, `useAtivos`) encapsulate React Query logic
- Mutations automatically invalidate related queries via `queryClient.invalidateQueries()`

**3. Routing Structure**
- All routes use lazy loading via `React.lazy()`
- Public route: `/login`
- Protected routes under `/` wrapped in `<ProtectedRoute>` and `<AppLayout>`
- Route tree: `/`, `/carteiras`, `/carteiras/:id`, `/ativos`, `/ativos/:id`, `/transacoes`, `/relatorios`

**4. API Communication**
- Base URL configured via `VITE_API_BASE_URL` env variable (defaults to `http://localhost:5000`)
- Vite proxy: `/api/*` requests are proxied to backend API
- `ApiClient` class (`src/api/client.ts`) wraps axios methods and returns `response.data`
- Endpoints organized by domain in `src/api/endpoints/`

### TypeScript Configuration

- Path alias: `@/*` maps to `src/*` (configured in `vite.config.ts` and `tsconfig.json`)
- Strict mode enabled
- Import like: `import { Button } from '@/components/ui/button'`

### State Management Strategy

**Global State (Zustand)**:
- `authStore`: User, token, isAuthenticated
- `themeStore`: Theme ('light' | 'dark')
- Both use `persist` middleware for localStorage persistence

**Server State (React Query)**:
- All API data fetching
- Automatic caching, refetching, and invalidation
- DevTools available in development mode

**Local State**:
- Component-level state with `useState`
- Form state with React Hook Form

### UI Component System

**Component Hierarchy**:
- `src/components/ui/`: Base UI primitives (Button, Input, Label) using Tailwind + CVA (class-variance-authority)
- `src/components/common/`: Shared components (PageHeader, LoadingSpinner, EmptyState, ThemeToggle)
- `src/features/*/components/`: Feature-specific components
- `src/layout/`: Layout structure (AppLayout, Navbar, Sidebar)

**Styling**:
- Tailwind CSS with CSS variables for theming
- Dark/Light mode via class on root element
- Theme colors defined in `src/index.css` using HSL values
- `cn()` utility (`src/lib/utils.ts`) for merging Tailwind classes

### Form Handling

- React Hook Form for form state management
- Zod for schema validation
- `@hookform/resolvers/zod` for integration
- Pattern: Define Zod schema → Use `useForm` with `zodResolver` → Display errors from `formState.errors`

## Backend API Integration

The application expects a .NET API running at `http://localhost:5000` with these endpoints:

**Auth**: `/auth/login`, `/auth/register`, `/auth/logout`, `/auth/me`, `/auth/refresh`

**Carteiras**: GET/POST `/carteiras`, GET/PUT/DELETE `/carteiras/:id`, GET `/carteiras/:id/ativos`

**Ativos**: GET/POST `/ativos`, GET/PUT/DELETE `/ativos/:id`, GET `/ativos/search?q=...`

**Transações**: GET/POST `/transacoes`, GET/PUT/DELETE `/transacoes/:id`, GET `/transacoes/carteira/:carteiraId`

**Dashboard**: GET `/dashboard/metrics`, GET `/dashboard/alocacao`, GET `/dashboard/evolucao`

**Relatórios**: GET `/relatorios/rentabilidade`, GET `/relatorios/movimentacoes`, POST `/relatorios/exportar-csv`

## Environment Variables

Configure in `.env`:
- `VITE_API_BASE_URL`: Backend API URL (default: `http://localhost:5000`)
- `VITE_APP_NAME`: Application name (default: `Investment Manager`)

## Working with Features

When adding a new feature or modifying existing ones:

1. **Add Types**: Define entities in `src/types/entities.types.ts` and DTOs in `src/types/dto.types.ts`
2. **Create Endpoints**: Add endpoint functions in `src/api/endpoints/`
3. **Add Query Keys**: Register query keys in `src/lib/react-query.ts` for proper cache management
4. **Create Hooks**: Build custom hooks using React Query in `src/features/[feature]/hooks/`
5. **Build Components**: Create feature components in `src/features/[feature]/components/`
6. **Add Pages**: Create page components in `src/pages/`
7. **Register Routes**: Add routes in `src/router/routes.tsx` with lazy loading

## Common Patterns

**Creating a new CRUD hook:**
```typescript
// In src/features/[feature]/hooks/use[Feature].ts
export const use[Features] = () => {
  return useQuery({
    queryKey: queryKeys.[feature].all,
    queryFn: [feature]Endpoints.getAll,
  })
}

export const useCreate[Feature] = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: [feature]Endpoints.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.[feature].all })
      toast.success('Created successfully!')
    },
  })
}
```

**Creating a protected page:**
```typescript
// Already wrapped - just add to routes.tsx under AppLayout children
const NewPage = lazy(() => import('@/pages/NewPage'))
// Add to routes array as child of '/' route
```

**Adding a new API endpoint:**
```typescript
// In src/api/endpoints/[domain].ts
export const [domain]Endpoints = {
  method: (params) => ApiClient.get<ReturnType>('/endpoint', { params }),
}
```

## Toast Notifications

The `toast` utility in `src/hooks/useToast.ts` is currently a placeholder. When implementing:
- Consider using `sonner` or `react-hot-toast`
- Import and use throughout mutation hooks for user feedback

## Chart.js Integration

Chart.js components should be registered in the component that uses them:
```typescript
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
ChartJS.register(ArcElement, Tooltip, Legend)
```

Chart data hooks are in `src/features/dashboard/hooks/useDashboardData.ts`
