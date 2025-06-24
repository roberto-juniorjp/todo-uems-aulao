import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  Timestamp,
} from "firebase/firestore";
import { db } from "./firebase-config";
import type { Todo } from "../../core/types/todo";

const TODOS_COLLECTION = "todos";

export const getTodos = async (): Promise<Todo[]> => {
  const snapshot = await getDocs(collection(db, TODOS_COLLECTION));
  return snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...(docSnap.data() as Omit<Todo, "id">),
  }));
};

export const addTodo = async (title: string) => {
  return await addDoc(collection(db, TODOS_COLLECTION), {
    title,
    createdAt: Timestamp.now(),
  });
};

export const deleteTodo = async (id: string) => {
  return await deleteDoc(doc(db, TODOS_COLLECTION, id));
};
