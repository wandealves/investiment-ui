import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useCreateAtivo, useUpdateAtivo } from '../hooks/useAtivos'
import AtivoForm from './AtivoForm'
import type { Ativo } from '@/types/entities.types'
import type { CreateAtivoFormData } from '../schemas/ativoSchema'

interface AtivoFormModalProps {
  isOpen: boolean
  onClose: () => void
  ativo?: Ativo | null
}

const AtivoFormModal = ({ isOpen, onClose, ativo }: AtivoFormModalProps) => {
  const isEditMode = !!ativo

  const createMutation = useCreateAtivo()
  const updateMutation = useUpdateAtivo()

  const handleSubmit = async (data: CreateAtivoFormData) => {
    try {
      if (isEditMode) {
        await updateMutation.mutateAsync({ id: ativo.id, data })
      } else {
        await createMutation.mutateAsync(data)
      }
      onClose()
    } catch (error) {
      console.error('Error submitting ativo:', error)
    }
  }

  const isSubmitting = createMutation.isPending || updateMutation.isPending

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{isEditMode ? 'Editar Ativo' : 'Novo Ativo'}</DialogTitle>
          <DialogDescription>
            {isEditMode
              ? 'Faça as alterações necessárias e clique em salvar.'
              : 'Preencha os dados do novo ativo. Os campos marcados com * são obrigatórios.'}
          </DialogDescription>
        </DialogHeader>

        <AtivoForm
          ativo={ativo || undefined}
          onSubmit={handleSubmit}
          onCancel={onClose}
          isSubmitting={isSubmitting}
        />
      </DialogContent>
    </Dialog>
  )
}

export default AtivoFormModal
