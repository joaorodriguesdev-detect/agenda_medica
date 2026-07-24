"use client";
import { useState, useEffect } from "react";

const CloseIcon = () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;

// Função auxiliar para mapear as cores baseado no status dinâmico do banco
function getStatusStyle(status: string) {
  if (status === "Ativo") return { bg: "bg-[#EAF6EF]", fg: "text-[#1E7A50]" };
  if (status === "Em Análise") return { bg: "bg-[#FBF2E3]", fg: "text-[#8A6412]" };
  if (status === "Inativo") return { bg: "bg-[#FBECEA]", fg: "text-[#A23B2F]" };
  return { bg: "bg-[#F1F2F4]", fg: "text-[#5B6472]" };
}

export default function PlanosView() {
  const [convenios, setConvenios] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [carregando, setCarregando] = useState(true);

  // Estados do formulário
  const [nomeForm, setNomeForm] = useState("");
  const [coberturaForm, setCoberturaForm] = useState("");
  const [statusForm, setStatusForm] = useState("Ativo");

  // Busca inicial dos dados na API real
  useEffect(() => {
    carregarConvenios();
  }, []);

  const carregarConvenios = async () => {
    setCarregando(true);
    try {
      const res = await fetch("http://localhost:5000/api/convenios", { credentials: "include" });
      const json = await res.json();
      if (json.status === "success") {
        setConvenios(json.data);
      }
    } catch (err) {
      console.error("Erro ao carregar convênios:", err);
    } finally {
      setCarregando(false);
    }
  };

  const handleSalvarConvenio = async () => {
    if (!nomeForm || !coberturaForm) {
      alert("Preencha o nome e a cobertura do plano.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/convenios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: nomeForm,
          cobertura: coberturaForm,
          status: statusForm
        }),
        credentials: "include"
      });

      const json = await res.json();
      if (json.status === "success") {
        // Atualiza a lista na tela imediatamente com o retorno do backend
        setConvenios(prev => [...prev, json.data]);
        
        // Limpa e fecha o modal
        setIsModalOpen(false);
        setNomeForm("");
        setCoberturaForm("");
        setStatusForm("Ativo");
      }
    } catch (err) {
      console.error("Erro ao salvar convênio:", err);
      alert("Erro ao conectar com a API.");
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto h-full flex flex-col relative">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-[28px] font-bold text-[#1C2530] tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
            Convênios Credenciados
          </h2>
          <p className="text-[#5B6472] text-sm mt-1">Gerencie os planos de saúde aceitos pela clínica.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#0FA0EE] text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-sm hover:bg-[#0c8bd0] hover:shadow-md transition-all"
        >
          + Adicionar Convênio
        </button>
      </div>

      {carregando ? (
        <div className="text-center text-[#8A93A0] text-sm py-20">Carregando planos de saúde...</div>
      ) : convenios.length === 0 ? (
        <div className="text-center text-[#8A93A0] text-sm py-20">Nenhum convênio cadastrado no sistema.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {convenios.map((conv, idx) => {
            const style = getStatusStyle(conv.status);
            return (
              <div key={idx} className="bg-white border border-[#E7E9EC] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 bg-[#F1F2F4] rounded-xl flex items-center justify-center text-[#1C2530] font-bold text-lg">
                    {conv.nome.charAt(0).toUpperCase()}
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[11px] font-bold ${style.bg} ${style.fg}`}>
                    {conv.status}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#1C2530] mb-1">{conv.nome}</h3>
                <p className="text-sm text-[#8A93A0] mb-4">Cobertura {conv.cobertura}</p>
                
                <div className="pt-4 border-t border-[#F1F2F4] flex justify-between items-center">
                  <span className="text-sm text-[#5B6472]"><strong className="text-[#1C2530]">{conv.pacientes}</strong> pacientes</span>
                  <button className="text-[#0FA0EE] text-sm font-semibold hover:underline">Configurar</button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal Real de Novo Convênio */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-all">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-[fadeIn_0.2s_ease-out]">
            <div className="px-6 py-4 border-b border-[#E7E9EC] flex justify-between items-center bg-[#F9FAFB]">
              <h2 className="text-lg font-bold text-[#1C2530]">Novo Convênio</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-[#8A93A0] hover:text-[#A23B2F] transition-colors p-1 rounded-lg hover:bg-red-50">
                <CloseIcon />
              </button>
            </div>
            
            <div className="p-6 flex flex-col gap-4">
              <div>
                <label className="block text-xs font-bold text-[#5B6472] mb-1.5">Nome do Convênio</label>
                <input 
                  value={nomeForm} 
                  onChange={(e) => setNomeForm(e.target.value)} 
                  type="text" 
                  className="w-full border border-[#E3E6EB] rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0FA0EE]/50 focus:border-[#0FA0EE]" 
                  placeholder="Ex: Unimed, Bradesco..." 
                />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-[#5B6472] mb-1.5">Área de Cobertura</label>
                <input 
                  value={coberturaForm} 
                  onChange={(e) => setCoberturaForm(e.target.value)} 
                  type="text" 
                  className="w-full border border-[#E3E6EB] rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0FA0EE]/50 focus:border-[#0FA0EE]" 
                  placeholder="Ex: Nacional, Regional, Top..." 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#5B6472] mb-1.5">Status Inicial</label>
                <select 
                  value={statusForm} 
                  onChange={(e) => setStatusForm(e.target.value)} 
                  className="w-full border border-[#E3E6EB] rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0FA0EE]/50 focus:border-[#0FA0EE] bg-white text-[#1C2530]"
                >
                  <option value="Ativo">Ativo</option>
                  <option value="Em Análise">Em Análise</option>
                  <option value="Inativo">Inativo</option>
                </select>
              </div>
            </div>

            <div className="px-6 py-5 border-t border-[#E7E9EC] flex justify-end gap-3 bg-[#F9FAFB]">
              <button onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-sm font-semibold text-[#5B6472] hover:bg-[#E7E9EC] hover:text-[#1C2530] rounded-xl transition-colors">
                Cancelar
              </button>
              <button onClick={handleSalvarConvenio} className="px-5 py-2.5 text-sm font-semibold text-white bg-[#0FA0EE] hover:bg-[#0c8bd0] rounded-xl transition-colors shadow-sm hover:shadow-md">
                Salvar Convênio
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}