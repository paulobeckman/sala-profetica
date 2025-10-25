import { Timestamp } from "firebase/firestore";

export function convertDate(date: Date | Timestamp) {
  if (date instanceof Date) {
    return date.toLocaleDateString("pt-BR");
  }
  return date.toDate().toLocaleDateString("pt-BR");
}
