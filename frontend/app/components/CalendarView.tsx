"use client";

interface CalendarViewProps {
  agendamentos: any[];
}

// Mapeamento de cores dinâmicas para os cards baseadas no status
function getCardStyle(status: string) {
  const s = (status || "").toLowerCase();
  if (s.includes("confirmado") || s.includes("concluído")) {
    return "bg-[#359CFB] text-white"; // Azul
  } else if (s.includes("pendente")) {
    return "bg-[#FCB80F] text-white"; // Amarelo
  } else if (s.includes("cancelado")) {
    return "bg-[#FF7E78] text-white"; // Vermelho
  }
  return "bg-[#7C8CD6] text-white"; // Roxo padrão
}

export default function CalendarView({ agendamentos }: CalendarViewProps) {
  // Definimos os dias que aparecem nas colunas (28, 29, 30 e 31 de setembro de 2026)
  const diasDaVisao = ["2026-09-28", "2026-09-29", "2026-09-30", "2026-09-31"];
  const numerosDias = [28, 29, 30, 31];

  return (
    <div className="h-full flex flex-col min-w-[800px]">
      {/* Cabeçalho dos Dias */}
      <div className="grid grid-cols-4 border-b border-[#E7E9EC] bg-white sticky top-0 z-10">
        {numerosDias.map((dia) => (
          <div key={dia} className="py-4 px-6 border-r border-[#E7E9EC] last:border-0">
            <span className="text-2xl font-bold text-[#1C2530]">{dia}</span>
          </div>
        ))}
      </div>
      
      {/* Grid de Colunas de Agendamentos Reais */}
      <div className="grid grid-cols-4 flex-1">
        {diasDaVisao.map((dataStr, index) => {
          // Filtra os agendamentos reais que pertencem a esta data exata
          const agendamentosDoDia = agendamentos.filter(ag => ag.data === dataStr);

          return (
            <div key={dataStr} className="border-r border-[#E7E9EC] relative p-3 flex flex-col gap-3 overflow-y-auto">
              {agendamentosDoDia.length === 0 ? (
                <div className="text-xs text-[#8A93A0] text-center mt-10">Nenhum agendamento</div>
              ) : (
                agendamentosDoDia.map((ag, i) => (
                  <div 
                    key={i} 
                    className={`p-3 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer ${getCardStyle(ag.status)}`}
                  >
                    <div className="text-xs font-bold mb-1">{ag.horario} - {ag.paciente}</div>
                    <div className="text-[10px] opacity-90">{ag.especialidade} • {ag.convenio}</div>
                    <div className="mt-2 inline-block bg-white/20 px-2 py-0.5 rounded text-[10px] font-semibold">
                      {ag.status}
                    </div>
                  </div>
                ))
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}