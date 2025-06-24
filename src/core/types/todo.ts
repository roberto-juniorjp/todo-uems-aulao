import { Timestamp } from "firebase/firestore";

export interface Todo {
  id: string;
  title: string;
  createdAt: Timestamp;
}