import { Timestamp } from "firebase/firestore";

export type ParticipantType = {
  name: string;
  registrationCode: string;
  room: {
    date: Timestamp;
    id: string;
  };
};
