export const formatStyleTime = (hora: string) => {
  // Verifica se a hora começa com "00:"
  if (hora.startsWith("00:")) {
    // Remove o "00:" e retorna o restante
    return hora.slice(3);
  }
  return hora;
};

export const formatTime = (time: number) => {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}:${String(seconds).padStart(2, "0")}`;
};

export const getUserInitials = (name: string | null): string => {
  if (!name) return "";
  const parts = name.trim().split(" ");
  if (parts.length === 1) {
    return parts[0][0].toUpperCase();
  }
  return `${parts[0][0].toUpperCase()}${parts[
    parts.length - 1
  ][0].toUpperCase()}`;
};
