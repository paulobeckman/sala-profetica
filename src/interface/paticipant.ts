import type { Timestamp } from "firebase/firestore";

export type ParticipantType = {
  name: string;
  registrationCode: string;
  createdAt: Timestamp;
  room?: {
    id: string;
    date: string;
    hour: string;
    interval: string;
  } | null;
};
