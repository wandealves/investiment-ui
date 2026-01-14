import { z } from 'zod'

export const createTransacaoSchema = z.object({
  carteiraId: z
    .number({
      required_error: 'Carteira é obrigatória',
      invalid_type_error: 'Selecione uma carteira válida',
    })
    .positive('Selecione uma carteira'),
  ativoId: z
    .number({
      required_error: 'Ativo é obrigatório',
      invalid_type_error: 'Selecione um ativo válido',
    })
    .positive('Selecione um ativo'),
  tipoTransacao: z
    .enum(['Compra', 'Venda', 'Dividendo', 'JCP', 'Bonus', 'Split', 'Grupamento'], {
      required_error: 'Tipo de transação é obrigatório',
    }),
  quantidade: z
    .number({
      required_error: 'Quantidade é obrigatória',
      invalid_type_error: 'Quantidade deve ser um número',
    })
    .positive('Quantidade deve ser maior que zero'),
  preco: z
    .number({
      required_error: 'Preço é obrigatório',
      invalid_type_error: 'Preço deve ser um número',
    })
    .positive('Preço deve ser maior que zero'),
  taxa: z
    .number({
      invalid_type_error: 'Taxa deve ser um número',
    })
    .nonnegative('Taxa deve ser maior ou igual a zero')
    .optional()
    .default(0),
  dataTransacao: z
    .string()
    .min(1, 'Data da transação é obrigatória'),
})

export const updateTransacaoSchema = z.object({
  carteiraId: z.number().positive('Selecione uma carteira').optional(),
  ativoId: z.number().positive('Selecione um ativo').optional(),
  tipoTransacao: z
    .enum(['Compra', 'Venda', 'Dividendo', 'JCP', 'Bonus', 'Split', 'Grupamento'])
    .optional(),
  quantidade: z.number().positive('Quantidade deve ser maior que zero').optional(),
  preco: z.number().positive('Preço deve ser maior que zero').optional(),
  taxa: z.number().nonnegative('Taxa deve ser maior ou igual a zero').optional(),
  dataTransacao: z.string().min(1, 'Data da transação é obrigatória').optional(),
})

export type CreateTransacaoFormData = z.infer<typeof createTransacaoSchema>
export type UpdateTransacaoFormData = z.infer<typeof updateTransacaoSchema>
