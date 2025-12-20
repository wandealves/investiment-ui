import { z } from 'zod'
import { TipoAtivo } from '@/types/entities.types'

export const createAtivoSchema = z.object({
  codigo: z
    .string()
    .min(1, 'Código é obrigatório')
    .max(20, 'Código deve ter no máximo 20 caracteres')
    .toUpperCase()
    .regex(/^[A-Z0-9]+$/, 'Código deve conter apenas letras e números'),
  nome: z
    .string()
    .min(1, 'Nome é obrigatório')
    .max(200, 'Nome deve ter no máximo 200 caracteres'),
  tipo: z.nativeEnum(TipoAtivo, {
    required_error: 'Tipo é obrigatório',
    invalid_type_error: 'Tipo inválido',
  }),
  descricao: z
    .string()
    .max(500, 'Descrição deve ter no máximo 500 caracteres')
    .optional()
    .or(z.literal('')),
})

export const updateAtivoSchema = z.object({
  codigo: z
    .string()
    .min(1, 'Código é obrigatório')
    .max(20, 'Código deve ter no máximo 20 caracteres')
    .toUpperCase()
    .regex(/^[A-Z0-9]+$/, 'Código deve conter apenas letras e números')
    .optional(),
  nome: z
    .string()
    .min(1, 'Nome é obrigatório')
    .max(200, 'Nome deve ter no máximo 200 caracteres')
    .optional(),
  tipo: z.nativeEnum(TipoAtivo, {
    required_error: 'Tipo é obrigatório',
    invalid_type_error: 'Tipo inválido',
  }).optional(),
  descricao: z
    .string()
    .max(500, 'Descrição deve ter no máximo 500 caracteres')
    .optional()
    .or(z.literal('')),
})

export type CreateAtivoFormData = z.infer<typeof createAtivoSchema>
export type UpdateAtivoFormData = z.infer<typeof updateAtivoSchema>
