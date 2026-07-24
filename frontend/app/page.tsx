"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { ReactTabulator } from "react-tabulator";
import { Space_Grotesk, Inter, IBM_Plex_Mono } from "next/font/google";
import "react-tabulator/lib/styles.css";
import "react-tabulator/lib/css/bootstrap/tabulator_bootstrap.min.css";

const display = Space_Grotesk({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-display" });
const body = Inter({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-body" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["500"], variable: "--font-mono" });

const STATUS_STYLES: Record<string, { bg: string; fg: string; dot: string }> = {
  confirmado: { bg: "#EAF6EF", fg: "#1E7A50", dot: "#2E9E6D" },
  pendente: { bg: "#FBF2E3", fg: "#8A6412", dot: "#C9992F" },
  cancelado: { bg: "#FBECEA", fg: "#A23B2F", dot: "#C0463C" },
  concluido: { bg: "#EAF0F8", fg: "#234875", dot: "#3B6EA5" },
};

function statusStyle(raw: string) {
  const key = (raw || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  return STATUS_STYLES[key] || { bg: "#F1F2F4", fg: "#5B6472", dot: "#9AA1AC" };
}

const Icons = {
  Menu: () => <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
  Calendar: () => <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  Heart: () => <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  Chart: () => <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="18" y="3" width="4" height="18"/><rect x="10" y="8" width="4" height="13"/><rect x="2" y="13" width="4" height="8"/></svg>,
  Settings: () => <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
};

export default function Home() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [erroApi, setErroApi] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [visao, setVisao] = useState("calendario");
  const tableRef = useRef<any>(null);
  const router = useRouter();

  useEffect(() => {
    const carregarAgendamentos = async () => {
      setCarregando(true);
      try {
        const res = await fetch("http://localhost:5000/api/agendamentos", {
          credentials: "include",
        });

        if (res.status === 401) {
          router.push("/login");
          return;
        }

        const data = await res.json();
        if (data.status === "error") setErroApi(data.message);
        setAgendamentos(data.data || []);
      } catch (err) {
        setErroApi("Não foi possível conectar à API de agendamentos. Verifique sua conexão.");
      } finally {
        setCarregando(false);
      }
    };
    carregarAgendamentos();
  }, [router]);

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
        return `<span style="display:inline-flex;align-items:center;gap:6px;padding:4px 10px;border-radius:999px;font-size:12px;font-weight:600;background:${s.bg};color:${s.fg};font-family:${body.style.fontFamily};"><span style="width:6px;height:6px;border-radius:999px;background:${s.dot};display:inline-block;"></span>${value}</span>`;
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
    <div className={`${display.variable} ${body.variable} ${mono.variable} flex h-screen bg-[#F6F7F9] font-body text-black`}>
      <style jsx global>{`
        .col-mono .tabulator-cell { font-family: var(--font-mono) !important; font-variant-numeric: tabular-nums; font-size: 13px; color: #33404f; }
        .tabulator { border: none !important; font-family: var(--font-body); background: transparent !important; }
        .tabulator .tabulator-header { background: #16324F !important; border-bottom: none !important; }
        .tabulator .tabulator-header .tabulator-col { background: #16324F !important; border-right: 1px solid rgba(255,255,255,0.08) !important; }
        .tabulator .tabulator-col-title { color: #EDF1F5 !important; font-weight: 600; font-size: 12.5px; text-transform: uppercase; }
        .tabulator-row { background: #ffffff !important; border-bottom: 1px solid #ECEEF1 !important; }
        .tabulator-row:hover { background: #F3F6FA !important; }
        .tabulator-row .tabulator-cell { font-size: 13.5px; padding: 10px 8px; }
      `}</style>

      <div className="flex h-full flex-shrink-0 shadow-[4px_0_24px_rgba(0,0,0,0.04)] z-20">
        <div className="w-[70px] bg-[#0FA0EE] flex flex-col items-center py-6 gap-8 text-white relative">
          <button className="hover:opacity-80 transition-opacity"><Icons.Menu /></button>
          <button className="bg-white/20 p-2.5 rounded-xl hover:bg-white/30 transition-colors"><Icons.Calendar /></button>
          <button className="hover:opacity-80 transition-opacity"><Icons.Heart /></button>
          <button className="hover:opacity-80 transition-opacity"><Icons.Chart /></button>
          <button className="hover:opacity-80 transition-opacity"><Icons.Settings /></button>
          <div className="absolute bottom-6 w-10 h-10 bg-white/30 rounded-full flex items-center justify-center font-bold text-sm">TS</div>
        </div>

        <div className="w-[260px] bg-white border-r border-[#E7E9EC] flex flex-col">
          <div className="p-5 flex items-center justify-between border-b border-[#F1F2F4]">
            <div className="flex items-center gap-2 text-[#0FA0EE]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
              <span className="text-xl font-bold tracking-tight">Time Save Agendamentos</span>
            </div>
            <button className="bg-[#44B2F1] text-white text-[10px] font-bold px-3 py-1.5 rounded-full hover:bg-[#0FA0EE] transition-colors">ADICIONAR ⊕</button>
          </div>

          <div className="p-5 border-b border-[#F1F2F4]">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold text-[#1C2530] uppercase">Setembro</span>
              <span className="text-xs font-bold text-[#1C2530]">2026</span>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-semibold text-[#8A93A0] mb-2">
              <div>D</div><div>S</div><div>T</div><div>Q</div><div>Q</div><div>S</div><div>S</div>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-xs text-[#5B6472]">
              <div className="text-transparent">1</div><div className="text-transparent">2</div><div>1</div><div>2</div><div>3</div><div>4</div><div>5</div>
              <div>6</div><div>7</div><div>8</div><div className="bg-[#0FA0EE] text-white rounded font-bold shadow-sm">9</div><div>10</div><div>11</div><div>12</div>
              <div>13</div><div>14</div><div>15</div><div>16</div><div>17</div><div>18</div><div>19</div>
            </div>
          </div>

          <div className="p-5 flex-1 overflow-y-auto">
            <div className="mb-6">
              <div className="flex items-center gap-2 text-xs font-bold text-[#5B6472] mb-3">
                <span className="text-[#8A93A0]">⌄</span> CLÍNICO GERAL
              </div>
              <div className="h-2.5 bg-[#E7E9EC] w-[80%] rounded-full mb-2"></div>
              <div className="h-2.5 bg-[#E7E9EC] w-[60%] rounded-full"></div>
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#5B6472] mb-3">
                <span className="text-[#8A93A0]">⌄</span> DERMATOLOGISTA
              </div>
              <div className="h-2.5 bg-[#E7E9EC] w-[70%] rounded-full mb-2"></div>
              <div className="h-2.5 bg-[#E7E9EC] w-[50%] rounded-full mb-2"></div>
              <div className="h-2.5 bg-[#E7E9EC] w-[85%] rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden relative">
        <header className="h-[76px] bg-white border-b border-[#E7E9EC] flex items-center justify-between px-8 z-10">
          <div className="flex bg-[#F1F2F4] p-1 rounded-lg border border-[#E7E9EC]">
            <button 
              onClick={() => setVisao('calendario')} 
              className={`px-5 py-1.5 text-sm font-semibold rounded-md transition-all ${visao === 'calendario' ? 'bg-white shadow-sm text-[#0FA0EE]' : 'text-[#5B6472] hover:text-[#1C2530]'}`}
            >
              Visualização de Calendário
            </button>
            <button 
              onClick={() => setVisao('tabela')} 
              className={`px-5 py-1.5 text-sm font-semibold rounded-md transition-all ${visao === 'tabela' ? 'bg-white shadow-sm text-[#0FA0EE]' : 'text-[#5B6472] hover:text-[#1C2530]'}`}
            >
              Lista Tabulator (Oficial)
            </button>
          </div>
          
          <button
            onClick={async () => {
              await fetch("http://localhost:5000/api/logout", { method: "POST", credentials: "include" });
              router.push("/login");
            }}
            className="text-sm font-medium text-[#5B6472] hover:text-[#A23B2F] transition-colors"
          >
            Encerrar Sessão
          </button>
        </header>

        <main className="flex-1 overflow-auto bg-[#F6F7F9]">
          
          {visao === 'calendario' ? (
            <div className="h-full flex flex-col min-w-[800px]">
              <div className="grid grid-cols-4 border-b border-[#E7E9EC] bg-white sticky top-0 z-10">
                {[28, 29, 30, 31].map((dia) => (
                  <div key={dia} className="py-4 px-6 border-r border-[#E7E9EC] last:border-0">
                    <span className="text-2xl font-bold text-[#1C2530]">{dia}</span>
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-4 flex-1">
                <div className="border-r border-[#E7E9EC] relative p-3">
                  <div className="absolute top-[80px] w-[calc(100%-24px)] bg-[#359CFB] text-white p-3 rounded-md shadow-sm">
                    <div className="h-2 w-8 bg-white/30 rounded-full mb-3"></div>
                    <div className="h-2 w-20 bg-white/30 rounded-full"></div>
                  </div>
                  <div className="absolute top-[320px] w-[calc(100%-24px)] bg-[#359CFB] text-white p-3 rounded-md shadow-sm">
                    <div className="flex gap-2 mb-3">
                      <div className="h-2 w-8 bg-white/30 rounded-full"></div>
                      <div className="h-2 w-8 bg-white/30 rounded-full"></div>
                    </div>
                  </div>
                </div>

                <div className="border-r border-[#E7E9EC] relative p-3">
                  <div className="absolute top-[40px] w-[calc(100%-24px)] bg-[#FCB80F] text-white p-3 rounded-md shadow-sm h-[80px]">
                    <div className="h-2 w-16 bg-white/40 rounded-full mb-3"></div>
                    <div className="h-2 w-24 bg-white/40 rounded-full"></div>
                  </div>
                  <div className="absolute top-[220px] w-[calc(100%-24px)] bg-[#FF7E78] text-white p-3 rounded-md shadow-sm h-[120px]">
                    <div className="h-2 w-12 bg-white/50 rounded-full mb-4"></div>
                    <div className="h-2 w-20 bg-white/50 rounded-full mb-4"></div>
                    <div className="h-2 w-16 bg-white/50 rounded-full"></div>
                  </div>
                </div>

                <div className="border-r border-[#E7E9EC] relative p-3">
                  <div className="absolute top-[320px] w-[calc(100%-24px)] bg-[#7C8CD6] text-white p-3 rounded-md shadow-sm h-[120px]">
                    <div className="h-2 w-24 bg-white/40 rounded-full mb-4"></div>
                    <div className="h-2 w-12 bg-white/40 rounded-full"></div>
                  </div>
                </div>

                <div className="relative p-3">
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 max-w-7xl mx-auto">
              {erroApi && (
                <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 shadow-sm border border-red-100">{erroApi}</div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
                <input type="text" placeholder="Buscar por paciente" onChange={(e) => handleFiltro(e, "paciente")} className="w-full border border-[#E3E6EB] bg-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0FA0EE]" />
                <input type="text" placeholder="Buscar por CPF" onChange={(e) => handleFiltro(e, "cpf")} className="w-full border border-[#E3E6EB] bg-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0FA0EE]" />
                <input type="text" placeholder="Buscar por médico" onChange={(e) => handleFiltro(e, "medico")} className="w-full border border-[#E3E6EB] bg-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0FA0EE]" />
              </div>

              <div className="border border-[#E7E9EC] rounded-2xl shadow-sm overflow-hidden bg-white">
                {carregando ? (
                  <div className="p-14 text-center text-[#8A93A0] text-sm">Carregando agendamentos…</div>
                ) : (
                  <ReactTabulator onRef={(ref) => (tableRef.current = ref.current)} data={agendamentos} columns={columns} layout={"fitColumns"} options={{ placeholder: "Nenhum agendamento encontrado." }} />
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}