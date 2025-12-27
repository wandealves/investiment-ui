import { useState } from 'react'
import { Calculator, TrendingUp, DollarSign, Receipt } from 'lucide-react'
import { useCalcularIR, useHistoricoCalculosIR } from '@/features/impostoderenda/hooks/useImpostoRenda'
import { useAnosLookup } from '@/hooks/useLookups'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { CardContainer, CardBody, CardItem } from '@/components/aceternity'
import PageHeader from '@/components/common/PageHeader'
import LoadingSpinner from '@/components/common/LoadingSpinner'
import { GridBackground } from '@/components/aceternity'

const ImpostoRenda = () => {
  const [anoSelecionado, setAnoSelecionado] = useState<number | null>(new Date().getFullYear())

  const { data: historico, isLoading } = useHistoricoCalculosIR()
  const { data: anosData, isLoading: isLoadingAnos } = useAnosLookup()
  const calcularMutation = useCalcularIR()

  const handleCalcular = () => {
    calcularMutation.mutate({ ano: anoSelecionado })
  }

  const calculoAtual = historico?.find((c) => c.ano === anoSelecionado)

  const anos = anosData || []

  if (isLoading) {
    return <LoadingSpinner />
  }

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
    <div className="relative min-h-screen">
      {/* Grid Background */}
      <GridBackground className="absolute inset-0 -z-10" />

      <div className="relative z-10 space-y-6">
        <PageHeader
          title="Imposto de Renda"
          description="Cálculo de IR sobre ganho de capital e rateio de taxas"
        />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium text-foreground">Ano:</label>
          <Select
            value={anoSelecionado?.toString() ?? '0'}
            onChange={(e) => {
              const value = parseInt(e.target.value)
              setAnoSelecionado(value === 0 ? null : value)
            }}
            disabled={isLoadingAnos}
            className="w-48"
          >
            {anos.map((item) => (
              <option key={item.ano} value={item.ano}>
                {item.ano === 0 ? 'Todos os anos' : item.ano}
              </option>
            ))}
          </Select>
        </div>

        <Button
          onClick={handleCalcular}
          disabled={calcularMutation.isPending}
          isLoading={calcularMutation.isPending}
        >
          <Calculator className="w-4 h-4 mr-2" />
          {calculoAtual ? 'Recalcular IR' : 'Calcular IR'}
        </Button>
      </div>

      {calculoAtual && (
        <div className="space-y-6">
          <div className="text-sm text-muted-foreground">
            Último cálculo: {new Date(calculoAtual.dataCalculo).toLocaleString('pt-BR')}
          </div>

          {/* Totalizadores */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in">
            {/* Total Investido */}
            <CardContainer className="inter-var">
              <CardBody className="group relative rounded-lg border bg-card p-6 shadow-sm transition-all duration-300 overflow-hidden hover:shadow-2xl hover:shadow-primary/20 hover:border-primary/50">
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: 'linear-gradient(120deg, transparent 0%, hsl(var(--primary) / 0.05) 50%, transparent 100%)',
                    backgroundSize: '200% 100%',
                    animation: 'shimmer 3s ease-in-out infinite',
                  }}
                />
                <div className="relative flex items-center justify-between">
                  <div className="flex-1">
                    <CardItem as="p" translateZ="50" className="text-sm font-medium text-muted-foreground">
                      Total Investido
                    </CardItem>
                    <CardItem as="h3" translateZ="60" className="text-2xl font-bold font-mono mt-2">
                      {formatCurrency(calculoAtual.valorTotalInvestido)}
                    </CardItem>
                  </div>
                  <CardItem translateZ="80" className="rounded-full bg-primary/10 p-3 group-hover:bg-primary/20 transition-all duration-300">
                    <DollarSign className="h-6 w-6 text-primary" />
                  </CardItem>
                </div>
              </CardBody>
            </CardContainer>

            {/* Ganho de Capital */}
            <CardContainer className="inter-var">
              <CardBody className="group relative rounded-lg border bg-card p-6 shadow-sm transition-all duration-300 overflow-hidden hover:shadow-2xl hover:shadow-success/20 hover:border-success/50">
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: 'linear-gradient(120deg, transparent 0%, hsl(var(--success) / 0.05) 50%, transparent 100%)',
                    backgroundSize: '200% 100%',
                    animation: 'shimmer 3s ease-in-out infinite',
                  }}
                />
                <div className="relative flex items-center justify-between">
                  <div className="flex-1">
                    <CardItem as="p" translateZ="50" className="text-sm font-medium text-muted-foreground">
                      Ganho de Capital
                    </CardItem>
                    <CardItem as="h3" translateZ="60" className="text-2xl font-bold font-mono mt-2 text-success">
                      {formatCurrency(calculoAtual.totalGanhoCapital)}
                    </CardItem>
                  </div>
                  <CardItem translateZ="80" className="rounded-full bg-success/10 p-3 group-hover:bg-success/20 transition-all duration-300">
                    <TrendingUp className="h-6 w-6 text-success" />
                  </CardItem>
                </div>
              </CardBody>
            </CardContainer>

            {/* IR Devido */}
            <CardContainer className="inter-var">
              <CardBody className="group relative rounded-lg border bg-card p-6 shadow-sm transition-all duration-300 overflow-hidden hover:shadow-2xl hover:shadow-destructive/20 hover:border-destructive/50">
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: 'linear-gradient(120deg, transparent 0%, hsl(var(--destructive) / 0.05) 50%, transparent 100%)',
                    backgroundSize: '200% 100%',
                    animation: 'shimmer 3s ease-in-out infinite',
                  }}
                />
                <div className="relative flex items-center justify-between">
                  <div className="flex-1">
                    <CardItem as="p" translateZ="50" className="text-sm font-medium text-muted-foreground">
                      IR Devido
                    </CardItem>
                    <CardItem as="h3" translateZ="60" className="text-2xl font-bold font-mono mt-2 text-destructive">
                      {formatCurrency(calculoAtual.totalIRDevido)}
                    </CardItem>
                  </div>
                  <CardItem translateZ="80" className="rounded-full bg-destructive/10 p-3 group-hover:bg-destructive/20 transition-all duration-300">
                    <Receipt className="h-6 w-6 text-destructive" />
                  </CardItem>
                </div>
              </CardBody>
            </CardContainer>
          </div>

          {/* Tabela de Itens */}
          <div className="rounded-lg border bg-card shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-muted/50 border-b">
                    <th className="p-4 text-left text-sm font-semibold text-foreground">Ativo</th>
                    <th className="p-4 text-right text-sm font-semibold text-foreground">Quantidade</th>
                    <th className="p-4 text-right text-sm font-semibold text-foreground">Total Investido</th>
                    <th className="p-4 text-right text-sm font-semibold text-foreground">Preço Médio</th>
                    <th className="p-4 text-right text-sm font-semibold text-foreground">Preço Atual</th>
                    <th className="p-4 text-right text-sm font-semibold text-foreground">Rendimento</th>
                    <th className="p-4 text-right text-sm font-semibold text-foreground">Taxas Rateadas</th>
                    <th className="p-4 text-right text-sm font-semibold text-foreground">IR Devido</th>
                  </tr>
                </thead>
                <tbody>
                  {calculoAtual.itens.map((item) => (
                    <tr key={item.ativoId} className="border-b last:border-0 hover:bg-muted/30 transition-colors duration-200">
                      <td className="p-4">
                        <div>
                          <p className="font-medium text-foreground">{item.ativoCodigo}</p>
                          <p className="text-sm text-muted-foreground">{item.ativoNome}</p>
                        </div>
                      </td>
                      <td className="p-4 text-right font-mono text-sm">{formatNumber(item.quantidade)}</td>
                      <td className="p-4 text-right font-mono text-sm">{formatCurrency(item.totalInvestido)}</td>
                      <td className="p-4 text-right font-mono text-sm">{formatCurrency(item.precoMedio)}</td>
                      <td className="p-4 text-right font-mono text-sm">
                        {item.precoAtual ? formatCurrency(item.precoAtual) : '-'}
                      </td>
                      <td className="p-4 text-right font-mono text-sm">
                        {item.rendimento !== null && item.rendimento !== undefined ? (
                          <span className={Number(item.rendimento) >= 0 ? 'text-success font-medium' : 'text-destructive font-medium'}>
                            {formatCurrency(item.rendimento)}
                          </span>
                        ) : (
                          '-'
                        )}
                      </td>
                      <td className="p-4 text-right font-mono text-sm">{formatCurrency(item.taxasRateadas)}</td>
                      <td className="p-4 text-right font-mono text-sm font-medium text-destructive">
                        {formatCurrency(item.irDevido)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {!calculoAtual && !isLoading && (
        <div className="text-center py-12 text-muted-foreground">
          Nenhum cálculo disponível. Clique em "Calcular IR" para gerar.
        </div>
      )}
      </div>
    </div>
  )
}

export default ImpostoRenda
