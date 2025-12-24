import { z } from 'zod'
import { TipoProvento, StatusProvento } from '@/types/entities.types'

export const proventoSchema = z.object({
  ativoId: z.number({ required_error: 'Ativo é obrigatório' }).positive('Selecione um ativo válido'),
  tipoProvento: z.nativeEnum(TipoProvento, { required_error: 'Tipo de provento é obrigatório' }),
  valorPorCota: z
    .number({ required_error: 'Valor por cota é obrigatório' })
    .positive('Valor por cota deve ser maior que zero'),
  dataCom: z.string({ required_error: 'Data COM é obrigatória' }).min(1, 'Data COM é obrigatória'),
  dataEx: z.string().optional(),
  dataPagamento: z.string({ required_error: 'Data de pagamento é obrigatória' }).min(1, 'Data de pagamento é obrigatória'),
  status: z.nativeEnum(StatusProvento, { required_error: 'Status é obrigatório' }),
  observacao: z.string().max(500, 'Observação deve ter no máximo 500 caracteres').optional(),
})

export type CreateProventoFormData = z.infer<typeof proventoSchema>
