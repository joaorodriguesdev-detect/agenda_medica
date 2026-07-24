"use client";
import { useEffect, useRef } from "react";
import { ReactTabulator } from "react-tabulator";

const SearchIcon = () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>;

const STATUS_STYLES: Record<string, { bg: string; fg: string; dot: string }> = {
  confirmado: { bg: "#EAF6EF", fg: "#1E7A50", dot: "#2E9E6D" },
  pendente: { bg: "#FBF2E3", fg: "#8A6412", dot: "#C9992F" },
  cancelado: { bg: "#FBECEA", fg: "#A23B2F", dot: "#C0463C" },
  concluído: { bg: "#EAF0F8", fg: "#234875", dot: "#3B6EA5" },
};

function statusStyle(raw: string) {
  const key = (raw || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return STATUS_STYLES[key] || { bg: "#F1F2F4", fg: "#5B6472", dot: "#9AA1AC" };
}

export default function TabulatorView({ agendamentos, carregando, erroApi, buscaGlobal }: any) {
  const tableRef = useRef<any>(null);

  // Escuta a barra de pesquisa global da Sidebar
  useEffect(() => {
    if (tableRef.current) {
      if (buscaGlobal && buscaGlobal.trim() !== "") {
        // Lógica OR: Permite consultar os dados de uma pessoa ou agendamento de forma flexível[cite: 1]
        tableRef.current.setFilter([
          [
            { field: "paciente", type: "like", value: buscaGlobal },
            { field: "cpf", type: "like", value: buscaGlobal },
            { field: "medico", type: "like", value: buscaGlobal }
          ]
        ]);
      } else {
        // Entradas vazias tratadas limpando o filtro sem gerar erro[cite: 1]
        tableRef.current.clearFilter();
      }
    }
  }, [buscaGlobal, agendamentos]);

  const columns = [
    { title: "Data", field: "data", hozAlign: "center" as const, width: 110, cssClass: "col-mono" },
    { title: "Horário", field: "horario", hozAlign: "center" as const, width: 90, cssClass: "col-mono" },
    { title: "Paciente", field: "paciente", minWidth: 160 },
    { title: "CPF", field: "cpf", hozAlign: "center" as const, width: 140, cssClass: "col-mono" },
    { title: "Médico", field: "medico", minWidth: 150 },
    { title: "Especialidade", field: "especialidade", minWidth: 140 },
    { title: "Convênio", field: "convenio", minWidth: 120 },
    {
      title: "Status",
      field: "status",
      hozAlign: "center" as const,
      width: 140,
      formatter: (cell: any) => {
        const value = cell.getValue() || "—";
        const s = statusStyle(value);
        return `<span style="display:inline-flex;align-items:center;gap:6px;padding:4px 10px;border-radius:999px;font-size:12px;font-weight:600;background:${s.bg};color:${s.fg};font-family:var(--font-body);"><span style="width:6px;height:6px;border-radius:999px;background:${s.dot};display:inline-block;"></span>${value}</span>`;
      },
    },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {erroApi && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 shadow-sm border border-red-100">{erroApi}</div>
      )}

      <div className="border border-[#E7E9EC] rounded-2xl shadow-sm overflow-hidden bg-white">
        {carregando ? (
          <div className="p-14 text-center text-[#8A93A0] text-sm">Carregando agendamentos…</div>
        ) : (
          <ReactTabulator 
            onRef={(ref) => (tableRef.current = ref.current)} 
            data={agendamentos} 
            columns={columns} 
            layout={"fitColumns"} 
            options={{ 
              // Informa adequadamente quando nenhum registro for encontrado[cite: 1]
              placeholder: "Nenhum registro encontrado para esta busca." 
            }} 
          />
        )}
      </div>
    </div>
  );
}