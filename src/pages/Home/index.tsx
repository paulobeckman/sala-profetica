/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { AlertCircle, ArrowLeft, CalendarRange, Flame } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import type { ParticipantType } from "@/interface/paticipant";
import {
  collection,
  doc,
  DocumentReference,
  getDocs,
  increment,
  limit,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import firestore from "@/services/firebase/firestore";
import { useFirestoreGetList } from "@/utils/firestore";
import type { RoomType } from "@/interface/room";

export function Component() {
  const [code, setCode] = useState(Array(9).fill(""));
  const [fullCodeVerify, setFullCodeVerify] = useState<undefined | string>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectTime, setSelectTime] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<RoomType | null>(
    null
  );
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const { SignIn, loadingUserAuth } = useAuth();
  const navigate = useNavigate();

  const { data: room } = useFirestoreGetList<RoomType>("room", {
    orderBy: { field: "name", direction: "asc" },
  });

  const groupedSlots = room
    .filter((f) => f.limit > f.participants && f.active)
    .reduce((acc: any, slot: any) => {
      if (!acc[slot.fullDay]) {
        acc[slot.fullDay] = [];
      }
      acc[slot.fullDay].push(slot);
      return acc;
    }, {});

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

  const handleTimeSlotSelect = async () => {
    setLoading(true);
    console.log("Horário selecionado:", selectedTimeSlot);

    try {
      if (!fullCodeVerify || !selectedTimeSlot) {
        toast.error(
          "Ocorreu uma falha, tente novamente em instantes ou procure um de nossos voluntários."
        );
        setLoading(false);
        return;
      }
      const data: Partial<ParticipantType> = {
        room: {
          id: selectedTimeSlot.id,
          date: selectedTimeSlot.date,
          hour: selectedTimeSlot.hour,
          interval: selectedTimeSlot.interval,
          createdAt: new Date(),
        },
      };

      const docRef = doc(
        firestore,
        "participant",
        fullCodeVerify
      ) as DocumentReference;
      await setDoc(docRef, data, { merge: true });
      const docRefRoom = doc(
        firestore,
        "room",
        selectedTimeSlot.id
      ) as DocumentReference;
      await updateDoc(docRefRoom, { participants: increment(1) });
      const response = await SignIn({ registrationCode: fullCodeVerify });

      if (response) {
        setLoading(false);
        return await navigate("/horario");
      }
      setLoading(false);
      toast.error("Código incorreto, tente novamente.");
    } catch (error) {
      setLoading(false);
      console.error(error);
      toast.error(
        "Ocorreu uma falha, tente novamente em instantes ou procure um de nossos voluntários."
      );
    }
  };

  const handlePaste = (
    e: React.ClipboardEvent<HTMLInputElement>,
    index: number
  ) => {
    e.preventDefault();
    const pastedText = e.clipboardData
      .getData("text")
      .replace(/[^A-Za-z0-9]/g, "")
      .toUpperCase();

    if (pastedText.length > 0) {
      const chars = pastedText.slice(0, 9 - index).split("");
      const newCode = [...code];
      chars.forEach((char, i) => {
        if (index + i < 9) {
          newCode[index + i] = char;
        }
      });
      setCode(newCode);
      setError("");

      const nextIndex = Math.min(index + chars.length, 8);
      setTimeout(() => {
        inputRefs.current[nextIndex]?.focus();
      }, 0);
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

  const handleFocus = (index: number) => {
    const el = inputRefs.current[index];
    if (!el) return;

    // Scroll the input into view smoothly and then ensure it has focus.
    // Using block: 'center' to center the element in the viewport similar to keyboard-driven focus.
    try {
      el.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "start",
      });
    } catch {
      // fallback for older browsers
      el.scrollIntoView();
    }

    // Ensure the input is focused (click will normally focus it, but this guarantees programmatic calls behave the same)
    try {
      el.focus();
    } catch {
      /* ignore */
    }
  };

  const handleCodeSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();
    setError("");

    const fullCode = code.join("");

    if (fullCode.length < 8) {
      setError(
        "Por favor, insira um código de inscrição com no mínimo 8 caracteres."
      );
      setLoading(false);
      return;
    }

    const collectionRef = collection(firestore, "participant");
    const queryUser = query(
      collectionRef,
      where("registrationCode", "==", fullCode),
      limit(1)
    );
    const querySnapshot = await getDocs(queryUser);
    const participantData = querySnapshot?.docs[0]?.data() as
      | ParticipantType
      | undefined;

    if (!participantData) {
      setLoading(false);
      return toast.error("Código incorreto, tente novamente.");
    }

    if (participantData && !participantData?.room) {
      setSelectTime(true);
      setFullCodeVerify(fullCode);
      setLoading(false);
      return;
    }
    if (participantData && participantData?.room) {
      try {
        const response = await SignIn({ registrationCode: fullCode });
        if (response) {
          setLoading(false);
          return await navigate("/horario");
        }
        setLoading(false);
        toast.error("Código incorreto, tente novamente.");
      } catch (error) {
        setLoading(false);
        console.error(error);
        toast.error(
          "Ocorreu uma falha, tente novamente em instantes ou procure um de nossos voluntários."
        );
      }
    }
  };

  return (
    <div>
      <div className="relative z-10 container mx-auto">
        <div className="max-w-2xl mx-auto">
          <div className="text-center">
            <div className="max-w-2xl mx-auto mb-18">
              <Link to="/programacao">
                <div className="relative group cursor-pointer">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#E1FF2F] via-[#00FFFF] to-[#E1FF2F] rounded-2xl blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
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
                          Clique aqui e confira a programação do DIFLEN GLOBAL
                          2025
                        </p>
                      </div>
                    </div>
                    <ArrowLeft className="w-6 h-6 text-[#E1FF2F] rotate-180 shrink-0" />
                  </div>
                </div>
              </Link>
            </div>

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
                  SALA
                </span>
                <br />
                <span className="text-[#E1FF2F]">PROFÉTICA</span>
              </h1>

              <p className="text-xl md:text-2xl text-white/80 font-light text-pretty max-w-lg mx-auto">
                Digite o seu código de inscrição, que está no seu comprovante de
                inscrição, em seguida selecione um dos horários disponíveis para
                a Sala Profética.
              </p>
            </div>
          </div>

          {/* Formulário de entrada */}
          {selectTime ? (
            <Card className="shadow-2xl border-0 backdrop-blur-xl bg-white/5 overflow-hidden animate-scale-in">
              <div className="absolute inset-0 bg-gradient-to-br from-[#E1FF2F]/10 to-transparent" />

              <div className="relative">
                <CardHeader className="pb-8">
                  <CardTitle className="text-3xl md:text-4xl font-bold text-[#E1FF2F] mb-2">
                    Selecione seu Horário
                  </CardTitle>
                  <CardDescription className="text-lg text-white/70">
                    Escolha um dos horários disponíveis abaixo, de sua
                    preferência.
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-8">
                  {Object.entries(groupedSlots).map(
                    ([dayKey, slots]: [string, any]) => (
                      <div key={dayKey} className="space-y-4">
                        {/* Day header */}
                        <div className="px-2 md:px-4">
                          <h3 className="text-2xl md:text-3xl font-black text-[#E1FF2F] uppercase tracking-wider">
                            {dayKey}
                          </h3>
                          <div className="h-1 w-20 bg-gradient-to-r from-[#E1FF2F] to-transparent mt-2 rounded-full" />
                        </div>

                        {/* Time slots grid for this day */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 md:gap-3">
                          {slots.map((slot: RoomType) => (
                            <button
                              disabled={loading}
                              key={slot.id}
                              onClick={() => {
                                setSelectedTimeSlot(slot);
                                setError("");
                              }}
                              className="relative group/slot p-3 md:p-4 rounded-lg md:rounded-xl transition-all duration-300 transform hover:scale-[1.05] border-2 flex flex-col items-center justify-center gap-1"
                              style={{
                                backgroundColor:
                                  selectedTimeSlot?.id === slot.id
                                    ? "#E1FF2F"
                                    : "rgba(225, 255, 47, 0.1)",
                                borderColor:
                                  selectedTimeSlot?.id === slot.id
                                    ? "#E1FF2F"
                                    : "rgba(225, 255, 47, 0.3)",
                              }}
                            >
                              {/* Radio button indicator */}
                              <div
                                className="w-5 h-5 md:w-6 md:h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300"
                                style={{
                                  borderColor:
                                    selectedTimeSlot?.id === slot.id
                                      ? "#003280"
                                      : "rgba(225, 255, 47, 0.5)",
                                  backgroundColor:
                                    selectedTimeSlot?.id === slot.id
                                      ? "#003280"
                                      : "transparent",
                                }}
                              >
                                {selectedTimeSlot?.id === slot.id && (
                                  <div
                                    className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full"
                                    style={{ backgroundColor: "#E1FF2F" }}
                                  />
                                )}
                              </div>
                              <p
                                className="text-sm md:text-base font-black"
                                style={{
                                  color:
                                    selectedTimeSlot?.id === slot.id
                                      ? "#003280"
                                      : "#E1FF2F",
                                }}
                              >
                                {slot.interval}
                              </p>
                            </button>
                          ))}
                        </div>
                      </div>
                    )
                  )}

                  {error && (
                    <div className="flex items-center justify-center gap-2 text-base bg-red-500/10 border border-red-500/20 rounded-lg p-3 backdrop-blur-sm animate-shake">
                      <AlertCircle className="h-5 w-5 text-red-400" />
                      <span className="text-red-400 font-medium">{error}</span>
                    </div>
                  )}

                  <div className="flex-col-reverse flex md:flex-row gap-5 pt-4">
                    <Button
                      disabled={loading}
                      onClick={() => setSelectTime(false)}
                      className="flex-1 p-4 h-14 text-md font-black rounded-2xl"
                      style={{
                        background: "rgba(225, 255, 47, 0.1)",
                        color: "#E1FF2F",
                        border: "2px solid rgba(225, 255, 47, 0.3)",
                      }}
                    >
                      <ArrowLeft className="w-5 h-5 mr-2" />
                      Voltar
                    </Button>
                    <Button
                      onClick={handleTimeSlotSelect}
                      className="flex-1 p-4 h-14 text-lg font-black rounded-2xl relative overflow-hidden group/btn"
                      style={{
                        background:
                          "linear-gradient(135deg, #E1FF2F 0%, #B8FF00 100%)",
                        color: "#003280",
                        border: "none",
                        boxShadow: "0 10px 40px rgba(225, 255, 47, 0.3)",
                      }}
                      disabled={!selectedTimeSlot || loading}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-1000" />
                      <span className="text-[16px] relative z-10 flex items-center justify-center gap-2">
                        {loading || loadingUserAuth ? (
                          <>
                            <div className="w-4 h-4 border-3 border-[#003280] border-t-transparent rounded-full animate-spin" />
                            Confirmando
                          </>
                        ) : (
                          <>
                            <Flame className="w-5 h-5" />
                            Confirmar
                          </>
                        )}
                      </span>
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          ) : (
            <Card className="shadow-2xl border-0 backdrop-blur-xl bg-white/5 overflow-hidden group hover:bg-white/10 transition-all duration-500">
              {/* Borda animada */}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#E1FF2F] via-[#00FFFF] to-[#E1FF2F] opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />

              <div className="relative">
                <CardHeader className="space-y-1 pb-6">
                  <CardTitle className=" text-2xl sm:text-3xl md:text-4xl font-bold text-[#E1FF2F]">
                    Código de Inscrição
                  </CardTitle>
                  <CardDescription className="text-md sm:text-lg text-white">
                    Digite o seu código de inscrição que está no seu
                    comprovante.
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <form onSubmit={handleCodeSubmit} className="space-y-8">
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
                            onFocus={() => handleFocus(index)}
                            onPaste={(e) => handlePaste(e, index)}
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
                            disabled={loadingUserAuth || loading}
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
                            onFocus={() => handleFocus(index)}
                            onPaste={(e) => handlePaste(e, index)}
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
                            disabled={loadingUserAuth || loading}
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
                            onFocus={() => handleFocus(index)}
                            onPaste={(e) => handlePaste(e, index)}
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
                            disabled={loadingUserAuth || loading}
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
                      className="w-full h-14 sm:h-16 text-lg sm:text-xl font-black rounded-2xl relative overflow-hidden group/btn transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{
                        background:
                          "linear-gradient(135deg, #E1FF2F 0%, #B8FF00 100%)",
                        color: "#003280",
                        border: "none",
                        boxShadow: "0 10px 40px rgba(225, 255, 47, 0.3)",
                      }}
                      disabled={
                        loadingUserAuth || loading || code.join("").length < 8
                      }
                    >
                      {/* Efeito de brilho ao hover */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-1000" />

                      <span className=" text-md relative z-10 flex items-center justify-center gap-2">
                        {loadingUserAuth || loading ? (
                          <>
                            <div className="w-4 h-4 border-3 border-[#003280] border-t-transparent rounded-full animate-spin" />
                            Consultando
                          </>
                        ) : (
                          <>
                            <Flame className="w-6 h-6" />
                            Escolher Horário
                          </>
                        )}
                      </span>
                    </Button>
                  </form>
                </CardContent>
              </div>
            </Card>
          )}

          <div className="text-center mt-6 space-y-2">
            <p className="text-white/60 text-sm font-medium">
              Dúvidas? Procure a Sala Profética
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
