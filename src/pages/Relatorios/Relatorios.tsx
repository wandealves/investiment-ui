import { FileText, Download } from 'lucide-react'
import PageHeader from '@/components/common/PageHeader'
import { Button } from '@/components/ui/button'

const Relatorios = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Relatórios"
        description="Visualize e exporte relatórios dos seus investimentos"
      />

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="rounded-full bg-primary/10 p-3">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold">Rentabilidade por Carteira</h3>
          </div>
          <p className="text-muted-foreground mb-4">
            Veja a rentabilidade de cada carteira no período selecionado
          </p>
          <Button variant="outline" className="w-full">
            <Download className="h-4 w-4 mr-2" />
            Exportar CSV
          </Button>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="rounded-full bg-primary/10 p-3">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold">Rentabilidade por Ativo</h3>
          </div>
          <p className="text-muted-foreground mb-4">
            Análise detalhada da rentabilidade de cada ativo
          </p>
          <Button variant="outline" className="w-full">
            <Download className="h-4 w-4 mr-2" />
            Exportar CSV
          </Button>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="rounded-full bg-primary/10 p-3">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold">Movimentações</h3>
          </div>
          <p className="text-muted-foreground mb-4">
            Histórico completo de todas as movimentações
          </p>
          <Button variant="outline" className="w-full">
            <Download className="h-4 w-4 mr-2" />
            Exportar CSV
          </Button>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="rounded-full bg-primary/10 p-3">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold">Consolidado</h3>
          </div>
          <p className="text-muted-foreground mb-4">
            Relatório consolidado de todos os seus investimentos
          </p>
          <Button variant="outline" className="w-full">
            <Download className="h-4 w-4 mr-2" />
            Exportar CSV
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Relatorios
