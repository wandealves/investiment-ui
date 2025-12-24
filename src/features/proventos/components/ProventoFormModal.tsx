import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useCreateProvento, useUpdateProvento } from '../hooks/useProventos'
import ProventoForm from './ProventoForm'
import type { Provento } from '@/types/entities.types'
import type { CreateProventoFormData } from '../schemas/proventoSchema'

interface ProventoFormModalProps {
  isOpen: boolean
  onClose: () => void
  provento?: Provento | null
}

const ProventoFormModal = ({ isOpen, onClose, provento }: ProventoFormModalProps) => {
  const isEditMode = !!provento

  const createMutation = useCreateProvento()
  const updateMutation = useUpdateProvento()

  const handleSubmit = async (data: CreateProventoFormData) => {
    try {
      if (isEditMode) {
        await updateMutation.mutateAsync({ id: provento.id, data })
      } else {
        await createMutation.mutateAsync(data)
      }
      onClose()
    } catch (error) {
      console.error('Error submitting provento:', error)
    }
  }

  const isSubmitting = createMutation.isPending || updateMutation.isPending

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditMode ? 'Editar Provento' : 'Novo Provento'}</DialogTitle>
          <DialogDescription>
            {isEditMode
              ? 'Faça as alterações necessárias e clique em salvar.'
              : 'Preencha os dados do novo provento. Os campos marcados com * são obrigatórios.'}
          </DialogDescription>
        </DialogHeader>

        <ProventoForm
          provento={provento || undefined}
          onSubmit={handleSubmit}
          onCancel={onClose}
          isSubmitting={isSubmitting}
        />
      </DialogContent>
    </Dialog>
  )
}

export default ProventoFormModal
