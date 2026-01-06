import { useState } from "react";
import { BarChart3 } from "lucide-react";
import { useVisualizacaoIR } from "@/features/impostoderenda/hooks/useImpostoRenda";
import { useAnosLookup } from "@/hooks/useLookups";
import { Select } from "@/components/ui/select";
import CarteiraCombobox from "@/components/common/CarteiraCombobox";
import PageHeader from "@/components/common/PageHeader";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { GridBackground } from "@/components/aceternity";

const MESES = [
  { value: null, label: "Todos os meses" },
  { value: 1, label: "Janeiro" },
  { value: 2, label: "Fevereiro" },
  { value: 3, label: "Março" },
  { value: 4, label: "Abril" },
  { value: 5, label: "Maio" },
  { value: 6, label: "Junho" },
  { value: 7, label: "Julho" },
  { value: 8, label: "Agosto" },
  { value: 9, label: "Setembro" },
  { value: 10, label: "Outubro" },
  { value: 11, label: "Novembro" },
  { value: 12, label: "Dezembro" }
];

const ImpostoRendaVisualizacao = () => {
  const [anoSelecionado, setAnoSelecionado] = useState<number | null>(null);
  const [mesSelecionado, setMesSelecionado] = useState<number | null>(null);
  const [carteiraIdSelecionada, setCarteiraIdSelecionada] = useState<
    number | null
  >(null);

  const { data: anosData, isLoading: isLoadingAnos } = useAnosLookup();
  const {
    data: itens,
    isLoading,
    error
  } = useVisualizacaoIR(anoSelecionado, mesSelecionado, carteiraIdSelecionada);

  const anos = anosData || [];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL"
    }).format(value);
  };

  const formatNumber = (value: number, decimals: number = 2) => {
    return value.toFixed(decimals);
  };

  // Calcular totais gerais
  const totalGeral = itens?.reduce((acc, item) => acc + item.total, 0) || 0;
  const quantidadeGeral =
    itens?.reduce((acc, item) => acc + item.quantidadeTotal, 0) || 0;

  return (
    <div className="relative min-h-screen">
      <GridBackground className="absolute inset-0 -z-10" />

      <div className="relative z-10 space-y-6">
        <PageHeader
          title="Visualização de IR por Período"
          description="Visualize os ativos agrupados por mês, ano e carteira"
        />

        {/* FILTROS */}
        <div className="flex flex-wrap items-center gap-6 p-6 rounded-lg border bg-card shadow-sm">
          {/* Ano */}
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium text-foreground min-w-[50px]">
              Ano:
            </label>
            <Select
              value={anoSelecionado?.toString() ?? ""}
              onChange={e => {
                const value = e.target.value;
                setAnoSelecionado(value === "" ? null : parseInt(value));
              }}
              disabled={isLoadingAnos}
              className="w-48"
            >
              <option value="" disabled>
                Selecione um ano
              </option>
              {anos
                .filter(item => item.ano !== 0)
                .map(item => (
                  <option key={item.ano} value={item.ano}>
                    {item.ano}
                  </option>
                ))}
            </Select>
          </div>

          {/* Mês */}
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium text-foreground min-w-[50px]">
              Mês:
            </label>
            <Select
              value={mesSelecionado?.toString() ?? ""}
              onChange={e => {
                const value = e.target.value;
                setMesSelecionado(value === "" ? null : parseInt(value));
              }}
              className="w-56"
            >
              {MESES.map(mes => (
                <option key={mes.value ?? "todos"} value={mes.value ?? ""}>
                  {mes.label}
                </option>
              ))}
            </Select>
          </div>

          {/* Carteira */}
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium text-foreground min-w-[70px]">
              Carteira:
            </label>
            <div className="w-80">
              <CarteiraCombobox
                value={carteiraIdSelecionada}
                onChange={setCarteiraIdSelecionada}
                allowNull={false}
              />
            </div>
          </div>
        </div>

        {/* MENSAGEM DE AJUDA */}
        {(!anoSelecionado || !carteiraIdSelecionada) && (
          <div className="text-center py-12 text-muted-foreground">
            Selecione o ano e a carteira para visualizar os dados
          </div>
        )}

        {/* LOADING */}
        {isLoading && <LoadingSpinner />}

        {/* ERRO */}
        {error && (
          <div className="text-center py-12 text-destructive">
            Erro ao carregar dados: {(error as Error).message}
          </div>
        )}

        {/* CARDS DE TOTAIS */}
        {itens && itens.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Total Geral */}
              <div className="p-6 rounded-lg border bg-card shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Total Investido
                    </p>
                    <h3 className="text-2xl font-bold font-mono mt-2">
                      {formatCurrency(totalGeral)}
                    </h3>
                  </div>
                  <div className="rounded-full bg-primary/10 p-3">
                    <BarChart3 className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </div>

              {/* Quantidade Total */}
              <div className="p-6 rounded-lg border bg-card shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Quantidade Total
                    </p>
                    <h3 className="text-2xl font-bold font-mono mt-2">
                      {formatNumber(quantidadeGeral)}
                    </h3>
                  </div>
                  <div className="rounded-full bg-primary/10 p-3">
                    <BarChart3 className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </div>
            </div>

            {/* TABELA */}
            <div className="rounded-lg border bg-card shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-muted/50 border-b">
                      <th className="p-4 text-left text-sm font-semibold text-foreground">
                        Código
                      </th>
                      <th className="p-4 text-left text-sm font-semibold text-foreground">
                        Nome
                      </th>
                      <th className="p-4 text-left text-sm font-semibold text-foreground">
                        Tipo
                      </th>
                      <th className="p-4 text-right text-sm font-semibold text-foreground">
                        Quantidade
                      </th>
                      <th className="p-4 text-right text-sm font-semibold text-foreground">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {itens.map(item => (
                      <tr
                        key={item.ativoCodigo}
                        className="border-b last:border-0 hover:bg-muted/30 transition-colors"
                      >
                        <td className="p-4">
                          <span className="font-medium font-mono text-foreground">
                            {item.ativoCodigo}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className="text-sm text-foreground">
                            {item.ativoNome}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className="text-sm text-muted-foreground">
                            {item.ativoTipo}
                          </span>
                        </td>
                        <td className="p-4 text-right font-mono text-sm">
                          {formatNumber(item.quantidadeTotal)}
                        </td>
                        <td className="p-4 text-right font-mono text-sm">
                          {formatCurrency(item.total)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* VAZIO */}
        {itens && itens.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            Nenhum dado encontrado para os filtros selecionados
          </div>
        )}
      </div>
    </div>
  );
};

export default ImpostoRendaVisualizacao;
