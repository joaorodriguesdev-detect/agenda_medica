"use client";
import { useState, useEffect } from "react";

const CloseIcon = () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;

export default function PacientesView() {
  const [pacientes, setPacientes] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [carregando, setCarregando] = useState(true);

  // Estados do Formulário
  const [formData, setFormData] = useState({
    nome: "", cpf: "", rg: "", data_nascimento: "", telefone: "", email: "", endereco: "", convenio: "Particular", numero_convenio: ""
  });

  useEffect(() => { carregarPacientes(); }, []);

  const carregarPacientes = async () => {
    setCarregando(true);
    try {
      const res = await fetch("http://localhost:5000/api/pacientes", { credentials: "include" });
      const json = await res.json();
      if (json.status === "success") setPacientes(json.data);
    } catch (err) {
      console.error("Erro ao carregar pacientes:", err);
    } finally {
      setCarregando(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSalvarPaciente = async () => {
    if (!formData.nome || !formData.cpf) return alert("Nome e CPF são obrigatórios.");
    
    try {
      const res = await fetch("http://localhost:5000/api/pacientes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include"
      });
      const json = await res.json();
      if (json.status === "success") {
        setPacientes(prev => [...prev, json.data]);
        setIsModalOpen(false);
        setFormData({ nome: "", cpf: "", rg: "", data_nascimento: "", telefone: "", email: "", endereco: "", convenio: "Particular", numero_convenio: "" });
      }
    } catch (err) {
      alert("Erro ao conectar com a API.");
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto h-full flex flex-col animate-[fadeIn_0.3s_ease-out]">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-[28px] font-bold text-[#1C2530] tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
            Fichas de Pacientes
          </h2>
          <p className="text-[#5B6472] text-sm mt-1">Cadastro completo e histórico de pacientes da clínica.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="bg-[#0FA0EE] text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-sm hover:bg-[#0c8bd0] hover:shadow-md transition-all">
          + Novo Paciente
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-[#E7E9EC] shadow-sm overflow-hidden flex-1">
        {carregando ? (
          <div className="text-center text-[#8A93A0] text-sm py-20">Carregando dados...</div>
        ) : pacientes.length === 0 ? (
          <div className="text-center text-[#8A93A0] text-sm py-20">Nenhum paciente cadastrado no sistema.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-[#5B6472]">
              <thead className="bg-[#F9FAFB] border-b border-[#E7E9EC] text-xs font-bold text-[#1C2530] uppercase">
                <tr>
                  <th className="px-6 py-4">Nome</th>
                  <th className="px-6 py-4">CPF / Telefone</th>
                  <th className="px-6 py-4">Convênio</th>
                  <th className="px-6 py-4 text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                {pacientes.map((p, idx) => (
                  <tr key={idx} className="border-b border-[#F1F2F4] hover:bg-[#F9FAFB] transition-colors">
                    <td className="px-6 py-4 font-semibold text-[#1C2530]">{p.nome}</td>
                    <td className="px-6 py-4">
                      <div>{p.cpf}</div>
                      <div className="text-xs text-[#8A93A0]">{p.telefone}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-[#F1F2F4] text-[#1C2530] px-3 py-1 rounded-full text-xs font-bold">{p.convenio}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-[#0FA0EE] font-semibold hover:underline">Ver Prontuário</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* MODAL DE NOVO PACIENTE */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-[#E7E9EC] flex justify-between items-center bg-[#F9FAFB]">
              <h2 className="text-lg font-bold text-[#1C2530]">Cadastro de Paciente</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-[#8A93A0] hover:text-[#A23B2F] transition-colors p-1 rounded-lg hover:bg-red-50"><CloseIcon /></button>
            </div>
            
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="col-span-1 md:col-span-2">
                <label className="block text-xs font-bold text-[#5B6472] mb-1.5">Nome Completo</label>
                <input name="nome" value={formData.nome} onChange={handleInputChange} type="text" className="w-full border border-[#E3E6EB] rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0FA0EE]/50" />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#5B6472] mb-1.5">CPF</label>
                <input name="cpf" value={formData.cpf} onChange={handleInputChange} type="text" className="w-full border border-[#E3E6EB] rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0FA0EE]/50" />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#5B6472] mb-1.5">RG</label>
                <input name="rg" value={formData.rg} onChange={handleInputChange} type="text" className="w-full border border-[#E3E6EB] rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0FA0EE]/50" />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#5B6472] mb-1.5">Data de Nascimento</label>
                <input name="data_nascimento" value={formData.data_nascimento} onChange={handleInputChange} type="date" className="w-full border border-[#E3E6EB] rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0FA0EE]/50" />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#5B6472] mb-1.5">Telefone</label>
                <input name="telefone" value={formData.telefone} onChange={handleInputChange} type="text" className="w-full border border-[#E3E6EB] rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0FA0EE]/50" />
              </div>
              <div className="col-span-1 md:col-span-2">
                <label className="block text-xs font-bold text-[#5B6472] mb-1.5">Endereço Completo</label>
                <input name="endereco" value={formData.endereco} onChange={handleInputChange} type="text" className="w-full border border-[#E3E6EB] rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0FA0EE]/50" />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#5B6472] mb-1.5">Plano / Convênio</label>
                <select name="convenio" value={formData.convenio} onChange={handleInputChange} className="w-full border border-[#E3E6EB] rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0FA0EE]/50">
                  <option>Particular</option>
                  <option>Unimed</option>
                  <option>Bradesco Saúde</option>
                  <option>SulAmérica</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-[#5B6472] mb-1.5">Número da Carteirinha</label>
                <input name="numero_convenio" value={formData.numero_convenio} onChange={handleInputChange} type="text" className="w-full border border-[#E3E6EB] rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0FA0EE]/50" />
              </div>
            </div>

            <div className="px-6 py-5 border-t border-[#E7E9EC] flex justify-end gap-3 bg-[#F9FAFB]">
              <button onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-sm font-semibold text-[#5B6472] hover:bg-[#E7E9EC] rounded-xl transition-colors">Cancelar</button>
              <button onClick={handleSalvarPaciente} className="px-5 py-2.5 text-sm font-semibold text-white bg-[#0FA0EE] hover:bg-[#0c8bd0] rounded-xl transition-colors">Salvar Paciente</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}