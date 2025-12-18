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
import { useDeleteTransacao } from '../hooks/useTransacoes'
import type { Transacao } from '@/types/entities.types'
import { formatCurrency, formatDate } from '@/utils/formatters'

interface TransacaoDeleteDialogProps {
  isOpen: boolean
  onClose: () => void
  transacao: Transacao | null
}

const TransacaoDeleteDialog = ({ isOpen, onClose, transacao }: TransacaoDeleteDialogProps) => {
  const deleteMutation = useDeleteTransacao()

  const handleConfirm = async () => {
    if (!transacao) return

    try {
      await deleteMutation.mutateAsync(transacao.id)
      onClose()
    } catch (error) {
      console.error('Error deleting transacao:', error)
    }
  }

  if (!transacao) return null

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza que deseja excluir a transação de{' '}
            <span className="font-semibold text-foreground">
              {transacao.tipoTransacao}
            </span>
            {' '}do ativo{' '}
            <span className="font-semibold text-foreground">
              {transacao.ativoCodigo || transacao.ativoId}
            </span>
            {' '}no valor de{' '}
            <span className="font-semibold text-foreground font-mono">
              {formatCurrency(transacao.valorTotal)}
            </span>
            {' '}em{' '}
            <span className="font-semibold text-foreground">
              {formatDate(transacao.dataTransacao)}
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

export default TransacaoDeleteDialog
