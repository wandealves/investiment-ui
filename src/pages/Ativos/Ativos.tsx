import { Plus, TrendingUp } from 'lucide-react'
import { useAtivos } from '@/features/ativos/hooks/useAtivos'
import PageHeader from '@/components/common/PageHeader'
import LoadingSpinner from '@/components/common/LoadingSpinner'
import EmptyState from '@/components/common/EmptyState'
import { Button } from '@/components/ui/button'

const Ativos = () => {
  const { data: ativos, isLoading } = useAtivos()

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Ativos"
        description="Gerencie seus ativos financeiros"
        action={
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Novo Ativo
          </Button>
        }
      />

      {!ativos || ativos.length === 0 ? (
        <EmptyState
          icon={TrendingUp}
          title="Nenhum ativo encontrado"
          description="Adicione ativos para começar a rastrear seus investimentos"
          actionLabel="Adicionar Ativo"
          onAction={() => console.log('Adicionar ativo')}
        />
      ) : (
        <div className="rounded-lg border bg-card">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">Código</th>
                  <th className="text-left p-4">Nome</th>
                  <th className="text-left p-4">Tipo</th>
                </tr>
              </thead>
              <tbody>
                {ativos.map((ativo) => (
                  <tr key={ativo.id} className="border-b hover:bg-muted/50">
                    <td className="p-4 font-semibold">{ativo.codigo}</td>
                    <td className="p-4">{ativo.nome}</td>
                    <td className="p-4">
                      <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs">
                        {ativo.tipo}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default Ativos
