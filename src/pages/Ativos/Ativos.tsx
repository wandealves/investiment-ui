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
        <div className="rounded-lg border bg-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/30">
                  <th className="text-left p-4 text-sm font-semibold">Código</th>
                  <th className="text-left p-4 text-sm font-semibold">Nome</th>
                  <th className="text-left p-4 text-sm font-semibold">Tipo</th>
                </tr>
              </thead>
              <tbody>
                {ativos.map((ativo, index) => (
                  <tr
                    key={ativo.id}
                    className="group border-b last:border-b-0 transition-all duration-300 hover:bg-primary/5 hover:shadow-[inset_3px_0_0_0] hover:shadow-primary cursor-pointer animate-fade-in"
                    style={{
                      animationDelay: `${index * 50}ms`,
                      animationFillMode: 'backwards',
                    }}
                  >
                    <td className="p-4 font-semibold group-hover:text-primary transition-colors duration-300">
                      {ativo.codigo}
                    </td>
                    <td className="p-4">{ativo.nome}</td>
                    <td className="p-4">
                      <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs group-hover:bg-primary/20 transition-colors duration-300">
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
