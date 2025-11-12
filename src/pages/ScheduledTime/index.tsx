import {
  Calendar,
  Clock,
  CheckCircle2,
  CalendarRange,
  ArrowLeft,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useFirestoreGetDocument } from "@/utils/firestore";
import type { ParticipantType } from "@/interface/paticipant";
import { useAuth } from "@/hooks/use-auth";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export function Component() {
  const { user } = useAuth();
  const { SignOut } = useAuth();

  const { data: participant } = useFirestoreGetDocument<ParticipantType>(
    `participant/${user?.registrationCode}`
  );

  if (!participant) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-white">
        <img
          className="h-32 sm:h-44 -mt-8"
          src="/logo-diflen-global-25.png"
          alt="diflen global 25"
        />
        <Spinner className="size-10 text-[#E1FF2F]" />
      </div>
    );
  }

  return (
    <div>
      <div className="max-w-2xl mx-auto">
        <div className="text-center">
          <div className="inline-flex items-center">
            <img
              className="h-32 sm:h-44 -mt-8"
              src="/logo-diflen-global-25.png"
              alt="diflen global 25"
            />
          </div>

          <div className="text-center mb-6 sm:mb-8 space-y-3 -mt-3 sm:-mt-5">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-balance tracking-tight leading-none">
              <span className="bg-linear-to-tr from-[#FFFFFF] to-[#E1FF2F] bg-clip-text text-transparent animate-gradient">
                SALA
              </span>
              <br />
              <span className="text-[#E1FF2F]">PROFÉTICA</span>
            </h1>
          </div>
        </div>

        {/* Card de resultado com animação de entrada */}
        <Card className="shadow-2xl border-0 backdrop-blur-xl bg-white/5 overflow-hidden animate-scale-in">
          <div className="absolute inset-0 bg-linear-to-br from-[#E1FF2F]/10 to-transparent" />

          <div className="relative">
            <CardHeader className="text-center pb-6">
              {/* Ícone de sucesso animado */}
              <div className="flex justify-center mb-1">
                <div className="relative">
                  <div className="absolute inset-0 bg-[#E1FF2F] rounded-full blur-2xl opacity-50 animate-pulse" />
                  <div
                    className="relative h-16 w-16 rounded-full flex items-center justify-center animate-bounce-in"
                    style={{ backgroundColor: "#E1FF2F" }}
                  >
                    <CheckCircle2
                      className="h-8 w-8"
                      style={{ color: "#003280" }}
                      strokeWidth={3}
                    />
                  </div>
                </div>
              </div>

              <CardTitle
                className="text-2xl md:text-4xl font-black text-balance mb-1"
                style={{ color: "#E1FF2F" }}
              >
                Seu horário está confirmado!
              </CardTitle>
              <CardDescription className="text-lg" style={{ color: "#FFFFFF" }}>
                Olá,{" "}
                <span className="font-mono font-bold text-[#E1FF2F]">
                  {(() => {
                    const parts = (participant.name || "")
                      .trim()
                      .split(/\s+/)
                      .filter(Boolean);
                    if (!parts.length) return "";
                    return parts.length === 1
                      ? parts[0]
                      : `${parts[0]} ${parts[parts.length - 1]}`;
                  })()}
                </span>
                <p>
                  abaixo estão a data e o horário de acesso à Sala Profética.
                  Não perca! Desde já, prepare-se em oração para esse momento.
                </p>
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4 pb-8">
              {/* Data */}
              <div className="relative group/card">
                <div className="absolute inset-0 bg-linear-to-r from-[#E1FF2F] to-[#B8FF00] rounded-2xl blur-lg opacity-0 group-hover/card:opacity-30 transition-opacity duration-300" />
                <div
                  className="relative flex items-center gap-5 p-4 rounded-2xl backdrop-blur-sm transition-all duration-300 transform group-hover/card:scale-[1.02]"
                  style={{ backgroundColor: "#E1FF2F" }}
                >
                  <div
                    className="h-12 w-12 rounded-2xl flex items-center justify-center shrink-0 shadow-lg"
                    style={{ backgroundColor: "#003280" }}
                  >
                    <Calendar
                      className="h-6 w-6"
                      style={{ color: "#E1FF2F" }}
                      strokeWidth={2.5}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-sm font-bold uppercase tracking-wider mb-2"
                      style={{ color: "#003280", opacity: 0.7 }}
                    >
                      Data
                    </p>
                    <p
                      className="text-xl md:text-2xl font-black capitalize text-pretty"
                      style={{ color: "#003280" }}
                    >
                      {participant.room?.date}
                    </p>
                  </div>
                </div>
              </div>

              {/* Horário */}
              <div className="relative group/card">
                <div className="absolute inset-0 bg-linear-to-r from-[#E1FF2F] to-[#B8FF00] rounded-2xl blur-lg opacity-0 group-hover/card:opacity-30 transition-opacity duration-300" />
                <div
                  className="relative flex items-center gap-5 p-4 rounded-2xl backdrop-blur-sm transition-all duration-300 transform group-hover/card:scale-[1.02]"
                  style={{ backgroundColor: "#E1FF2F" }}
                >
                  <div
                    className="h-12 w-12 rounded-2xl flex items-center justify-center shrink-0 shadow-lg"
                    style={{ backgroundColor: "#003280" }}
                  >
                    <Clock
                      className="h-6 w-6"
                      style={{ color: "#E1FF2F" }}
                      strokeWidth={2.5}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-sm font-bold uppercase tracking-wider mb-2"
                      style={{ color: "#003280", opacity: 0.7 }}
                    >
                      Horário
                    </p>
                    <p
                      className="text-xl md:text-2xl font-black"
                      style={{ color: "#003280" }}
                    >
                      {participant.room?.interval}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </div>
        </Card>

        <div className="max-w-2xl mx-auto mt-8 mb-6">
          <Link to="/programacao">
            <div className="relative group cursor-pointer">
              <div className="absolute inset-0 bg-linear-to-r from-[#E1FF2F] via-[#00FFFF] to-[#E1FF2F] rounded-2xl blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
              <div
                className="relative flex items-center justify-between p-4 md:p-5 rounded-2xl backdrop-blur-xl transition-all duration-300 group-hover:scale-[1.02] border border-[#E1FF2F]/30"
                style={{ backgroundColor: "rgba(225, 255, 47, 0.1)" }}
              >
                <div className="flex items-center gap-3">
                  <CalendarRange className="w-6 h-6 text-[#E1FF2F] shrink-0" />
                  <div>
                    <h2 className="text-2xl text-start md:text-3xl font-black text-[#E1FF2F]">
                      Programação
                    </h2>
                    <p className="text-start mt-1 text-white/80 text-sm md:text-base">
                      Clique aqui e confira a programação do DIFLEN GLOBAL 2025
                    </p>
                  </div>
                </div>
                <ArrowLeft className="w-6 h-6 text-[#E1FF2F] rotate-180 shrink-0" />
              </div>
            </div>
          </Link>
        </div>

        <div className="text-center mt-6 space-y-2">
          <p className="text-white/60 text-sm font-medium">
            Dúvidas? Procure um dos nossos voluntários
          </p>
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#E1FF2F] animate-pulse" />
            <div
              className="w-2 h-2 rounded-full bg-[#E1FF2F] animate-pulse"
              style={{ animationDelay: "0.2s" }}
            />
            <div
              className="w-2 h-2 rounded-full bg-[#E1FF2F] animate-pulse"
              style={{ animationDelay: "0.4s" }}
            />
          </div>
        </div>

        <div className="flex justify-center mt-2">
          <Button
            variant="ghost"
            className="text-[#E1FF2F] text-md"
            onClick={SignOut}
          >
            Sair
          </Button>
        </div>
      </div>
      <style>{`
        @keyframes float {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(50px, -80px) scale(1.1);
          }
          66% {
            transform: translate(-30px, 40px) scale(0.9);
          }
        }

        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.4;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.05);
          }
        }

        @keyframes gradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes scale-in {
          0% {
            opacity: 0;
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes bounce-in {
          0% {
            opacity: 0;
            transform: scale(0);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-5px);
          }
          75% {
            transform: translateX(5px);
          }
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

        .animate-scale-in {
          animation: scale-in 0.5s ease-out;
        }

        .animate-bounce-in {
          animation: bounce-in 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
}

Component.displayName = "ScheduledTime";
