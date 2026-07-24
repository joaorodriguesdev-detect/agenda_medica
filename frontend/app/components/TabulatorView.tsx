"use client";
import { useRef } from "react";
import { ReactTabulator } from "react-tabulator";

const SearchIcon = () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>;

const STATUS_STYLES: Record<string, { bg: string; fg: string; dot: string }> = {
  confirmado: { bg: "#EAF6EF", fg: "#1E7A50", dot: "#2E9E6D" },
  pendente: { bg: "#FBF2E3", fg: "#8A6412", dot: "#C9992F" },
  cancelado: { bg: "#FBECEA", fg: "#A23B2F", dot: "#C0463C" },
  concluido: { bg: "#EAF0F8", fg: "#234875", dot: "#3B6EA5" },
};

function statusStyle(raw: string) {
  const key = (raw || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return STATUS_STYLES[key] || { bg: "#F1F2F4", fg: "#5B6472", dot: "#9AA1AC" };
}

export default function TabulatorView({ agendamentos, carregando, erroApi }: any) {
  const tableRef = useRef<any>(null);

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

  const handleFiltro = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    if (tableRef.current) {
      const val = e.target.value;
      if (val) tableRef.current.setFilter(field, "like", val);
      else tableRef.current.removeFilter(field, "like", "");
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {erroApi && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 shadow-sm border border-red-100">{erroApi}</div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {[
          { placeholder: "Buscar por paciente", field: "paciente" },
          { placeholder: "Buscar por CPF", field: "cpf" },
          { placeholder: "Buscar por médico", field: "medico" },
        ].map((input) => (
          <div key={input.field} className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8A93A0]"><SearchIcon /></span>
            <input type="text" placeholder={input.placeholder} onChange={(e) => handleFiltro(e, input.field)} className="w-full border border-[#E3E6EB] bg-white rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0FA0EE]" />
          </div>
        ))}
      </div>

      <div className="border border-[#E7E9EC] rounded-2xl shadow-sm overflow-hidden bg-white">
        {carregando ? (
          <div className="p-14 text-center text-[#8A93A0] text-sm">Carregando agendamentos…</div>
        ) : (
          <ReactTabulator onRef={(ref) => (tableRef.current = ref.current)} data={agendamentos} columns={columns} layout={"fitColumns"} options={{ placeholder: "Nenhum agendamento encontrado." }} />
        )}
      </div>
    </div>
  );
}