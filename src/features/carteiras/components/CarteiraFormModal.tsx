import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useCreateCarteira, useUpdateCarteira } from '../hooks/useCarteiras'
import CarteiraForm from './CarteiraForm'
import type { Carteira } from '@/types/entities.types'
import type { CreateCarteiraFormData } from '../schemas/carteiraSchema'

interface CarteiraFormModalProps {
  isOpen: boolean
  onClose: () => void
  carteira?: Carteira | null
}

const CarteiraFormModal = ({ isOpen, onClose, carteira }: CarteiraFormModalProps) => {
  const isEditMode = !!carteira

  const createMutation = useCreateCarteira()
  const updateMutation = useUpdateCarteira()

  const handleSubmit = async (data: CreateCarteiraFormData) => {
    try {
      if (isEditMode) {
        await updateMutation.mutateAsync({ id: carteira.id.toString(), data })
      } else {
        await createMutation.mutateAsync(data)
      }
      onClose()
    } catch (error) {
      console.error('Error submitting carteira:', error)
    }
  }

  const isSubmitting = createMutation.isPending || updateMutation.isPending

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{isEditMode ? 'Editar Carteira' : 'Nova Carteira'}</DialogTitle>
          <DialogDescription>
            {isEditMode
              ? 'Faça as alterações necessárias e clique em salvar.'
              : 'Preencha os dados da nova carteira. O campo nome é obrigatório.'}
          </DialogDescription>
        </DialogHeader>

        <CarteiraForm
          carteira={carteira || undefined}
          onSubmit={handleSubmit}
          onCancel={onClose}
          isSubmitting={isSubmitting}
        />
      </DialogContent>
    </Dialog>
  )
}

export default CarteiraFormModal
