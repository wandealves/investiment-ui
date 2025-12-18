import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useCreateTransacao, useUpdateTransacao } from '../hooks/useTransacoes'
import TransacaoForm from './TransacaoForm'
import type { Transacao } from '@/types/entities.types'
import type { CreateTransacaoFormData } from '../schemas/transacaoSchema'

interface TransacaoFormModalProps {
  isOpen: boolean
  onClose: () => void
  transacao?: Transacao | null
}

const TransacaoFormModal = ({ isOpen, onClose, transacao }: TransacaoFormModalProps) => {
  const isEditMode = !!transacao

  const createMutation = useCreateTransacao()
  const updateMutation = useUpdateTransacao()

  const handleSubmit = async (data: CreateTransacaoFormData) => {
    try {
      if (isEditMode) {
        await updateMutation.mutateAsync({ id: transacao.id, data })
      } else {
        await createMutation.mutateAsync(data)
      }
      onClose()
    } catch (error) {
      console.error('Error submitting transacao:', error)
    }
  }

  const isSubmitting = createMutation.isPending || updateMutation.isPending

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditMode ? 'Editar Transação' : 'Nova Transação'}</DialogTitle>
          <DialogDescription>
            {isEditMode
              ? 'Faça as alterações necessárias e clique em salvar.'
              : 'Preencha os dados da nova transação. Todos os campos são obrigatórios.'}
          </DialogDescription>
        </DialogHeader>

        <TransacaoForm
          transacao={transacao || undefined}
          onSubmit={handleSubmit}
          onCancel={onClose}
          isSubmitting={isSubmitting}
        />
      </DialogContent>
    </Dialog>
  )
}

export default TransacaoFormModal
