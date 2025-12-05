import { Plus, Wallet as WalletIcon } from 'lucide-react'
import { useCarteiras } from '@/features/carteiras/hooks/useCarteiras'
import CarteiraCard from '@/features/carteiras/components/CarteiraCard'
import PageHeader from '@/components/common/PageHeader'
import LoadingSpinner from '@/components/common/LoadingSpinner'
import EmptyState from '@/components/common/EmptyState'
import { Button } from '@/components/ui/button'

const Carteiras = () => {
  const { data: carteiras, isLoading } = useCarteiras()

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Carteiras"
        description="Gerencie suas carteiras de investimento"
        action={
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nova Carteira
          </Button>
        }
      />

      {!carteiras || carteiras.length === 0 ? (
        <EmptyState
          icon={WalletIcon}
          title="Nenhuma carteira encontrada"
          description="Crie sua primeira carteira para começar a gerenciar seus investimentos"
          actionLabel="Criar Carteira"
          onAction={() => console.log('Criar carteira')}
        />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {carteiras.map((carteira) => (
            <CarteiraCard key={carteira.id} carteira={carteira} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Carteiras
