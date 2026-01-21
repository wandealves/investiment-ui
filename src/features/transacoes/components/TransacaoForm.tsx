import { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import LoadingSpinner from '@/components/common/LoadingSpinner'
import AtivoCombobox from '@/components/common/AtivoCombobox'
import { useCarteiras } from '@/features/carteiras/hooks/useCarteiras'
import { createTransacaoSchema, type CreateTransacaoFormData } from '../schemas/transacaoSchema'
import type { Transacao, TipoTransacao } from '@/types/entities.types'
import { cn } from '@/lib/utils'

interface TransacaoFormProps {
  transacao?: Transacao
  onSubmit: (data: CreateTransacaoFormData) => void
  onCancel: () => void
  isSubmitting: boolean
}

const tipoTransacaoOptions: TipoTransacao[] = [
  'Compra',
  'Venda',
  'Dividendo',
  'JCP',
  'Bonus',
  'Split',
  'Grupamento',
]

const TransacaoForm = ({ transacao, onSubmit, onCancel, isSubmitting }: TransacaoFormProps) => {
  const isEditMode = !!transacao

  // Fetch carteiras for select dropdown
  const { data: carteirasData, isLoading: isLoadingCarteiras } = useCarteiras({ pageSize: 100 })

  const carteiras = carteirasData?.data || []

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    control,
  } = useForm<CreateTransacaoFormData>({
    resolver: zodResolver(createTransacaoSchema),
    defaultValues: transacao
      ? {
          carteiraId: transacao.carteiraId,
          ativoId: transacao.ativoId,
          tipoTransacao: transacao.tipoTransacao as TipoTransacao,
          quantidade: transacao.quantidade,
          preco: transacao.preco,
          taxa: transacao.taxa,
          dataTransacao: transacao.dataTransacao.split('T')[0], // Format to YYYY-MM-DD for input[type="date"]
        }
      : {
          carteiraId: 0,
          ativoId: 0,
          tipoTransacao: 'Compra',
          quantidade: 0,
          preco: 0,
          taxa: 0,
          dataTransacao: new Date().toISOString().split('T')[0],
        },
  })

  useEffect(() => {
    if (transacao) {
      reset({
        carteiraId: transacao.carteiraId,
        ativoId: transacao.ativoId,
        tipoTransacao: transacao.tipoTransacao as TipoTransacao,
        quantidade: transacao.quantidade,
        preco: transacao.preco,
        taxa: transacao.taxa,
        dataTransacao: transacao.dataTransacao.split('T')[0],
      })
    }
  }, [transacao, reset])

  // Watch quantidade and preco to calculate valorTotal
  const quantidade = watch('quantidade')
  const preco = watch('preco')
  const valorTotal = quantidade && preco ? quantidade * preco : 0

  if (isLoadingCarteiras) {
    return (
      <div className="flex items-center justify-center p-8">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Carteira */}
      <div className="space-y-2">
        <Label htmlFor="carteiraId">
          Carteira <span className="text-destructive">*</span>
        </Label>
        <Controller
          name="carteiraId"
          control={control}
          render={({ field }) => (
            <select
              {...field}
              id="carteiraId"
              className={cn(
                'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                'disabled:cursor-not-allowed disabled:opacity-50',
                'transition-all duration-300'
              )}
              disabled={isSubmitting}
              onChange={(e) => field.onChange(Number(e.target.value))}
            >
              <option value={0}>Selecione uma carteira</option>
              {carteiras.map((carteira) => (
                <option key={carteira.id} value={carteira.id}>
                  {carteira.nome}
                </option>
              ))}
            </select>
          )}
        />
        {errors.carteiraId && (
          <p className="text-sm text-destructive">{errors.carteiraId.message}</p>
        )}
      </div>

      {/* Ativo */}
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
              initialAtivo={transacao?.ativoId && transacao.ativoCodigo ? {
                id: transacao.ativoId,
                codigo: transacao.ativoCodigo,
                nome: transacao.ativoNome || ''
              } : undefined}
            />
          )}
        />
      </div>

      {/* Tipo de Transação */}
      <div className="space-y-2">
        <Label htmlFor="tipoTransacao">
          Tipo de Transação <span className="text-destructive">*</span>
        </Label>
        <select
          {...register('tipoTransacao')}
          id="tipoTransacao"
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'transition-all duration-300'
          )}
          disabled={isSubmitting}
        >
          {tipoTransacaoOptions.map((tipo) => (
            <option key={tipo} value={tipo}>
              {tipo}
            </option>
          ))}
        </select>
        {errors.tipoTransacao && (
          <p className="text-sm text-destructive">{errors.tipoTransacao.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Quantidade */}
        <div className="space-y-2">
          <Label htmlFor="quantidade">
            Quantidade <span className="text-destructive">*</span>
          </Label>
          <Controller
            name="quantidade"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                id="quantidade"
                type="number"
                step="0.01"
                placeholder="0.00"
                disabled={isSubmitting}
                onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
              />
            )}
          />
          {errors.quantidade && (
            <p className="text-sm text-destructive">{errors.quantidade.message}</p>
          )}
        </div>

        {/* Preço */}
        <div className="space-y-2">
          <Label htmlFor="preco">
            Preço <span className="text-destructive">*</span>
          </Label>
          <Controller
            name="preco"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                id="preco"
                type="number"
                step="0.01"
                placeholder="0.00"
                disabled={isSubmitting}
                onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
              />
            )}
          />
          {errors.preco && (
            <p className="text-sm text-destructive">{errors.preco.message}</p>
          )}
        </div>
      </div>

      {/* Taxa */}
      <div className="space-y-2">
        <Label htmlFor="taxa">Taxa</Label>
        <Controller
          name="taxa"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              id="taxa"
              type="number"
              step="0.01"
              placeholder="0.00"
              disabled={isSubmitting}
              onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
            />
          )}
        />
        {errors.taxa && (
          <p className="text-sm text-destructive">{errors.taxa.message}</p>
        )}
      </div>

      {/* Data da Transação */}
      <div className="space-y-2">
        <Label htmlFor="dataTransacao">
          Data da Transação <span className="text-destructive">*</span>
        </Label>
        <Input
          {...register('dataTransacao')}
          id="dataTransacao"
          type="date"
          disabled={isSubmitting}
        />
        {errors.dataTransacao && (
          <p className="text-sm text-destructive">{errors.dataTransacao.message}</p>
        )}
      </div>

      {/* Valor Total (read-only) */}
      <div className="rounded-lg border bg-muted/30 p-4 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">Valor Total</span>
          <span className="text-lg font-bold font-mono">
            R$ {valorTotal.toFixed(2).replace('.', ',')}
          </span>
        </div>
        {watch('taxa') > 0 && (
          <div className="flex items-center justify-between pt-2 border-t">
            <span className="text-sm font-medium text-muted-foreground">Taxas</span>
            <span className="text-sm font-mono text-muted-foreground">
              R$ {watch('taxa').toFixed(2).replace('.', ',')}
            </span>
          </div>
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
            <>{isEditMode ? 'Salvar Alterações' : 'Criar Transação'}</>
          )}
        </Button>
      </div>
    </form>
  )
}

export default TransacaoForm
