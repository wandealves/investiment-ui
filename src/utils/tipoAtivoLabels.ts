import { TipoAtivo } from '@/types/entities.types'

export const tipoAtivoLabels: Record<TipoAtivo, string> = {
  [TipoAtivo.Acao]: 'Ação',
  [TipoAtivo.ETF]: 'ETF',
  [TipoAtivo.FII]: 'FII',
  [TipoAtivo.Cripto]: 'Cripto',
  [TipoAtivo.RF]: 'Renda Fixa',
}

export const getTipoAtivoLabel = (tipo: TipoAtivo): string => {
  return tipoAtivoLabels[tipo] || tipo
}
