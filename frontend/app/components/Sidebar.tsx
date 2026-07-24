"use client";
import { useState } from "react";

const Icons = {
  Menu: () => <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
  Calendar: () => <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  Heart: () => <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  Chart: () => <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="18" y="3" width="4" height="18"/><rect x="10" y="8" width="4" height="13"/><rect x="2" y="13" width="4" height="8"/></svg>,
  Settings: () => <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
  Search: () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  Plus: () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  Close: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
};

export default function Sidebar() {
  const [menuAtivo, setMenuAtivo] = useState("calendar");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSalvarFake = () => {
    alert("Agendamento simulado com sucesso!");
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex h-full flex-shrink-0 shadow-[4px_0_24px_rgba(0,0,0,0.04)] z-20">
        <div className="w-[70px] bg-[#0FA0EE] flex flex-col items-center py-6 gap-8 text-white relative">
          <button className="hover:opacity-80 transition-opacity p-2.5"><Icons.Menu /></button>
          <button onClick={() => setMenuAtivo("calendar")} className={`transition-all ${menuAtivo === "calendar" ? "bg-white/20 p-2.5 rounded-xl" : "hover:opacity-80 p-2.5"}`}><Icons.Calendar /></button>
          <button onClick={() => setMenuAtivo("heart")} className={`transition-all ${menuAtivo === "heart" ? "bg-white/20 p-2.5 rounded-xl" : "hover:opacity-80 p-2.5"}`}><Icons.Heart /></button>
          <button onClick={() => setMenuAtivo("chart")} className={`transition-all ${menuAtivo === "chart" ? "bg-white/20 p-2.5 rounded-xl" : "hover:opacity-80 p-2.5"}`}><Icons.Chart /></button>
          <button onClick={() => setMenuAtivo("settings")} className={`transition-all ${menuAtivo === "settings" ? "bg-white/20 p-2.5 rounded-xl" : "hover:opacity-80 p-2.5"}`}><Icons.Settings /></button>
          <div className="absolute bottom-6 w-10 h-10 bg-white/30 rounded-full flex items-center justify-center font-bold text-sm">TS</div>
        </div>

        <div className="w-[280px] bg-white border-r border-[#E7E9EC] flex flex-col">
          <div className="p-6 border-b border-[#F1F2F4] flex flex-col gap-4">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="w-full bg-[#0FA0EE] text-white text-sm font-semibold py-3 rounded-xl shadow-sm hover:bg-[#0c8bd0] hover:shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Icons.Plus />
              Novo Agendamento
            </button>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8A93A0]">
                <Icons.Search />
              </span>
              <input type="text" placeholder="Buscar consultas..." className="w-full bg-[#F6F7F9] border border-[#E7E9EC] text-sm rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0FA0EE] focus:bg-white transition-all placeholder:text-[#8A93A0] text-[#1C2530]"/>
            </div>
          </div>

          <div className="p-6">
            <div className="flex justify-between items-center mb-5">
              <span className="text-xs font-bold text-[#1C2530] uppercase">Setembro</span>
              <span className="text-xs font-bold text-[#1C2530]">2026</span>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-[#8A93A0] mb-3">
              <div>D</div><div>S</div><div>T</div><div>Q</div><div>Q</div><div>S</div><div>S</div>
            </div>
            <div className="grid grid-cols-7 gap-y-2 gap-x-1 text-center text-xs font-medium text-[#5B6472]">
              <div className="text-transparent">1</div><div className="text-transparent">2</div><div>1</div><div>2</div><div>3</div><div>4</div><div>5</div>
              <div>6</div><div>7</div><div>8</div><div className="bg-[#0FA0EE] text-white rounded-lg py-1 font-bold shadow-sm">9</div><div>10</div><div>11</div><div>12</div>
              <div>13</div><div>14</div><div>15</div><div>16</div><div>17</div><div>18</div><div>19</div>
            </div>
          </div>

          <div className="mt-auto p-6 border-t border-[#F1F2F4] bg-[#F9FAFB]">
            <div className="flex items-center gap-3 text-[#0FA0EE]">
              <div className="bg-[#0FA0EE]/10 p-2 rounded-xl">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
              </div>
              <div className="flex flex-col">
                <span className="text-[15px] font-extrabold tracking-tight text-[#1C2530] leading-tight">Time Save</span>
                <span className="text-[10px] font-bold tracking-wider text-[#8A93A0] uppercase">Agendamentos</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Novo Agendamento */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-all">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-[fadeIn_0.2s_ease-out]">
            {/* Header do Modal */}
            <div className="px-6 py-4 border-b border-[#E7E9EC] flex justify-between items-center bg-[#F9FAFB]">
              <h2 className="text-lg font-bold text-[#1C2530]">Novo Agendamento</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-[#8A93A0] hover:text-[#A23B2F] transition-colors p-1 rounded-lg hover:bg-red-50">
                <Icons.Close />
              </button>
            </div>
            
            {/* Corpo do Modal */}
            <div className="p-6 grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-xs font-bold text-[#5B6472] mb-1.5">Paciente</label>
                <input type="text" className="w-full border border-[#E3E6EB] rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0FA0EE]/50 focus:border-[#0FA0EE]" placeholder="Nome completo do paciente" />
              </div>
              
              <div className="col-span-2 md:col-span-1">
                <label className="block text-xs font-bold text-[#5B6472] mb-1.5">CPF</label>
                <input type="text" className="w-full border border-[#E3E6EB] rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0FA0EE]/50 focus:border-[#0FA0EE]" placeholder="000.000.000-00" />
              </div>

              <div className="col-span-2 md:col-span-1">
                <label className="block text-xs font-bold text-[#5B6472] mb-1.5">Convênio</label>
                <select className="w-full border border-[#E3E6EB] rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0FA0EE]/50 focus:border-[#0FA0EE] bg-white text-[#1C2530]">
                  <option>Particular</option>
                  <option>Unimed</option>
                  <option>Bradesco Saúde</option>
                  <option>SulAmérica</option>
                </select>
              </div>

              <div className="col-span-2">
                <label className="block text-xs font-bold text-[#5B6472] mb-1.5">Médico e Especialidade</label>
                <select className="w-full border border-[#E3E6EB] rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0FA0EE]/50 focus:border-[#0FA0EE] bg-white text-[#1C2530]">
                  <option>Selecione o profissional...</option>
                  <option>Dr. Roberto Alves - Clínico Geral</option>
                  <option>Dra. Silvia - Cardiologia</option>
                  <option>Dra. Ana Souza - Dermatologia</option>
                </select>
              </div>

              <div className="col-span-2 md:col-span-1">
                <label className="block text-xs font-bold text-[#5B6472] mb-1.5">Data</label>
                <input type="date" className="w-full border border-[#E3E6EB] rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0FA0EE]/50 focus:border-[#0FA0EE] text-[#1C2530]" />
              </div>

              <div className="col-span-2 md:col-span-1">
                <label className="block text-xs font-bold text-[#5B6472] mb-1.5">Horário</label>
                <input type="time" className="w-full border border-[#E3E6EB] rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0FA0EE]/50 focus:border-[#0FA0EE] text-[#1C2530]" />
              </div>
            </div>

            {/* Footer do Modal */}
            <div className="px-6 py-5 border-t border-[#E7E9EC] flex justify-end gap-3 bg-[#F9FAFB]">
              <button onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-sm font-semibold text-[#5B6472] hover:bg-[#E7E9EC] hover:text-[#1C2530] rounded-xl transition-colors">
                Cancelar
              </button>
              <button onClick={handleSalvarFake} className="px-5 py-2.5 text-sm font-semibold text-white bg-[#0FA0EE] hover:bg-[#0c8bd0] rounded-xl transition-colors shadow-sm hover:shadow-md">
                Salvar Agendamento
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}