import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import LoadingSpinner from '@/components/common/LoadingSpinner'
import { createAtivoSchema, type CreateAtivoFormData } from '../schemas/ativoSchema'
import type { Ativo } from '@/types/entities.types'

interface AtivoFormProps {
  ativo?: Ativo
  onSubmit: (data: CreateAtivoFormData) => void
  onCancel: () => void
  isSubmitting: boolean
}

const AtivoForm = ({ ativo, onSubmit, onCancel, isSubmitting }: AtivoFormProps) => {
  const isEditMode = !!ativo

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateAtivoFormData>({
    resolver: zodResolver(createAtivoSchema),
    defaultValues: ativo
      ? {
          codigo: ativo.codigo,
          nome: ativo.nome,
          tipo: ativo.tipo,
          descricao: ativo.descricao || '',
        }
      : {
          codigo: '',
          nome: '',
          tipo: '',
          descricao: '',
        },
  })

  useEffect(() => {
    if (ativo) {
      reset({
        codigo: ativo.codigo,
        nome: ativo.nome,
        tipo: ativo.tipo,
        descricao: ativo.descricao || '',
      })
    }
  }, [ativo, reset])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="codigo">
          Código <span className="text-destructive">*</span>
        </Label>
        <Input
          id="codigo"
          {...register('codigo')}
          placeholder="Ex: PETR4, IVVB11"
          disabled={isSubmitting}
          autoFocus
        />
        {errors.codigo && (
          <p className="text-sm text-destructive">{errors.codigo.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="nome">
          Nome <span className="text-destructive">*</span>
        </Label>
        <Input
          id="nome"
          {...register('nome')}
          placeholder="Ex: Petrobras PN, iShares S&P 500"
          disabled={isSubmitting}
        />
        {errors.nome && (
          <p className="text-sm text-destructive">{errors.nome.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="tipo">
          Tipo <span className="text-destructive">*</span>
        </Label>
        <Input
          id="tipo"
          {...register('tipo')}
          placeholder="Ex: Ação, FII, ETF, Renda Fixa"
          disabled={isSubmitting}
        />
        {errors.tipo && (
          <p className="text-sm text-destructive">{errors.tipo.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="descricao">Descrição</Label>
        <textarea
          id="descricao"
          {...register('descricao')}
          placeholder="Informações adicionais sobre o ativo..."
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
            <>{isEditMode ? 'Salvar Alterações' : 'Criar Ativo'}</>
          )}
        </Button>
      </div>
    </form>
  )
}

export default AtivoForm
