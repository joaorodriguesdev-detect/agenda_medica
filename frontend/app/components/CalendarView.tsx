"use client";

export default function CalendarView() {
  return (
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
          <div className="absolute top-[80px] w-[calc(100%-24px)] bg-[#359CFB] text-white p-3 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer">
            <div className="text-xs font-bold mb-1">10:00 - Carlos Andrade</div>
            <div className="text-[10px] text-white/90">Ortopedia • Unimed</div>
          </div>
          <div className="absolute top-[320px] w-[calc(100%-24px)] bg-[#359CFB] text-white p-3 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer">
            <div className="text-xs font-bold mb-1">14:30 - Mariana Costa</div>
            <div className="text-[10px] text-white/90">Cardiologia • Bradesco</div>
          </div>
        </div>

        <div className="border-r border-[#E7E9EC] relative p-3">
          <div className="absolute top-[40px] w-[calc(100%-24px)] bg-[#FCB80F] text-white p-3 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer h-[80px]">
            <div className="text-xs font-bold mb-1">08:00 - Ana Souza</div>
            <div className="text-[10px] text-white/90">Dermatologia • Particular</div>
          </div>
          <div className="absolute top-[220px] w-[calc(100%-24px)] bg-[#FF7E78] text-white p-3 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer h-[120px]">
            <div className="text-xs font-bold mb-1">11:00 - Felipe Mendes</div>
            <div className="text-[10px] text-white/90">Ortopedia • Particular</div>
            <div className="mt-2 inline-block bg-white/20 px-2 py-0.5 rounded text-[10px] font-semibold">Cancelado</div>
          </div>
        </div>

        <div className="border-r border-[#E7E9EC] relative p-3">
          <div className="absolute top-[320px] w-[calc(100%-24px)] bg-[#7C8CD6] text-white p-3 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer h-[120px]">
            <div className="text-xs font-bold mb-1">15:00 - Roberto Alves</div>
            <div className="text-[10px] text-white/90">Clínico Geral • SulAmérica</div>
          </div>
        </div>

        <div className="relative p-3"></div>
      </div>
    </div>
  );
}