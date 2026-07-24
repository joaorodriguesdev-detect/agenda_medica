"use client";

export default function SettingsView() {
  return (
    <div className="p-8 max-w-3xl h-full flex flex-col">
      <div className="mb-8">
        <h2 className="text-[28px] font-bold text-[#1C2530] tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
          Configurações do Sistema
        </h2>
        <p className="text-[#5B6472] text-sm mt-1">Gerencie as preferências da aplicação e integrações da clínica.</p>
      </div>

      <div className="bg-white rounded-2xl border border-[#E7E9EC] shadow-sm overflow-hidden">
        
        {/* Toggle 1: Notificações */}
        <div className="p-6 border-b border-[#F1F2F4] flex justify-between items-center hover:bg-[#F9FAFB] transition-colors">
          <div>
            <h3 className="text-sm font-bold text-[#1C2530]">Notificações por E-mail</h3>
            <p className="text-xs text-[#8A93A0] mt-1">Enviar lembretes automáticos para pacientes pendentes.</p>
          </div>
          <div className="w-11 h-6 bg-[#0FA0EE] rounded-full relative cursor-pointer opacity-80">
            <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1"></div>
          </div>
        </div>

        {/* Toggle 2: Modo Escuro */}
        <div className="p-6 border-b border-[#F1F2F4] flex justify-between items-center hover:bg-[#F9FAFB] transition-colors">
          <div>
            <h3 className="text-sm font-bold text-[#1C2530]">Modo Escuro (Dark Mode)</h3>
            <p className="text-xs text-[#8A93A0] mt-1">Interface otimizada para ambientes com baixa luminosidade.</p>
          </div>
          <div className="w-11 h-6 bg-[#E7E9EC] rounded-full relative cursor-pointer">
            <div className="w-4 h-4 bg-white rounded-full shadow-sm absolute top-1 left-1"></div>
          </div>
        </div>

        {/* Toggle 3: O toque de especialista */}
        <div className="p-6 flex justify-between items-center hover:bg-[#F9FAFB] transition-colors">
          <div>
            <h3 className="text-sm font-bold text-[#1C2530]">Motor de IA Local</h3>
            <p className="text-xs text-[#8A93A0] mt-1">Habilitar inferência local de modelos LLM para auto-preenchimento de prontuários.</p>
          </div>
          <div className="w-11 h-6 bg-[#0FA0EE] rounded-full relative cursor-pointer opacity-80">
            <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1"></div>
          </div>
        </div>

      </div>
    </div>
  );
}