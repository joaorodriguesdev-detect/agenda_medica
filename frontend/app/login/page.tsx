"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Space_Grotesk, Inter } from "next/font/google";

const display = Space_Grotesk({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-display" });
const body = Inter({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-body" });

function ClockMark({ size = 32, tone = "#16324F" }: { size?: number; tone?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <circle cx="20" cy="20" r="18" stroke={tone} strokeWidth="2.5" />
      <circle cx="20" cy="20" r="1.6" fill="#C9992F" />
      <line x1="20" y1="20" x2="20" y2="10" stroke={tone} strokeWidth="2.4" strokeLinecap="round" className="clock-hour" />
      <line x1="20" y1="20" x2="20" y2="6" stroke="#C9992F" strokeWidth="2.2" strokeLinecap="round" className="clock-minute" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="10" width="16" height="11" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

function EyeIcon({ open }: { open: boolean }) {
  return open ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-7 0-11-7-11-7a21.6 21.6 0 0 1 5.06-5.94M9.9 4.24A10.9 10.9 0 0 1 12 4c7 0 11 7 11 7a21.6 21.6 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

export default function Login() {
  const [identificador, setIdentificador] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");
    setCarregando(true);

    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identificador, senha }),
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok && data.status === "success") {
        router.push("/");
      } else {
        setErro(data.message || "Usuário ou senha inválidos. Confira os dados e tente novamente.");
      }
    } catch (err) {
      setErro("Não foi possível conectar ao servidor. Verifique sua conexão.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className={`${display.variable} ${body.variable} min-h-screen grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]`} style={{ fontFamily: "var(--font-body)" }}>
      <style jsx global>{`
        .clock-hour { transform-origin: 20px 20px; animation: hourSpin 12s linear infinite; }
        .clock-minute { transform-origin: 20px 20px; animation: minuteSpin 3s linear infinite; }
        @keyframes hourSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes minuteSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @media (prefers-reduced-motion: reduce) {
          .clock-hour, .clock-minute { animation: none; }
        }
        .brand-grid {
          background-image:
            linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
          background-size: 34px 34px;
        }
        .clock-glow {
          background: radial-gradient(circle, rgba(201,153,47,0.16) 0%, rgba(201,153,47,0) 70%);
          animation: glowPulse 5s ease-in-out infinite;
        }
        @keyframes glowPulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.06); }
        }
        @media (prefers-reduced-motion: reduce) {
          .clock-glow { animation: none; }
        }
      `}</style>

      {/* Painel de marca */}
      <div className="hidden lg:flex relative flex-col justify-between bg-[#16324F] brand-grid p-12 overflow-hidden">
        <div className="absolute -right-24 -top-24 w-[500px] h-[500px] clock-glow" />
        <div className="absolute -right-24 -top-24 opacity-[0.07]">
          <ClockMark size={420} tone="#FFFFFF" />
        </div>

        <div className="flex items-center gap-3 relative">
          <ClockMark size={30} tone="#FFFFFF" />
          <span style={{ fontFamily: "var(--font-display)" }} className="text-white font-semibold text-lg tracking-tight">
            Time Saver
          </span>
        </div>

        <div className="relative max-w-md">
          <p style={{ fontFamily: "var(--font-display)" }} className="text-white text-[34px] leading-[1.15] font-medium tracking-tight">
            Cada minuto da sua agenda, no lugar certo.
          </p>
          <p className="text-[#B9C6D6] text-[15px] mt-4 leading-relaxed">
            Consultas, pacientes e convênios organizados em um só painel —
            para sua equipe gastar tempo com quem importa, não com planilhas.
          </p>
        </div>

        <p className="relative text-[#7E93A8] text-xs">© {new Date().getFullYear()} Time Saver. Todos os direitos reservados.</p>
      </div>

      {/* Painel de formulário */}
      <div className="flex items-center justify-center bg-[#F6F7F9] px-6 py-12">
        <div className="w-full max-w-[400px]">
          <div className="flex lg:hidden items-center gap-2.5 mb-8 justify-center">
            <ClockMark size={28} />
            <span style={{ fontFamily: "var(--font-display)" }} className="text-[#16324F] font-semibold text-lg">
              Time Saver
            </span>
          </div>

          <div className="bg-white rounded-2xl shadow-[0_1px_2px_rgba(16,24,38,0.04),0_16px_40px_-12px_rgba(16,50,79,0.18)] border border-[#EDEFF2] px-8 pt-8 pb-9">
            <p className="text-[#C9992F] text-[11px] font-semibold tracking-[0.14em] uppercase mb-2">
              Bem-vindo de volta
            </p>
            <h1 style={{ fontFamily: "var(--font-display)" }} className="text-[24px] font-semibold text-[#101826] tracking-tight">
              Entrar na sua conta
            </h1>
            <p className="text-[#5B6472] text-sm mt-1.5 mb-7">
              Acesse a agenda médica com seu usuário ou e-mail cadastrado.
            </p>

            {erro && (
            <div className="flex items-start gap-2.5 bg-[#FBECEA] border-l-4 border-l-[#C0463C] rounded-lg p-3.5 mb-5">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C0463C" strokeWidth="2" className="mt-0.5 shrink-0">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="13" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <p className="text-sm text-[#8A2F26]">{erro}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="identificador" className="block text-sm font-medium text-[#33404F] mb-1.5">
                Usuário ou e-mail
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9AA1AC]">
                  <UserIcon />
                </span>
                <input
                  id="identificador"
                  type="text"
                  required
                  autoFocus
                  autoComplete="username"
                  className="w-full border border-[#E3E6EB] bg-[#FAFBFC] rounded-lg pl-10 pr-3.5 py-2.5 text-sm text-[#101826] placeholder:text-[#9AA1AC] focus:outline-none focus:ring-2 focus:ring-[#16324F]/20 focus:border-[#16324F] focus:bg-white transition-all"
                  value={identificador}
                  onChange={(e) => setIdentificador(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="senha" className="block text-sm font-medium text-[#33404F] mb-1.5">
                Senha
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9AA1AC]">
                  <LockIcon />
                </span>
                <input
                  id="senha"
                  type={mostrarSenha ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  className="w-full border border-[#E3E6EB] bg-[#FAFBFC] rounded-lg pl-10 pr-11 py-2.5 text-sm text-[#101826] placeholder:text-[#9AA1AC] focus:outline-none focus:ring-2 focus:ring-[#16324F]/20 focus:border-[#16324F] focus:bg-white transition-all"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setMostrarSenha((v) => !v)}
                  aria-label={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9AA1AC] hover:text-[#5B6472] transition-colors"
                >
                  <EyeIcon open={mostrarSenha} />
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={carregando}
              className="w-full bg-[#16324F] text-white text-sm font-semibold py-2.5 rounded-lg hover:bg-[#1D3E60] hover:shadow-[0_8px_20px_-6px_rgba(22,50,79,0.5)] hover:-translate-y-[1px] active:translate-y-0 active:bg-[#122841] transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none flex items-center justify-center gap-2 mt-2"
            >
              {carregando && (
                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              )}
              {carregando ? "Entrando…" : "Entrar"}
            </button>
          </form>
          </div>
        </div>
      </div>
    </div>
  );
}