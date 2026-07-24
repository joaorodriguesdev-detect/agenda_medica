"use client";
import { useState, useEffect } from "react";

export default function SettingsView() {
  // Estados para as configurações
  const [notificacoes, setNotificacoes] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [motorIA, setMotorIA] = useState(false);

  // Carrega as preferências salvas no navegador ao montar o componente
  useEffect(() => {
    const configSalva = localStorage.getItem("timeSaveConfigs");
    if (configSalva) {
      const config = JSON.parse(configSalva);
      setNotificacoes(config.notificacoes ?? true);
      setDarkMode(config.darkMode ?? false);
      setMotorIA(config.motorIA ?? false);
    }
  }, []);

  // Função para salvar o estado dinamicamente
  const handleToggle = (chave: string, valorAtual: boolean) => {
    const novoValor = !valorAtual;
    
    // Atualiza o estado visual
    if (chave === "notificacoes") setNotificacoes(novoValor);
    if (chave === "darkMode") setDarkMode(novoValor);
    if (chave === "motorIA") setMotorIA(novoValor);

    // Salva no Local Storage para persistência
    const configAtual = JSON.parse(localStorage.getItem("timeSaveConfigs") || "{}");
    const novaConfig = { ...configAtual, [chave]: novoValor };
    localStorage.setItem("timeSaveConfigs", JSON.stringify(novaConfig));

   
  };

  return (
    <div className="p-8 max-w-3xl h-full flex flex-col animate-[fadeIn_0.3s_ease-out]">
      <div className="mb-8">
        <h2 className="text-[28px] font-bold text-[#1C2530] tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
          Configurações do Sistema
        </h2>
        <p className="text-[#5B6472] text-sm mt-1">Gerencie as preferências da aplicação e parâmetros de integração.</p>
      </div>

      <div className="bg-white rounded-2xl border border-[#E7E9EC] shadow-sm overflow-hidden">
        
        <div className="p-6 border-b border-[#F1F2F4] flex justify-between items-center hover:bg-[#F9FAFB] transition-colors">
          <div>
            <h3 className="text-sm font-bold text-[#1C2530]">Notificações por E-mail</h3>
            <p className="text-xs text-[#8A93A0] mt-1">Enviar lembretes automáticos para pacientes com agendamentos pendentes.</p>
          </div>
          <div 
            onClick={() => handleToggle("notificacoes", notificacoes)}
            className={`w-11 h-6 rounded-full relative cursor-pointer transition-colors duration-300 ${notificacoes ? "bg-[#0FA0EE]" : "bg-[#E7E9EC]"}`}
          >
            <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform duration-300 ${notificacoes ? "translate-x-6" : "translate-x-1 shadow-sm"}`}></div>
          </div>
        </div>

       
        <div className="p-6 border-b border-[#F1F2F4] flex justify-between items-center hover:bg-[#F9FAFB] transition-colors">
          <div>
            <h3 className="text-sm font-bold text-[#1C2530]">Modo Escuro (Dark Mode)</h3>
            <p className="text-xs text-[#8A93A0] mt-1">Interface otimizada para ambientes com baixa luminosidade.</p>
          </div>
          <div 
            onClick={() => handleToggle("darkMode", darkMode)}
            className={`w-11 h-6 rounded-full relative cursor-pointer transition-colors duration-300 ${darkMode ? "bg-[#1C2530]" : "bg-[#E7E9EC]"}`}
          >
            <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform duration-300 ${darkMode ? "translate-x-6" : "translate-x-1 shadow-sm"}`}></div>
          </div>
        </div>

        
        <div className="p-6 flex justify-between items-center hover:bg-[#F9FAFB] transition-colors">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-[#1C2530]">Motor de IA Local</h3>
              <span className="px-2 py-0.5 bg-[#1E7A50]/10 text-[#1E7A50] text-[10px] font-bold rounded-full uppercase tracking-wider">Beta</span>
            </div>
            <p className="text-xs text-[#8A93A0] mt-1">Habilitar inferência via API local para estruturação e auto-preenchimento de prontuários médicos.</p>
          </div>
          <div 
            onClick={() => handleToggle("motorIA", motorIA)}
            className={`w-11 h-6 rounded-full relative cursor-pointer transition-colors duration-300 ${motorIA ? "bg-[#0FA0EE]" : "bg-[#E7E9EC]"}`}
          >
            <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform duration-300 ${motorIA ? "translate-x-6" : "translate-x-1 shadow-sm"}`}></div>
          </div>
        </div>

      </div>
    </div>
  );
}