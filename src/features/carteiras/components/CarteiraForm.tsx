import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import LoadingSpinner from '@/components/common/LoadingSpinner'
import { createCarteiraSchema, type CreateCarteiraFormData } from '../schemas/carteiraSchema'
import type { Carteira } from '@/types/entities.types'

interface CarteiraFormProps {
  carteira?: Carteira
  onSubmit: (data: CreateCarteiraFormData) => void
  onCancel: () => void
  isSubmitting: boolean
}

const CarteiraForm = ({ carteira, onSubmit, onCancel, isSubmitting }: CarteiraFormProps) => {
  const isEditMode = !!carteira

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateCarteiraFormData>({
    resolver: zodResolver(createCarteiraSchema),
    defaultValues: carteira
      ? {
          nome: carteira.nome,
          descricao: carteira.descricao || '',
        }
      : {
          nome: '',
          descricao: '',
        },
  })

  useEffect(() => {
    if (carteira) {
      reset({
        nome: carteira.nome,
        descricao: carteira.descricao || '',
      })
    }
  }, [carteira, reset])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="nome">
          Nome <span className="text-destructive">*</span>
        </Label>
        <Input
          id="nome"
          {...register('nome')}
          placeholder="Ex: Minha Carteira Principal"
          disabled={isSubmitting}
          autoFocus
        />
        {errors.nome && (
          <p className="text-sm text-destructive">{errors.nome.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="descricao">Descrição</Label>
        <textarea
          id="descricao"
          {...register('descricao')}
          placeholder="Informações adicionais sobre a carteira..."
          className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={isSubmitting}
        />
        {errors.descricao && (
          <p className="text-sm text-destructive">{errors.descricao.message}</p>
        )}
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <LoadingSpinner size="sm" className="mr-2" />
              {isEditMode ? 'Salvando...' : 'Criando...'}
            </>
          ) : (
            <>{isEditMode ? 'Salvar Alterações' : 'Criar Carteira'}</>
          )}
        </Button>
      </div>
    </form>
  )
}

export default CarteiraForm
