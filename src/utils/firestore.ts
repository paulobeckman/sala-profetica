import { useState, useEffect } from "react";
import {
  onSnapshot,
  doc,
  collection,
  where,
  orderBy,
  query,
  addDoc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import type {
  QueryConstraint,
  WhereFilterOp,
  DocumentData,
  WithFieldValue,
  DocumentReference,
} from "firebase/firestore";
import firestore from "@/services/firebase/firestore";

interface UseFirebaseOptions {
  orderBy?: { field: string; direction: "asc" | "desc" };
  where?: {
    field: string;
    operator: WhereFilterOp;
    value: unknown;
  }[];
}

function useFirestoreGetDocument<T>(path: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const docRef = doc(firestore, path);

    const unsubscribe = onSnapshot(
      docRef,
      { includeMetadataChanges: true },
      (docSnapshot) => {
        if (docSnapshot.exists()) {
          setData({ id: docSnapshot.id, ...docSnapshot.data() } as T);
        } else {
          setData(null);
        }
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [path]);

  return { data, loading };
}

function useFirestoreGetList<T>(path: string, options?: UseFirebaseOptions) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const collectionRef = collection(firestore, path);

    // Construir a consulta com base nas opções
    const queryConstraints: QueryConstraint[] = [];

    if (options?.where) {
      options.where.forEach((filter) => {
        queryConstraints.push(
          where(filter.field, filter.operator, filter.value)
        );
      });
    }

    if (options?.orderBy) {
      queryConstraints.push(
        orderBy(options.orderBy.field, options.orderBy.direction)
      );
    }

    const q = query(collectionRef, ...queryConstraints);

    const unsubscribe = onSnapshot(
      q,
      { includeMetadataChanges: true },
      (snapshot) => {
        const documents = snapshot.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() } as T)
        );
        setData(documents);
        setLoading(false);
      }
    );

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);

  return { data, loading };
}

async function createDocument<T extends DocumentData>(
  collectionPath: string,
  data: WithFieldValue<T>
): Promise<string> {
  const collectionRef = collection(firestore, collectionPath);
  const docRef = await addDoc(collectionRef, data);
  return docRef.id;
}

async function updateDocument<T extends DocumentData>(
  collectionPath: string,
  docId: string,
  data: WithFieldValue<T>
): Promise<void> {
  const docRef = doc(firestore, collectionPath, docId) as DocumentReference<T>;
  await setDoc(docRef, data, { merge: true });
}

async function deleteDocument(
  collectionPath: string,
  docId: string
): Promise<void> {
  const docRef = doc(firestore, collectionPath, docId);
  await deleteDoc(docRef);
}

export {
  useFirestoreGetDocument,
  useFirestoreGetList,
  createDocument,
  updateDocument,
  deleteDocument,
};
