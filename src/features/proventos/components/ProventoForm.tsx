import { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import AtivoCombobox from '@/components/common/AtivoCombobox'
import { proventoSchema, type CreateProventoFormData } from '../schemas/proventoSchema'
import type { Provento } from '@/types/entities.types'
import { TipoProvento, StatusProvento } from '@/types/entities.types'

interface ProventoFormProps {
  provento?: Provento
  onSubmit: (data: CreateProventoFormData) => void
  onCancel: () => void
  isSubmitting: boolean
}

const ProventoForm = ({ provento, onSubmit, onCancel, isSubmitting }: ProventoFormProps) => {
  const isEditMode = !!provento

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<CreateProventoFormData>({
    resolver: zodResolver(proventoSchema),
    defaultValues: provento
      ? {
          ativoId: provento.ativoId,
          tipoProvento: provento.tipoProvento,
          valorPorCota: provento.valorPorCota,
          dataCom: provento.dataCom.split('T')[0],
          dataEx: provento.dataEx ? provento.dataEx.split('T')[0] : '',
          dataPagamento: provento.dataPagamento.split('T')[0],
          status: provento.status,
          observacao: provento.observacao || '',
        }
      : {
          ativoId: 0,
          tipoProvento: TipoProvento.Dividendo,
          valorPorCota: 0,
          dataCom: '',
          dataEx: '',
          dataPagamento: '',
          status: StatusProvento.Agendado,
          observacao: '',
        },
  })

  useEffect(() => {
    if (provento) {
      reset({
        ativoId: provento.ativoId,
        tipoProvento: provento.tipoProvento,
        valorPorCota: provento.valorPorCota,
        dataCom: provento.dataCom.split('T')[0],
        dataEx: provento.dataEx ? provento.dataEx.split('T')[0] : '',
        dataPagamento: provento.dataPagamento.split('T')[0],
        status: provento.status,
        observacao: provento.observacao || '',
      })
    }
  }, [provento, reset])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="ativoId">
          Ativo <span className="text-destructive">*</span>
        </Label>
        <Controller
          name="ativoId"
          control={control}
          render={({ field }) => (
            <AtivoCombobox
              value={field.value}
              onChange={field.onChange}
              disabled={isSubmitting}
              error={errors.ativoId?.message}
            />
          )}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="tipoProvento">
          Tipo de Provento <span className="text-destructive">*</span>
        </Label>
        <select
          id="tipoProvento"
          {...register('tipoProvento')}
          disabled={isSubmitting}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <option value={TipoProvento.Dividendo}>Dividendo</option>
          <option value={TipoProvento.JCP}>JCP - Juros sobre Capital Próprio</option>
          <option value={TipoProvento.RendimentoFII}>Rendimento de FII</option>
          <option value={TipoProvento.Bonificacao}>Bonificação</option>
        </select>
        {errors.tipoProvento && (
          <p className="text-sm text-destructive">{errors.tipoProvento.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="valorPorCota">
          Valor por Cota (R$) <span className="text-destructive">*</span>
        </Label>
        <Input
          id="valorPorCota"
          type="number"
          step="0.01"
          {...register('valorPorCota', { valueAsNumber: true })}
          placeholder="Ex: 0.50"
          disabled={isSubmitting}
        />
        {errors.valorPorCota && (
          <p className="text-sm text-destructive">{errors.valorPorCota.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="dataCom">
            Data COM <span className="text-destructive">*</span>
          </Label>
          <Input
            id="dataCom"
            type="date"
            {...register('dataCom')}
            disabled={isSubmitting}
          />
          {errors.dataCom && (
            <p className="text-sm text-destructive">{errors.dataCom.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="dataEx">Data EX</Label>
          <Input
            id="dataEx"
            type="date"
            {...register('dataEx')}
            disabled={isSubmitting}
          />
          {errors.dataEx && (
            <p className="text-sm text-destructive">{errors.dataEx.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="dataPagamento">
          Data de Pagamento <span className="text-destructive">*</span>
        </Label>
        <Input
          id="dataPagamento"
          type="date"
          {...register('dataPagamento')}
          disabled={isSubmitting}
        />
        {errors.dataPagamento && (
          <p className="text-sm text-destructive">{errors.dataPagamento.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">
          Status <span className="text-destructive">*</span>
        </Label>
        <select
          id="status"
          {...register('status')}
          disabled={isSubmitting}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <option value={StatusProvento.Agendado}>Agendado</option>
          <option value={StatusProvento.Pago}>Pago</option>
          <option value={StatusProvento.Cancelado}>Cancelado</option>
        </select>
        {errors.status && (
          <p className="text-sm text-destructive">{errors.status.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="observacao">Observação</Label>
        <textarea
          id="observacao"
          {...register('observacao')}
          placeholder="Observações adicionais sobre o provento"
          disabled={isSubmitting}
          rows={3}
          className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
        {errors.observacao && (
          <p className="text-sm text-destructive">{errors.observacao.message}</p>
        )}
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Salvando...' : isEditMode ? 'Salvar' : 'Criar'}
        </Button>
      </div>
    </form>
  )
}

export default ProventoForm
