import { ApiClient } from '../client'
import {
  RelatorioRentabilidadeDto,
  RelatorioMovimentacoesDto,
  ExportarCsvDto,
} from '@/types'

export const relatoriosEndpoints = {
  rentabilidade: (params: RelatorioRentabilidadeDto) =>
    ApiClient.get('/api/v1/relatorios/rentabilidade', { params }),

  movimentacoes: (params: RelatorioMovimentacoesDto) =>
    ApiClient.get('/api/v1/relatorios/movimentacoes', { params }),

  exportarCsv: (data: ExportarCsvDto) =>
    ApiClient.post('/api/v1/relatorios/exportar-csv', data, {
      responseType: 'blob',
    }),
}
