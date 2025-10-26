import type React from "react";
import { useState, useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, Sparkles } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export function Component() {
  const [code, setCode] = useState(Array(9).fill(""));
  const [error, setError] = useState("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const { SignIn, loadingUserAuth } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (index: number, value: string) => {
    // Aceitar apenas letras e números
    const sanitized = value.replace(/[^A-Za-z0-9]/g, "").toUpperCase();

    if (sanitized.length > 1) {
      // Se colar múltiplos caracteres
      const chars = sanitized.slice(0, 9).split("");
      const newCode = [...code];
      chars.forEach((char, i) => {
        if (index + i < 9) {
          newCode[index + i] = char;
        }
      });
      setCode(newCode);
      setError("");

      // Focar no próximo input vazio ou no último
      const nextIndex = Math.min(index + chars.length, 8);
      inputRefs.current[nextIndex]?.focus();
    } else if (sanitized.length === 1) {
      const newCode = [...code];
      newCode[index] = sanitized;
      setCode(newCode);
      setError("");

      // Mover para o próximo input
      if (index < 8) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const newCode = [...code];

      if (code[index]) {
        // Se tem valor, limpar
        newCode[index] = "";
        setCode(newCode);
      } else if (index > 0) {
        // Se não tem valor, voltar e limpar anterior
        newCode[index - 1] = "";
        setCode(newCode);
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 8) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const fullCode = code.join("");

    if (fullCode.length !== 9 || !/^[A-Za-z0-9]{9}$/.test(fullCode)) {
      setError(
        "Por favor, insira um código válido de 9 caracteres (letras e números)"
      );
      return;
    }

    try {
      await SignIn({ registrationCode: fullCode });
      console.log("Consultando código:", fullCode);

      await navigate("/horario");
    } catch (error) {
      console.error(error);
      toast.error("Código incorreto, tente novamente.");
    }
  };

  return (
    <div>
      <div className="relative z-10 container mx-auto px-2 py-10">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8 space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E1FF2F]/10 border border-[#E1FF2F]/20 backdrop-blur-sm mb-4">
              <span className="text-sm font-medium text-[#E1FF2F]">
                DIFLEN GLOBAL 2025
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-balance tracking-tight leading-none">
              <span className="bg-linear-to-tr from-[#FFFFFF] to-[#E1FF2F] bg-clip-text text-transparent animate-gradient">
                SALA
              </span>
              <br />
              <span className="text-[#E1FF2F]">PROFÉTICA</span>
            </h1>

            <p className="text-xl md:text-2xl text-white/80 font-light text-pretty max-w-lg mx-auto">
              Descubra seu horário na sala profética inserindo o código do seu
              comprovante abaixo.
            </p>
          </div>

          {/* Formulário de entrada */}
          <Card className="shadow-2xl border-0 backdrop-blur-xl bg-white/5 overflow-hidden group hover:bg-white/10 transition-all duration-500">
            {/* Borda animada */}
            <div className="absolute inset-0 rounded-lg bg-linear-to-r from-[#E1FF2F] via-[#00FFFF] to-[#E1FF2F] opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />

            <div className="relative">
              <CardHeader className="space-y-1 pb-6">
                <CardTitle className="text-3xl md:text-4xl font-bold text-[#E1FF2F]">
                  Código de Inscrição
                </CardTitle>
                <CardDescription className="text-lg text-white">
                  Digite os 9 caracteres do seu código de inscrição que está no
                  seu comprovante de inscrição.
                </CardDescription>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="space-y-6">
                    <div className="flex items-center justify-center gap-1 sm:gap-2">
                      {/* Primeiro grupo */}
                      {[0, 1, 2].map((index) => (
                        <input
                          key={index}
                          ref={(el) => {
                            inputRefs.current[index] = el;
                          }}
                          type="text"
                          maxLength={1}
                          value={code[index]}
                          onChange={(e) =>
                            handleInputChange(index, e.target.value)
                          }
                          onKeyDown={(e) => handleKeyDown(index, e)}
                          className="w-7 h-10 sm:w-12 sm:h-14 text-center text-2xl sm:text-3xl font-black rounded-md sm:rounded-xl md:rounded-2xl border-2 focus:outline-none focus:ring-4 uppercase transition-all duration-300 transform hover:scale-105 focus:scale-110"
                          style={{
                            backgroundColor: code[index]
                              ? "#E1FF2F"
                              : "rgba(255, 255, 255, 0.1)",
                            borderColor: code[index]
                              ? "#E1FF2F"
                              : "rgba(225, 255, 47, 0.3)",
                            color: code[index] ? "#003280" : "#E1FF2F",
                            caretColor: "#E1FF2F",
                            boxShadow: code[index]
                              ? "0 0 30px rgba(225, 255, 47, 0.5)"
                              : "none",
                          }}
                          disabled={loadingUserAuth}
                        />
                      ))}

                      <div className="text-1xl sm:text-3xl font-black text-[#E1FF2F] sm:mx-1 animate-pulse">
                        -
                      </div>

                      {/* Segundo grupo */}
                      {[3, 4, 5].map((index) => (
                        <input
                          key={index}
                          ref={(el) => {
                            inputRefs.current[index] = el;
                          }}
                          type="text"
                          maxLength={1}
                          value={code[index]}
                          onChange={(e) =>
                            handleInputChange(index, e.target.value)
                          }
                          onKeyDown={(e) => handleKeyDown(index, e)}
                          className="w-7 h-10 sm:w-12 sm:h-14 text-center text-2xl sm:text-3xl md:text-4xl font-black rounded-md sm:rounded-xl md:rounded-2xl border-2 focus:outline-none focus:ring-4 uppercase transition-all duration-300 transform hover:scale-105 focus:scale-110"
                          style={{
                            backgroundColor: code[index]
                              ? "#E1FF2F"
                              : "rgba(255, 255, 255, 0.1)",
                            borderColor: code[index]
                              ? "#E1FF2F"
                              : "rgba(225, 255, 47, 0.3)",
                            color: code[index] ? "#003280" : "#E1FF2F",
                            caretColor: "#E1FF2F",
                            boxShadow: code[index]
                              ? "0 0 30px rgba(225, 255, 47, 0.5)"
                              : "none",
                          }}
                          disabled={loadingUserAuth}
                        />
                      ))}

                      <div className="text-1xl sm:text-3xl font-black text-[#E1FF2F] sm:mx-1 animate-pulse">
                        -
                      </div>

                      {/* Terceiro grupo */}
                      {[6, 7, 8].map((index) => (
                        <input
                          key={index}
                          ref={(el) => {
                            inputRefs.current[index] = el;
                          }}
                          type="text"
                          maxLength={1}
                          value={code[index]}
                          onChange={(e) =>
                            handleInputChange(index, e.target.value)
                          }
                          onKeyDown={(e) => handleKeyDown(index, e)}
                          className="w-7 h-10 sm:w-12 sm:h-14 text-center text-2xl sm:text-3xl md:text-4xl font-black rounded-md sm:rounded-xl md:rounded-2xl border-2 focus:outline-none focus:ring-4 uppercase transition-all duration-300 transform hover:scale-105 focus:scale-110"
                          style={{
                            backgroundColor: code[index]
                              ? "#E1FF2F"
                              : "rgba(255, 255, 255, 0.1)",
                            borderColor: code[index]
                              ? "#E1FF2F"
                              : "rgba(225, 255, 47, 0.3)",
                            color: code[index] ? "#003280" : "#E1FF2F",
                            caretColor: "#E1FF2F",
                            boxShadow: code[index]
                              ? "0 0 30px rgba(225, 255, 47, 0.5)"
                              : "none",
                          }}
                          disabled={loadingUserAuth}
                        />
                      ))}
                    </div>

                    {error && (
                      <div className="flex items-center justify-center gap-2 text-base bg-red-500/10 border border-red-500/20 rounded-lg p-3 backdrop-blur-sm animate-shake">
                        <AlertCircle className="h-5 w-5 text-red-400" />
                        <span className="text-red-400 font-medium">
                          {error}
                        </span>
                      </div>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-14 sm:h-16 text-xl font-black rounded-2xl relative overflow-hidden group/btn transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      background:
                        "linear-gradient(135deg, #E1FF2F 0%, #B8FF00 100%)",
                      color: "#003280",
                      border: "none",
                      boxShadow: "0 10px 40px rgba(225, 255, 47, 0.3)",
                    }}
                    disabled={loadingUserAuth || code.join("").length !== 9}
                  >
                    {/* Efeito de brilho ao hover */}
                    <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-1000" />

                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {loadingUserAuth ? (
                        <>
                          <div className="w-6 h-6 border-3 border-[#003280] border-t-transparent rounded-full animate-spin" />
                          Consultando...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-6 h-6" />
                          Descobrir Horário
                        </>
                      )}
                    </span>
                  </Button>
                </form>
              </CardContent>
            </div>
          </Card>

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

Component.displayName = "Home";
