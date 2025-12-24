import { Pencil, Trash2, CheckCircle2, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Provento } from '@/types/entities.types'
import { useMarcarComoPago, useCancelarProvento } from '../hooks/useProventos'

interface ProventoActionsProps {
  provento: Provento
  onEdit: (provento: Provento) => void
  onDelete: (provento: Provento) => void
}

const ProventoActions = ({ provento, onEdit, onDelete }: ProventoActionsProps) => {
  const marcarComoPago = useMarcarComoPago()
  const cancelar = useCancelarProvento()

  const handleMarcarPago = (e: React.MouseEvent) => {
    e.stopPropagation()
    marcarComoPago.mutate(provento.id)
  }

  const handleCancelar = (e: React.MouseEvent) => {
    e.stopPropagation()
    cancelar.mutate(provento.id)
  }

  return (
    <div className="flex items-center justify-end gap-2">
      {provento.status === 'Agendado' && (
        <>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleMarcarPago}
            disabled={marcarComoPago.isPending}
            className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-100 dark:hover:bg-green-900/20"
            aria-label="Marcar como pago"
            title="Marcar como pago"
          >
            <CheckCircle2 className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={handleCancelar}
            disabled={cancelar.isPending}
            className="h-8 w-8 text-orange-600 hover:text-orange-700 hover:bg-orange-100 dark:hover:bg-orange-900/20"
            aria-label="Cancelar provento"
            title="Cancelar"
          >
            <XCircle className="h-4 w-4" />
          </Button>
        </>
      )}

      <Button
        variant="ghost"
        size="icon"
        onClick={(e) => {
          e.stopPropagation()
          onEdit(provento)
        }}
        className="h-8 w-8 text-primary hover:text-primary hover:bg-primary/10"
        aria-label="Editar provento"
      >
        <Pencil className="h-4 w-4" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={(e) => {
          e.stopPropagation()
          onDelete(provento)
        }}
        className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
        aria-label="Excluir provento"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  )
}

export default ProventoActions
