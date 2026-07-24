"use client";

interface DashboardProps {
  agendamentos: any[];
}

export default function DashboardView({ agendamentos }: DashboardProps) {
  // 1. Cálculos de KPIs Rápidos
  const total = agendamentos.length;
  const confirmados = agendamentos.filter(a => a.status.toLowerCase().includes('confirmado')).length;
  const cancelados = agendamentos.filter(a => a.status.toLowerCase().includes('cancelado')).length;
  const concluidos = agendamentos.filter(a => a.status.toLowerCase().includes('concluído') || a.status.toLowerCase().includes('concluido')).length;
  const pendentes = agendamentos.filter(a => a.status.toLowerCase().includes('pendente')).length;

  // 2. Cálculo de Convênios mais usados
  const conveniosMap = agendamentos.reduce((acc: any, curr) => {
    const conv = curr.convenio || "Outros";
    acc[conv] = (acc[conv] || 0) + 1;
    return acc;
  }, {});
  
  // Transforma em array e ordena do maior pro menor
  const topConvenios = Object.keys(conveniosMap)
    .map(key => ({ nome: key, quantidade: conveniosMap[key] }))
    .sort((a, b) => b.quantidade - a.quantidade);

  return (
    <div className="p-8 max-w-7xl mx-auto h-full flex flex-col overflow-y-auto">
      <div className="mb-8">
        <h2 className="text-[28px] font-bold text-[#1C2530] tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
          Dashboard de Métricas
        </h2>
        <p className="text-[#5B6472] text-sm mt-1">Visão geral do desempenho da clínica baseada nos agendamentos reais.</p>
      </div>

      {/* Linha 1: KPIs Principais */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-[#E7E9EC] shadow-sm">
          <div className="text-sm font-bold text-[#8A93A0] uppercase mb-2">Total de Consultas</div>
          <div className="text-4xl font-black text-[#1C2530]">{total}</div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-[#E7E9EC] shadow-sm">
          <div className="text-sm font-bold text-[#1E7A50] uppercase mb-2">Confirmados</div>
          <div className="text-4xl font-black text-[#1C2530]">{confirmados}</div>
          <div className="mt-2 text-xs text-[#5B6472]">{(total > 0 ? (confirmados/total)*100 : 0).toFixed(0)}% do total</div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-[#E7E9EC] shadow-sm">
          <div className="text-sm font-bold text-[#8A6412] uppercase mb-2">Pendentes</div>
          <div className="text-4xl font-black text-[#1C2530]">{pendentes}</div>
          <div className="mt-2 text-xs text-[#5B6472]">Aguardando ação</div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-[#E7E9EC] shadow-sm">
          <div className="text-sm font-bold text-[#A23B2F] uppercase mb-2">Cancelados</div>
          <div className="text-4xl font-black text-[#1C2530]">{cancelados}</div>
          <div className="mt-2 text-xs text-[#5B6472]">Taxa de {(total > 0 ? (cancelados/total)*100 : 0).toFixed(0)}%</div>
        </div>
      </div>

      {/* Linha 2: Gráficos de Barra Customizados (Tailwind) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Painel de Status */}
        <div className="bg-white p-6 rounded-2xl border border-[#E7E9EC] shadow-sm">
          <h3 className="text-lg font-bold text-[#1C2530] mb-6">Funil de Atendimento</h3>
          <div className="flex flex-col gap-5">
            {[
              { label: "Confirmados", val: confirmados, color: "bg-[#1E7A50]" },
              { label: "Concluídos", val: concluidos, color: "bg-[#3B6EA5]" },
              { label: "Pendentes", val: pendentes, color: "bg-[#C9992F]" },
              { label: "Cancelados", val: cancelados, color: "bg-[#A23B2F]" }
            ].map((item, idx) => (
              <div key={idx}>
                <div className="flex justify-between text-sm font-semibold mb-1">
                  <span className="text-[#5B6472]">{item.label}</span>
                  <span className="text-[#1C2530]">{item.val}</span>
                </div>
                <div className="w-full bg-[#F1F2F4] rounded-full h-2.5">
                  <div className={`${item.color} h-2.5 rounded-full transition-all duration-1000`} style={{ width: `${total > 0 ? (item.val / total) * 100 : 0}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Painel de Convênios */}
        <div className="bg-white p-6 rounded-2xl border border-[#E7E9EC] shadow-sm">
          <h3 className="text-lg font-bold text-[#1C2530] mb-6">Convênios mais utilizados</h3>
          <div className="flex flex-col gap-4">
            {topConvenios.length === 0 ? (
              <div className="text-sm text-[#8A93A0]">Sem dados suficientes.</div>
            ) : (
              topConvenios.map((conv, idx) => (
                <div key={idx} className="flex items-center justify-between border-b border-[#F1F2F4] pb-3 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-[#0FA0EE]/10 text-[#0FA0EE] flex items-center justify-center font-bold text-xs">
                      {idx + 1}º
                    </div>
                    <span className="text-sm font-semibold text-[#1C2530]">{conv.nome}</span>
                  </div>
                  <span className="text-sm font-bold text-[#5B6472] bg-[#F6F7F9] px-3 py-1 rounded-lg">
                    {conv.quantidade} consultas
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}