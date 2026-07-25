"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; 

const Icons = {
  Menu: () => <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
  Calendar: () => <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  Heart: () => <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  Chart: () => <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="18" y="3" width="4" height="18"/><rect x="10" y="8" width="4" height="13"/><rect x="2" y="13" width="4" height="8"/></svg>,
  Settings: () => <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
  Search: () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  Plus: () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  Close: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  Users: () => <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>,
  LogOut: () => <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>,
  Medical: () => <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path><line x1="12" y1="11" x2="12" y2="17"></line><line x1="9" y1="14" x2="15" y2="14"></line></svg>,
};

interface SidebarProps {
  setBuscaGlobal: (valor: string) => void;
  adicionarAgendamento: (novo: any) => void;
  setVisao: (visao: string) => void;
}

export default function Sidebar({ setBuscaGlobal, adicionarAgendamento, setVisao }: SidebarProps) {
  const router = useRouter();
  const [menuAtivo, setMenuAtivo] = useState("calendar");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [menuMobileAberto, setMenuMobileAberto] = useState(false);

  const [paciente, setPaciente] = useState("");
  const [cpf, setCpf] = useState("");
  const [convenio, setConvenio] = useState("Particular");
  const [medicoEsp, setMedicoEsp] = useState("Dr. Roberto Alves - Clínico Geral");
  const [data, setData] = useState("");
  const [horario, setHorario] = useState("");

  const handleSalvar = () => {
    const partes = medicoEsp.split(" - ");
    const novoAgendamento = {
      paciente: paciente || "Paciente não informado",
      cpf: cpf || "000.000.000-00",
      convenio, medico: partes[0] || "", especialidade: partes[1] || "",
      data: data || "2026-09-30", horario: horario || "00:00", status: "Pendente" 
    };

    adicionarAgendamento(novoAgendamento);
    setMenuAtivo("calendar");
    setIsModalOpen(false);
    setPaciente(""); setCpf(""); setData(""); setHorario("");
  };

  const handleLogout = async () => {
    await fetch("http://localhost:5000/api/logout", { method: "POST" });
    router.push("/login");
  };

  const hoje = new Date();
  const mesAtual = hoje.getMonth();
  const anoAtual = hoje.getFullYear();
  const diaAtual = hoje.getDate();
  const nomesMeses = ["JANEIRO", "FEVEREIRO", "MARÇO", "ABRIL", "MAIO", "JUNHO", "JULHO", "AGOSTO", "SETEMBRO", "OUTUBRO", "NOVEMBRO", "DEZEMBRO"];
  const primeiroDiaDaSemana = new Date(anoAtual, mesAtual, 1).getDay();
  const ultimoDiaDoMes = new Date(anoAtual, mesAtual + 1, 0).getDate();

  const diasCalendario = [];
  for (let i = 0; i < primeiroDiaDaSemana; i++) diasCalendario.push(null);
  for (let i = 1; i <= ultimoDiaDoMes; i++) diasCalendario.push(i);

  const handleTrocarTela = (icone: string, tela: string) => {
    setMenuAtivo(icone);
    setVisao(tela);
    setMenuMobileAberto(false);
  };

  return (
    <>
      {menuMobileAberto && (
        <div 
          className="fixed inset-0 bg-black/40 z-30 md:hidden transition-opacity"
          onClick={() => setMenuMobileAberto(false)}
        />
      )}

      <div className="flex h-full flex-shrink-0 shadow-[4px_0_24px_rgba(0,0,0,0.04)] z-40 relative">
        
        {/* CONTAINER PRINCIPAL DA BARRA AZUL (Agora com h-full e flex col) */}
        <div className="w-[70px] bg-[#0FA0EE] flex flex-col items-center py-6 text-white relative z-50 h-full">
          
          {/* GRUPO SUPERIOR: Todos os botões de navegação */}
          <div className="flex flex-col items-center gap-6 w-full">
            <button 
              className="hover:opacity-80 transition-opacity p-2.5 md:pointer-events-none mb-2"
              onClick={() => setMenuMobileAberto(!menuMobileAberto)}
            >
              <Icons.Menu />
            </button>
            
            <button onClick={() => handleTrocarTela("calendar", "calendario")} className={`transition-all ${menuAtivo === "calendar" ? "bg-white/20 p-2.5 rounded-xl" : "hover:opacity-80 p-2.5"}`} title="Agenda"><Icons.Calendar /></button>
            <button onClick={() => handleTrocarTela("users", "pacientes")} className={`transition-all ${menuAtivo === "users" ? "bg-white/20 p-2.5 rounded-xl" : "hover:opacity-80 p-2.5"}`} title="Pacientes"><Icons.Users /></button>
            <button onClick={() => handleTrocarTela("medical", "medicos")} className={`transition-all ${menuAtivo === "medical" ? "bg-white/20 p-2.5 rounded-xl" : "hover:opacity-80 p-2.5"}`} title="Corpo Clínico"><Icons.Medical /></button>
            <button onClick={() => handleTrocarTela("heart", "planos")} className={`transition-all ${menuAtivo === "heart" ? "bg-white/20 p-2.5 rounded-xl" : "hover:opacity-80 p-2.5"}`} title="Planos"><Icons.Heart /></button>
            <button onClick={() => handleTrocarTela("chart", "dashboard")} className={`transition-all ${menuAtivo === "chart" ? "bg-white/20 p-2.5 rounded-xl" : "hover:opacity-80 p-2.5"}`} title="Dashboard"><Icons.Chart /></button>
          </div>
          
          {/* GRUPO INFERIOR: Configurações e Sair (Usa mt-auto para empurrar pro final) */}
          <div className="mt-auto flex flex-col items-center gap-4 w-full pt-6">
            <button onClick={() => handleTrocarTela("settings", "settings")} className={`transition-all ${menuAtivo === "settings" ? "bg-white/20 p-2.5 rounded-xl" : "hover:opacity-80 p-2.5"}`} title="Configurações">
              <Icons.Settings />
            </button>
            
            <button onClick={handleLogout} className="hover:bg-white/20 p-2.5 rounded-xl transition-all hover:text-[#FFD1D1]" title="Sair do Sistema">
              <Icons.LogOut />
            </button>
          </div>

        </div>

        {/* BARRA BRANCA COM BUSCA E CALENDÁRIO MENOR */}
        {menuAtivo === "calendar" && (
          <div className={`absolute left-[70px] md:relative md:left-0 top-0 h-full w-[280px] bg-white border-r border-[#E7E9EC] flex flex-col transition-transform duration-300 z-40 ${menuMobileAberto ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
            <div className="p-6 border-b border-[#F1F2F4] flex flex-col gap-4">
              <button onClick={() => setIsModalOpen(true)} className="w-full bg-[#0FA0EE] text-white text-sm font-semibold py-3 rounded-xl shadow-sm hover:bg-[#0c8bd0] hover:shadow-md transition-all flex items-center justify-center gap-2">
                <Icons.Plus /> Novo Agendamento
              </button>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8A93A0]"><Icons.Search /></span>
                <input type="text" placeholder="Buscar consultas..." onChange={(e) => setBuscaGlobal(e.target.value)} className="w-full bg-[#F6F7F9] border border-[#E7E9EC] text-sm rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0FA0EE] focus:bg-white transition-all placeholder:text-[#8A93A0] text-[#1C2530]" />
              </div>
            </div>

            <div className="p-6">
              <div className="flex justify-between items-center mb-5">
                <span className="text-xs font-bold text-[#1C2530] uppercase">{nomesMeses[mesAtual]}</span>
                <span className="text-xs font-bold text-[#1C2530]">{anoAtual}</span>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-[#8A93A0] mb-3">
                <div>D</div><div>S</div><div>T</div><div>Q</div><div>Q</div><div>S</div><div>S</div>
              </div>
              <div className="grid grid-cols-7 gap-y-2 gap-x-1 text-center text-xs font-medium text-[#5B6472]">
                {diasCalendario.map((dia, idx) => (
                  <div key={idx} className={dia === diaAtual ? "bg-[#0FA0EE] text-white rounded-lg py-1 font-bold shadow-sm" : dia === null ? "text-transparent" : "py-1 hover:bg-[#F1F2F4] rounded-lg cursor-pointer transition-colors"}>
                    {dia || "0"}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-all p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-[fadeIn_0.2s_ease-out] max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-[#E7E9EC] flex justify-between items-center bg-[#F9FAFB]">
              <h2 className="text-lg font-bold text-[#1C2530]">Novo Agendamento</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-[#8A93A0] hover:text-[#A23B2F] transition-colors p-1 rounded-lg hover:bg-red-50">
                <Icons.Close />
              </button>
            </div>
            
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="col-span-1 md:col-span-2">
                <label className="block text-xs font-bold text-[#5B6472] mb-1.5">Paciente</label>
                <input value={paciente} onChange={e => setPaciente(e.target.value)} type="text" className="w-full border border-[#E3E6EB] rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0FA0EE]/50 focus:border-[#0FA0EE]" placeholder="Nome completo do paciente" />
              </div>
              
              <div className="col-span-1">
                <label className="block text-xs font-bold text-[#5B6472] mb-1.5">CPF</label>
                <input value={cpf} onChange={e => setCpf(e.target.value)} type="text" className="w-full border border-[#E3E6EB] rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0FA0EE]/50 focus:border-[#0FA0EE]" placeholder="000.000.000-00" />
              </div>

              <div className="col-span-1">
                <label className="block text-xs font-bold text-[#5B6472] mb-1.5">Convênio</label>
                <select value={convenio} onChange={e => setConvenio(e.target.value)} className="w-full border border-[#E3E6EB] rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0FA0EE]/50 focus:border-[#0FA0EE] bg-white text-[#1C2530]">
                  <option>Particular</option>
                  <option>Unimed</option>
                  <option>Bradesco Saúde</option>
                  <option>SulAmérica</option>
                </select>
              </div>

              <div className="col-span-1 md:col-span-2">
                <label className="block text-xs font-bold text-[#5B6472] mb-1.5">Médico e Especialidade</label>
                <select value={medicoEsp} onChange={e => setMedicoEsp(e.target.value)} className="w-full border border-[#E3E6EB] rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0FA0EE]/50 focus:border-[#0FA0EE] bg-white text-[#1C2530]">
                  <option>Dr. Roberto Alves - Clínico Geral</option>
                  <option>Dra. Silvia - Cardiologia</option>
                  <option>Dra. Ana Souza - Dermatologia</option>
                </select>
              </div>

              <div className="col-span-1">
                <label className="block text-xs font-bold text-[#5B6472] mb-1.5">Data</label>
                <input value={data} onChange={e => setData(e.target.value)} type="date" className="w-full border border-[#E3E6EB] rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0FA0EE]/50 focus:border-[#0FA0EE] text-[#1C2530]" />
              </div>

              <div className="col-span-1">
                <label className="block text-xs font-bold text-[#5B6472] mb-1.5">Horário</label>
                <input value={horario} onChange={e => setHorario(e.target.value)} type="time" className="w-full border border-[#E3E6EB] rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0FA0EE]/50 focus:border-[#0FA0EE] text-[#1C2530]" />
              </div>
            </div>

            <div className="px-6 py-5 border-t border-[#E7E9EC] flex flex-col md:flex-row justify-end gap-3 bg-[#F9FAFB]">
              <button onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-sm font-semibold text-[#5B6472] hover:bg-[#E7E9EC] hover:text-[#1C2530] rounded-xl transition-colors">
                Cancelar
              </button>
              <button onClick={handleSalvar} className="px-5 py-2.5 text-sm font-semibold text-white bg-[#0FA0EE] hover:bg-[#0c8bd0] rounded-xl transition-colors shadow-sm hover:shadow-md">
                Salvar Agendamento
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}