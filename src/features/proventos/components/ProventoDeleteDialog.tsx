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
import { useDeleteProvento } from '../hooks/useProventos'
import type { Provento } from '@/types/entities.types'

interface ProventoDeleteDialogProps {
  isOpen: boolean
  onClose: () => void
  provento: Provento | null
}

const ProventoDeleteDialog = ({ isOpen, onClose, provento }: ProventoDeleteDialogProps) => {
  const deleteMutation = useDeleteProvento()

  const handleConfirm = async () => {
    if (!provento) return

    try {
      await deleteMutation.mutateAsync(provento.id)
      onClose()
    } catch (error) {
      // Error is handled by the mutation hook
    }
  }

  if (!provento) return null

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza que deseja excluir o provento de{' '}
            <span className="font-semibold text-foreground">
              {provento.ativoCodigo} ({provento.tipoProventoDescricao})
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

export default ProventoDeleteDialog
