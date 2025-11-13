import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, CalendarSearch, Flame } from "lucide-react";
import { Link } from "react-router";

export function WaitSchedule() {
  return (
    <div className="max-w-2xl mx-auto">
      {/* Conteúdo */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-2xl mx-auto mb-18">
          <Link to="/">
            <div className="relative group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-r from-[#E1FF2F] via-[#00FFFF] to-[#E1FF2F] rounded-2xl blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
              <div
                className="relative flex items-center justify-between p-4 md:p-5 rounded-2xl backdrop-blur-xl transition-all duration-300 group-hover:scale-[1.02] border border-[#E1FF2F]/30"
                style={{ backgroundColor: "rgba(225, 255, 47, 0.1)" }}
              >
                <div className="flex items-center gap-3">
                  <Flame className="w-6 h-6 text-[#E1FF2F] shrink-0" />
                  <div>
                    <h2 className="text-2xl md:text-3xl font-black text-[#E1FF2F]">
                      Sala Profética
                    </h2>
                    <p className="text-white/80 mt-1 text-sm md:text-base">
                      Clique aqui e escolha o seu horário na Sala Profética
                    </p>
                  </div>
                </div>
                <ArrowLeft className="w-6 h-6 text-[#E1FF2F] rotate-180 shrink-0" />
              </div>
            </div>
          </Link>
        </div>

        <div className="text-center">
          <div className="inline-flex items-center">
            <img
              className="h-32 sm:h-44 -mt-18"
              src="/logo-diflen-global-25.png"
              alt="diflen global 25"
            />
          </div>

          <div className="text-center mb-5 sm:mb-8 space-y-3 -mt-3 sm:-mt-5">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-balance tracking-tight leading-none">
              <span className="bg-gradient-to-tr from-[#FFFFFF] to-[#E1FF2F] bg-clip-text text-transparent animate-gradient">
                PROGRAMAÇÃO
              </span>
              <br />
              <span className="text-[#E1FF2F]">DIFLEN GLOBAL 2025</span>
            </h1>
          </div>
        </div>
      </div>
      {/* Título */}
      <div className="text-center mb-6 space-y-4">
        <p className="text-lg md:text-xl text-white/80 font-light text-pretty max-w-2xl mx-auto"></p>
      </div>

      {/* Card de expectativa */}
      <Card className="backdrop-blur-xl bg-gradient-to-br from-[#E1FF2F]/20 via-[#00FFFF]/20 to-[#E1FF2F]/20 border border-[#E1FF2F]/40 overflow-hidden mb-6">
        <CardContent className="relative px-4 py-2">
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#E1FF2F] via-[#00FFFF] to-[#E1FF2F] opacity-0 hover:opacity-10 blur-xl transition-opacity duration-500" />

          <div className="relative space-y-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E1FF2F]/10 border border-[#E1FF2F]/20 backdrop-blur-sm mb-6">
              <CalendarSearch className="w-4 h-4 text-[#E1FF2F]" />
              <span className="text-sm font-medium text-[#E1FF2F]">
                Em Breve
              </span>
            </div>

            {/* Texto inspirador */}
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-black text-[#E1FF2F]">
                Fique ligado!
              </h2>
              <p className="text-base md:text-lg text-white/90 font-light leading-relaxed">
                Estamos preparando tudo para você. Nossa equipe está trabalhando
                nos últimos detalhes para entregar uma programação de
                excelência.
              </p>
            </div>

            {/* Destacados */}
            <div className="grid grid-cols-2 gap-4 md:gap-6 pt-2">
              <div className="space-y-2 p-4 flex flex-col justify-center items-center rounded-lg bg-[#E1FF2F]/10 border border-[#E1FF2F]/20">
                <div className="text-2xl md:text-3xl font-black text-[#E1FF2F]">
                  21-22
                </div>
                <div className="text-sm text-white/70">de Novembro</div>
              </div>
              <div className="space-y-2 p-4 rounded-lg bg-[#E1FF2F]/10 border border-[#E1FF2F]/20">
                <div className="flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="#E1FF2F"
                    aria-hidden="true"
                    className="w-6 h-6"
                  >
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1112 6a2.5 2.5 0 010 5.5z" />
                  </svg>
                </div>
                <div className="text-sm text-white/70">
                  Centro de Convenções de Santarém - Sebastião Tapajós
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CTA */}
      <div className="max-w-4xl mx-auto my-8 text-center">
        <Link to="/">
          <Button
            className="h-14 px-8 text-lg font-black rounded-2xl relative overflow-hidden group/btn transition-all duration-300 transform hover:scale-[1.05] active:scale-[0.95]"
            style={{
              background: "linear-gradient(135deg, #E1FF2F 0%, #B8FF00 100%)",
              color: "#003280",
              border: "none",
              boxShadow: "0 10px 40px rgba(225, 255, 47, 0.3)",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-1000" />
            <span className="relative z-10 flex items-center justify-center gap-2d">
              <Flame className="w-5 h-5 mr-2" />
              Horário Sala Profética
            </span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
