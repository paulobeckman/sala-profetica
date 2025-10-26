import { Calendar, Clock, CheckCircle2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function Component() {
  // const formatDate = (date: Date) => {
  //   return new Intl.DateTimeFormat("pt-BR", {
  //     weekday: "long",
  //     year: "numeric",
  //     month: "long",
  //     day: "numeric",
  //   }).format(date);
  // };

  // const formatTime = (date: Date) => {
  //   return new Intl.DateTimeFormat("pt-BR", {
  //     hour: "2-digit",
  //     minute: "2-digit",
  //   }).format(date);
  // };

  return (
    <div>
      /* Card de resultado com animação de entrada */
      <Card className="shadow-2xl border-0 backdrop-blur-xl bg-white/5 overflow-hidden animate-scale-in">
        <div className="absolute inset-0 bg-linear-to-br from-[#E1FF2F]/10 to-transparent" />

        <div className="relative">
          <CardHeader className="text-center pb-6">
            {/* Ícone de sucesso animado */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-[#E1FF2F] rounded-full blur-2xl opacity-50 animate-pulse" />
                <div
                  className="relative h-24 w-24 rounded-full flex items-center justify-center animate-bounce-in"
                  style={{ backgroundColor: "#E1FF2F" }}
                >
                  <CheckCircle2
                    className="h-12 w-12"
                    style={{ color: "#003280" }}
                    strokeWidth={3}
                  />
                </div>
              </div>
            </div>

            <CardTitle
              className="text-4xl md:text-5xl font-black text-balance mb-3"
              style={{ color: "#E1FF2F" }}
            >
              Confirmado!
            </CardTitle>
            <CardDescription
              className="text-lg"
              style={{ color: "#FFFFFF", opacity: 0.8 }}
            >
              Código:{" "}
              <span className="font-mono font-bold text-[#E1FF2F]">code</span>
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4 pb-8">
            {/* Data */}
            <div className="relative group/card">
              <div className="absolute inset-0 bg-linear-to-r from-[#E1FF2F] to-[#B8FF00] rounded-2xl blur-lg opacity-0 group-hover/card:opacity-30 transition-opacity duration-300" />
              <div
                className="relative flex items-center gap-5 p-6 rounded-2xl backdrop-blur-sm transition-all duration-300 transform group-hover/card:scale-[1.02]"
                style={{ backgroundColor: "#E1FF2F" }}
              >
                <div
                  className="h-16 w-16 rounded-2xl flex items-center justify-center shrink-0 shadow-lg"
                  style={{ backgroundColor: "#003280" }}
                >
                  <Calendar
                    className="h-8 w-8"
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
                    data
                    {/* {formatDate(appointment.date)} */}
                  </p>
                </div>
              </div>
            </div>

            {/* Horário */}
            <div className="relative group/card">
              <div className="absolute inset-0 bg-linear-to-r from-[#E1FF2F] to-[#B8FF00] rounded-2xl blur-lg opacity-0 group-hover/card:opacity-30 transition-opacity duration-300" />
              <div
                className="relative flex items-center gap-5 p-6 rounded-2xl backdrop-blur-sm transition-all duration-300 transform group-hover/card:scale-[1.02]"
                style={{ backgroundColor: "#E1FF2F" }}
              >
                <div
                  className="h-16 w-16 rounded-2xl flex items-center justify-center shrink-0 shadow-lg"
                  style={{ backgroundColor: "#003280" }}
                >
                  <Clock
                    className="h-8 w-8"
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
                    hora
                    {/* {formatTime(appointment.date)} */}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}

Component.displayName = "ScheduledTime";
