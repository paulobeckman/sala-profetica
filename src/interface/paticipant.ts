import type { Timestamp } from "firebase/firestore";

export type ParticipantType = {
  name: string;
  registrationCode: string;
  room?: {
    id: string;
    date: string;
    hour: string;
    interval: string;
    createdAt: Timestamp | Date;
  } | null;
};
