import { Timestamp } from "firebase/firestore";

export type UserType = {
  id: string;
  uid: string;
  adminGroupId: boolean;
  name: string;
  email: string;
  groupId: string | null;
  createdAt: Timestamp;
  updatedAt: Timestamp | null;
};
