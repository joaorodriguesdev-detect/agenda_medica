"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Space_Grotesk, Inter, IBM_Plex_Mono } from "next/font/google";
import Sidebar from "./components/Sidebar";
import CalendarView from "./components/CalendarView";
import TabulatorView from "./components/TabulatorView";
import "react-tabulator/lib/styles.css";
import "react-tabulator/lib/css/bootstrap/tabulator_bootstrap.min.css";

const display = Space_Grotesk({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-display" });
const body = Inter({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-body" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["500"], variable: "--font-mono" });

export default function Home() {
  const [agendamentos, setAgendamentos] = useState<any[]>([]);
  const [erroApi, setErroApi] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [visao, setVisao] = useState("tabela");
  const [buscaGlobal, setBuscaGlobal] = useState("");
  const router = useRouter();

  useEffect(() => {
    const carregarAgendamentos = async () => {
      setCarregando(true);
      try {
        const res = await fetch("http://localhost:5000/api/agendamentos", { credentials: "include" });
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

  // Função nova para receber os dados do modal e atualizar a tabela
  const adicionarAgendamento = (novoAgendamento: any) => {
    // Adiciona o novo no topo da lista
    setAgendamentos(prev => [novoAgendamento, ...prev]);
    // Muda a visão para a tabela para o usuário ver a mágica acontecer
    setVisao("tabela"); 
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

      {/* Passando a função nova para a Sidebar */}
      <Sidebar setBuscaGlobal={setBuscaGlobal} adicionarAgendamento={adicionarAgendamento} />

      <div className="flex-1 flex flex-col overflow-hidden relative">
        <header className="h-[76px] bg-white border-b border-[#E7E9EC] flex items-center justify-between px-8 z-10">
          <div className="flex bg-[#F1F2F4] p-1 rounded-lg border border-[#E7E9EC]">
            <button onClick={() => setVisao('calendario')} className={`px-5 py-1.5 text-sm font-semibold rounded-md transition-all ${visao === 'calendario' ? 'bg-white shadow-sm text-[#0FA0EE]' : 'text-[#5B6472] hover:text-[#1C2530]'}`}>Visualização de Calendário</button>
            <button onClick={() => setVisao('tabela')} className={`px-5 py-1.5 text-sm font-semibold rounded-md transition-all ${visao === 'tabela' ? 'bg-white shadow-sm text-[#0FA0EE]' : 'text-[#5B6472] hover:text-[#1C2530]'}`}>Lista Tabulator (Oficial)</button>
          </div>
          
          <button onClick={async () => { await fetch("http://localhost:5000/api/logout", { method: "POST" }); router.push("/login"); }} className="text-sm font-medium text-[#5B6472] hover:text-[#A23B2F] transition-colors">Encerrar Sessão</button>
        </header>

        <main className="flex-1 overflow-auto bg-[#F6F7F9]">
        {visao === 'calendario' ? (
            <CalendarView agendamentos={agendamentos} />
          ) : (
            <TabulatorView agendamentos={agendamentos} carregando={carregando} erroApi={erroApi} buscaGlobal={buscaGlobal} />
          )}
        </main>
      </div>
    </div>
  );
}