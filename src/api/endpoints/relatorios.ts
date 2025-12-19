import { ApiClient } from '../client'
import {
  RelatorioRentabilidadeDto,
  RelatorioMovimentacoesDto,
  ExportarCsvDto,
} from '@/types'

export const relatoriosEndpoints = {
  rentabilidade: (params: RelatorioRentabilidadeDto) =>
    ApiClient.get('relatorios/rentabilidade', { params }),

  movimentacoes: (params: RelatorioMovimentacoesDto) =>
    ApiClient.get('relatorios/movimentacoes', { params }),

  exportarCsv: (data: ExportarCsvDto) =>
    ApiClient.post('relatorios/exportar-csv', data, {
      responseType: 'blob',
    }),
}
