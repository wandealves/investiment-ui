import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { useDeleteAtivo } from '../hooks/useAtivos'
import type { Ativo } from '@/types/entities.types'

interface AtivoDeleteDialogProps {
  isOpen: boolean
  onClose: () => void
  ativo: Ativo | null
}

const AtivoDeleteDialog = ({ isOpen, onClose, ativo }: AtivoDeleteDialogProps) => {
  const deleteMutation = useDeleteAtivo()

  const handleConfirm = async () => {
    if (!ativo) return

    try {
      await deleteMutation.mutateAsync(ativo.id.toString())
      onClose()
    } catch (error) {
     
    }
  }

  if (!ativo) return null

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza que deseja excluir o ativo{' '}
            <span className="font-semibold text-foreground">
              {ativo.codigo} - {ativo.nome}
            </span>
            ? Esta ação não pode ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={deleteMutation.isPending}>
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            disabled={deleteMutation.isPending}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {deleteMutation.isPending ? 'Excluindo...' : 'Excluir'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default AtivoDeleteDialog
