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
import { useDeleteCarteira } from '../hooks/useCarteiras'
import type { Carteira } from '@/types/entities.types'

interface CarteiraDeleteDialogProps {
  isOpen: boolean
  onClose: () => void
  carteira: Carteira | null
}

const CarteiraDeleteDialog = ({ isOpen, onClose, carteira }: CarteiraDeleteDialogProps) => {
  const deleteMutation = useDeleteCarteira()

  const handleConfirm = async () => {
    if (!carteira) return

    try {
      await deleteMutation.mutateAsync(carteira.id)
      onClose()
    } catch (error) {
      console.error('Error deleting carteira:', error)
    }
  }

  if (!carteira) return null

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza que deseja excluir a carteira{' '}
            <span className="font-semibold text-foreground">
              {carteira.nome}
            </span>
            ? Esta ação não pode ser desfeita e todos os dados da carteira serão perdidos.
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

export default CarteiraDeleteDialog
