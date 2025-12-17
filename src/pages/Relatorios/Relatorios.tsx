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
        <div className="group relative rounded-lg border bg-card p-6 overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary/50 animate-fade-in">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="rounded-full bg-primary/10 p-3 group-hover:bg-primary/15 transition-colors duration-300 group-hover:scale-110 transform">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold group-hover:text-primary transition-colors duration-300">
                Rentabilidade por Carteira
              </h3>
            </div>
            <p className="text-muted-foreground mb-4">
              Veja a rentabilidade de cada carteira no período selecionado
            </p>
            <Button variant="outline" className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Exportar CSV
            </Button>
          </div>
        </div>

        <div className="group relative rounded-lg border bg-card p-6 overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary/50 animate-fade-in" style={{ animationDelay: '100ms' }}>
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="rounded-full bg-primary/10 p-3 group-hover:bg-primary/15 transition-colors duration-300 group-hover:scale-110 transform">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold group-hover:text-primary transition-colors duration-300">
                Rentabilidade por Ativo
              </h3>
            </div>
            <p className="text-muted-foreground mb-4">
              Análise detalhada da rentabilidade de cada ativo
            </p>
            <Button variant="outline" className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Exportar CSV
            </Button>
          </div>
        </div>

        <div className="group relative rounded-lg border bg-card p-6 overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary/50 animate-fade-in" style={{ animationDelay: '200ms' }}>
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="rounded-full bg-primary/10 p-3 group-hover:bg-primary/15 transition-colors duration-300 group-hover:scale-110 transform">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold group-hover:text-primary transition-colors duration-300">
                Movimentações
              </h3>
            </div>
            <p className="text-muted-foreground mb-4">
              Histórico completo de todas as movimentações
            </p>
            <Button variant="outline" className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Exportar CSV
            </Button>
          </div>
        </div>

        <div className="group relative rounded-lg border bg-card p-6 overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary/50 animate-fade-in" style={{ animationDelay: '300ms' }}>
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="rounded-full bg-primary/10 p-3 group-hover:bg-primary/15 transition-colors duration-300 group-hover:scale-110 transform">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold group-hover:text-primary transition-colors duration-300">
                Consolidado
              </h3>
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
    </div>
  )
}

export default Relatorios
