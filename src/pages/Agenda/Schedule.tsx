import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Clock, Flame, MapPin, Users } from "lucide-react";
import { Link } from "react-router";

export function Schedule() {
  const schedule = {
    "21/11": [
      {
        time: "12:00 - 14:00",
        title: "Credenciamento",
        location: "Entrada Principal",
        type: "Check-in",
      },
      {
        time: "14:00 - 17:10",
        title: "Sessão 01",
        location: "Auditório Principal",
        type: "Ministrações",
      },
      {
        time: "17:10 - 18:30",
        title: "Sala Profética",
        location: "",
        type: "Sala Profética",
      },
      {
        time: "17:10 - 18:30",
        title: "Intervalo",
        location: "Praça de Alimentação",
        type: "Intervalo",
      },
      {
        time: "18:30 - 21:00",
        title: "Sessão 02",
        location: "Auditório Principal",
        type: "Ministrações",
      },
    ],
    "22/11": [
      {
        time: "08:00 - 09:00",
        title: "Soaking Room | Sala Profética",
        location: undefined,
        type: "Sala Profética",
      },
      {
        time: "09:00 - 12:20",
        title: "Sessão 03",
        location: "Auditório Principal",
        type: "Ministrações",
      },
      {
        time: "12:20 - 14:30",
        title: "Sala Profética",
        location: undefined,
        type: "Sala Profética",
      },
      {
        time: "12:20 - 14:30",
        title: "Intervalo",
        location: "Praça de Alimentação",
        type: "Intervalo",
      },
      {
        time: "14:30 - 16:50",
        title: "Sessão 04",
        location: "Auditório Principal",
        type: "Ministrações",
      },
      {
        time: "16:50 - 18:30",
        title: "Sala Profética",
        location: undefined,
        type: "Sala Profética",
      },
      {
        time: "16:50 - 18:30",
        title: "Intervalo",
        location: "Praça de Alimentação",
        type: "Intervalo",
      },
      {
        time: "18:30 - 21:30",
        title: "Sessão 05",
        location: "Auditório Principal",
        type: "Ministrações",
      },
    ],
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Ministrações":
        return "bg-[#E1FF2F]/20 border-[#E1FF2F]/50 text-[#E1FF2F]";
      case "Check-in":
        return "bg-blue-500/20 border-blue-500/50 text-blue-300";
      case "Intervalo":
        return "bg-pink-500/20 border-pink-500/50 text-pink-300";
      case "Sala Profética":
        return "bg-cyan-500/20 border-cyan-500/50 text-cyan-300";
      case "Painel":
        return "bg-purple-500/20 border-purple-500/50 text-purple-300";
      default:
        return "bg-gray-500/20 border-gray-500/50 text-gray-300";
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Conteúdo */}
      <div className="relative z-10 container mx-auto px-4 pb-8">
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

            <p className="text-xl md:text-2xl text-white/80 font-light text-pretty max-w-lg mx-auto">
              Confira a programação do DIFLEN GLOBAL 2025
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="21/11" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-2 bg-white/10 border border-[#E1FF2F]/30 backdrop-blur-xl rounded-2xl p-2">
              <TabsTrigger
                value="21/11"
                className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#E1FF2F] data-[state=active]:to-[#B8FF00] data-[state=active]:text-[#003280] data-[state=active]:shadow-lg text-white/60 hover:text-white transition-all font-bold text-lg"
              >
                21 de Novembro
              </TabsTrigger>
              <TabsTrigger
                value="22/11"
                className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#E1FF2F] data-[state=active]:to-[#B8FF00] data-[state=active]:text-[#003280] data-[state=active]:shadow-lg text-white/60 hover:text-white transition-all font-bold text-lg"
              >
                22 de Novembro
              </TabsTrigger>
            </TabsList>

            {Object.entries(schedule).map(([day, items]) => (
              <TabsContent key={day} value={day} className="space-y-4">
                {items.map((item, index) => (
                  <Card
                    key={index}
                    className="backdrop-blur-xl bg-white/5 border-0 overflow-hidden group hover:bg-white/10 transition-all duration-500 hover:scale-[1.02]"
                  >
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#E1FF2F] via-[#00FFFF] to-[#E1FF2F] opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />

                    <CardContent className="relative p-6 md:p-8">
                      <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
                        {/* Horário */}
                        <div className="shrink-0">
                          <div className="flex items-center gap-2 mb-2">
                            <Clock className="w-5 h-5 text-[#E1FF2F]" />
                            <span className="text-sm font-bold text-[#E1FF2F] uppercase tracking-wider">
                              Horário
                            </span>
                          </div>
                          <p className="text-2xl md:text-3xl font-black text-white">
                            {item.time}
                          </p>
                        </div>

                        {/* Divider */}
                        <div className="hidden md:block w-px h-20 bg-gradient-to-b from-[#E1FF2F] via-[#00FFFF] to-transparent opacity-50" />

                        {/* Conteúdo */}
                        <div className="flex-1">
                          <h3 className="text-2xl md:text-3xl font-black text-white mb-3">
                            {item.title}
                          </h3>

                          {item.type === "Sala Profética" && (
                            <div className="flex items-center gap-2 text-white/80 mb-3">
                              <Flame className="w-4 h-4 text-[#E1FF2F]" />
                              <Link
                                to="/"
                                className="text-sm md:text-base text-[#E1FF2F]"
                              >
                                Veja seu horário clicando aqui
                              </Link>
                            </div>
                          )}
                          <div className="flex flex-wrap gap-3 md:gap-4">
                            {item.location && (
                              <div className="flex items-center gap-2 text-white/80">
                                <MapPin className="w-4 h-4 text-[#E1FF2F]" />
                                <span className="text-sm md:text-base">
                                  {item.location}
                                </span>
                              </div>
                            )}

                            <div
                              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs md:text-sm font-bold uppercase tracking-wider ${getTypeColor(
                                item.type
                              )}`}
                            >
                              <Users className="w-3 h-3" />
                              {item.type}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            ))}
          </Tabs>
        </div>

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
