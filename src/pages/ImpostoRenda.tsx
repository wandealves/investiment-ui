import { useState } from 'react'
import { Calculator } from 'lucide-react'
import { useCalcularIR, useHistoricoCalculosIR } from '@/features/impostoderenda/hooks/useImpostoRenda'

const ImpostoRenda = () => {
  const [anoSelecionado, setAnoSelecionado] = useState<number | null>(new Date().getFullYear())

  const { data: historico, isLoading } = useHistoricoCalculosIR()
  const calcularMutation = useCalcularIR()

  const handleCalcular = () => {
    calcularMutation.mutate({ ano: anoSelecionado })
  }

  const calculoAtual = historico?.find((c) => c.ano === anoSelecionado)

  const anoAtual = new Date().getFullYear()
  const anos = Array.from({ length: 10 }, (_, i) => anoAtual - i)

  const formatCurrency = (value: number | null | undefined) => {
    if (value === null || value === undefined) return 'R$ 0,00'
    const numValue = typeof value === 'number' ? value : parseFloat(value.toString())
    if (isNaN(numValue)) return 'R$ 0,00'
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(numValue)
  }

  const formatNumber = (value: number | null | undefined, decimals: number = 2) => {
    if (value === null || value === undefined) return '0.00'
    const numValue = typeof value === 'number' ? value : parseFloat(value.toString())
    if (isNaN(numValue)) return '0.00'
    return numValue.toFixed(decimals)
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Imposto de Renda</h1>
        <p className="text-muted-foreground">Cálculo de IR sobre ganho de capital e rateio de taxas</p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Ano:</label>
          <select
            value={anoSelecionado?.toString() ?? 'todos'}
            onChange={(e) => setAnoSelecionado(e.target.value === 'todos' ? null : parseInt(e.target.value))}
            className="px-3 py-2 border rounded-md"
          >
            <option value="todos">Todos os anos</option>
            {anos.map((ano) => (
              <option key={ano} value={ano}>
                {ano}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleCalcular}
          disabled={calcularMutation.isPending}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50"
        >
          <Calculator className="w-4 h-4" />
          {calculoAtual ? 'Recalcular IR' : 'Calcular IR'}
        </button>
      </div>

      {isLoading && <div>Carregando...</div>}

      {calculoAtual && (
        <div className="space-y-6">
          <div className="text-sm text-muted-foreground">
            Último cálculo: {new Date(calculoAtual.dataCalculo).toLocaleString('pt-BR')}
          </div>

          {/* Totalizadores */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-card p-4 rounded-lg border">
              <p className="text-sm text-muted-foreground">Total Investido</p>
              <p className="text-2xl font-bold">{formatCurrency(calculoAtual.valorTotalInvestido)}</p>
            </div>
            <div className="bg-card p-4 rounded-lg border">
              <p className="text-sm text-muted-foreground">Ganho de Capital</p>
              <p className="text-2xl font-bold text-green-600">{formatCurrency(calculoAtual.totalGanhoCapital)}</p>
            </div>
            <div className="bg-card p-4 rounded-lg border">
              <p className="text-sm text-muted-foreground">IR Devido</p>
              <p className="text-2xl font-bold text-red-600">{formatCurrency(calculoAtual.totalIRDevido)}</p>
            </div>
          </div>

          {/* Tabela de Itens */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-muted">
                  <th className="p-3 text-left">Ativo</th>
                  <th className="p-3 text-right">Quantidade</th>
                  <th className="p-3 text-right">Total Investido</th>
                  <th className="p-3 text-right">Preço Médio</th>
                  <th className="p-3 text-right">Preço Atual</th>
                  <th className="p-3 text-right">Rendimento</th>
                  <th className="p-3 text-right">Taxas Rateadas</th>
                  <th className="p-3 text-right">IR Devido</th>
                </tr>
              </thead>
              <tbody>
                {calculoAtual.itens.map((item) => (
                  <tr key={item.ativoId} className="border-b hover:bg-muted/50">
                    <td className="p-3">
                      <div>
                        <p className="font-medium">{item.ativoCodigo}</p>
                        <p className="text-sm text-muted-foreground">{item.ativoNome}</p>
                      </div>
                    </td>
                    <td className="p-3 text-right">{formatNumber(item.quantidade)}</td>
                    <td className="p-3 text-right">{formatCurrency(item.totalInvestido)}</td>
                    <td className="p-3 text-right">{formatCurrency(item.precoMedio)}</td>
                    <td className="p-3 text-right">
                      {item.precoAtual ? formatCurrency(item.precoAtual) : '-'}
                    </td>
                    <td className="p-3 text-right">
                      {item.rendimento !== null && item.rendimento !== undefined ? (
                        <span className={Number(item.rendimento) >= 0 ? 'text-green-600' : 'text-red-600'}>
                          {formatCurrency(item.rendimento)}
                        </span>
                      ) : (
                        '-'
                      )}
                    </td>
                    <td className="p-3 text-right">{formatCurrency(item.taxasRateadas)}</td>
                    <td className="p-3 text-right font-medium text-red-600">
                      {formatCurrency(item.irDevido)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {!calculoAtual && !isLoading && (
        <div className="text-center py-12 text-muted-foreground">
          Nenhum cálculo disponível. Clique em "Calcular IR" para gerar.
        </div>
      )}
    </div>
  )
}

export default ImpostoRenda
