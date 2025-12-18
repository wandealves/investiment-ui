import { Pencil, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Ativo } from '@/types/entities.types'

interface AtivoActionsProps {
  ativo: Ativo
  onEdit: (ativo: Ativo) => void
  onDelete: (ativo: Ativo) => void
}

const AtivoActions = ({ ativo, onEdit, onDelete }: AtivoActionsProps) => {
  return (
    <div className="flex items-center justify-end gap-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={(e) => {
          e.stopPropagation()
          onEdit(ativo)
        }}
        className="h-8 w-8 text-primary hover:text-primary hover:bg-primary/10"
        aria-label={`Editar ${ativo.codigo}`}
      >
        <Pencil className="h-4 w-4" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={(e) => {
          e.stopPropagation()
          onDelete(ativo)
        }}
        className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
        aria-label={`Excluir ${ativo.codigo}`}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  )
}

export default AtivoActions
