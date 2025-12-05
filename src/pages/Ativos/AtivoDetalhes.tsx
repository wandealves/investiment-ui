import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useAtivo } from '@/features/ativos/hooks/useAtivos'
import PageHeader from '@/components/common/PageHeader'
import LoadingSpinner from '@/components/common/LoadingSpinner'
import { Button } from '@/components/ui/button'

const AtivoDetalhes = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: ativo, isLoading } = useAtivo(id!)

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (!ativo) {
    return <div>Ativo não encontrado</div>
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={ativo.ticker}
        description={ativo.nome}
        action={
          <Button variant="outline" onClick={() => navigate('/ativos')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
        }
      />

      <div className="rounded-lg border bg-card p-6">
        <h3 className="text-lg font-semibold mb-4">Informações do Ativo</h3>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Tipo</p>
            <p className="font-semibold">{ativo.tipo}</p>
          </div>
          {ativo.setor && (
            <div>
              <p className="text-sm text-muted-foreground">Setor</p>
              <p className="font-semibold">{ativo.setor}</p>
            </div>
          )}
          {ativo.descricao && (
            <div>
              <p className="text-sm text-muted-foreground">Descrição</p>
              <p className="font-semibold">{ativo.descricao}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AtivoDetalhes
