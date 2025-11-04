import { db, storage, auth } from './firebase';
import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject
} from 'firebase/storage';

// Storage helpers
export const uploadFile = async (path: string, file: File): Promise<string> => {
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return url;
};

export const deleteFile = async (path: string): Promise<void> => {
  const storageRef = ref(storage, path);
  await deleteObject(storageRef);
};

// Auth helpers
export const getCurrentUser = async () => {
  return auth.currentUser;
};

// Generic Firestore helpers
export const getCollection = async <T = any>(
  collectionName: string,
  filters?: { field: string; operator: any; value: any }[],
  orderByField?: string,
  orderDirection: 'asc' | 'desc' = 'asc',
  limitCount?: number
): Promise<T[]> => {
  let q = query(collection(db, collectionName));

  if (filters) {
    filters.forEach(filter => {
      q = query(q, where(filter.field, filter.operator, filter.value));
    });
  }

  if (orderByField) {
    q = query(q, orderBy(orderByField, orderDirection));
  }

  if (limitCount) {
    q = query(q, limit(limitCount));
  }

  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as T));
};

export const getDocument = async <T = any>(
  collectionName: string,
  docId: string
): Promise<T | null> => {
  const docRef = doc(db, collectionName, docId);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as T;
  }
  return null;
};

export const addDocument = async <T = any>(
  collectionName: string,
  data: Partial<T>
): Promise<string> => {
  const docData = {
    ...data,
    created_at: serverTimestamp()
  };
  const docRef = await addDoc(collection(db, collectionName), docData);
  return docRef.id;
};

export const updateDocument = async <T = any>(
  collectionName: string,
  docId: string,
  data: Partial<T>
): Promise<void> => {
  const docRef = doc(db, collectionName, docId);
  await updateDoc(docRef, data as any);
};

export const deleteDocument = async (
  collectionName: string,
  docId: string
): Promise<void> => {
  const docRef = doc(db, collectionName, docId);
  await deleteDoc(docRef);
};

// Count helper
export const getCount = async (
  collectionName: string,
  filters?: { field: string; operator: any; value: any }[]
): Promise<number> => {
  const items = await getCollection(collectionName, filters);
  return items.length;
};
