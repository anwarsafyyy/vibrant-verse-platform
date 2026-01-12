import { useState, useEffect, useRef, useCallback } from 'react';
import { db } from '@/lib/firebase';
import { 
  collection, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit,
  QueryConstraint
} from 'firebase/firestore';

interface UseLazyFirebaseOptions<T> {
  collectionName: string;
  constraints?: QueryConstraint[];
  enabled?: boolean; // Whether to fetch immediately or wait for visibility
  rootMargin?: string; // Intersection Observer root margin
  threshold?: number; // Intersection Observer threshold
}

interface UseLazyFirebaseResult<T> {
  data: T[];
  loading: boolean;
  error: Error | null;
  isVisible: boolean;
  ref: React.RefObject<HTMLElement>;
  refetch: () => Promise<void>;
}

export function useLazyFirebase<T extends { id?: string }>({
  collectionName,
  constraints = [],
  enabled = true,
  rootMargin = '100px', // Start loading 100px before element comes into view
  threshold = 0.1,
}: UseLazyFirebaseOptions<T>): UseLazyFirebaseResult<T> {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);
  const ref = useRef<HTMLElement>(null);

  const fetchData = useCallback(async () => {
    if (hasFetched) return; // Don't refetch if already fetched
    
    setLoading(true);
    setError(null);
    
    try {
      const q = query(collection(db, collectionName), ...constraints);
      const snapshot = await getDocs(q);
      const items: T[] = [];
      
      snapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() } as T);
      });
      
      setData(items);
      setHasFetched(true);
    } catch (err) {
      console.error(`Error fetching ${collectionName}:`, err);
      setError(err instanceof Error ? err : new Error('Failed to fetch data'));
    } finally {
      setLoading(false);
    }
  }, [collectionName, constraints, hasFetched]);

  // Set up Intersection Observer
  useEffect(() => {
    if (!enabled) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { rootMargin, threshold }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [enabled, rootMargin, threshold]);

  // Fetch data when visible
  useEffect(() => {
    if (isVisible && enabled && !hasFetched) {
      fetchData();
    }
  }, [isVisible, enabled, hasFetched, fetchData]);

  const refetch = useCallback(async () => {
    setHasFetched(false);
    await fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    isVisible,
    ref: ref as React.RefObject<HTMLElement>,
    refetch,
  };
}

// Hook for single document lazy loading
interface UseLazySingleDocOptions {
  collectionName: string;
  constraints?: QueryConstraint[];
  enabled?: boolean;
  rootMargin?: string;
  threshold?: number;
}

export function useLazySingleDoc<T extends { id?: string }>({
  collectionName,
  constraints = [],
  enabled = true,
  rootMargin = '100px',
  threshold = 0.1,
}: UseLazySingleDocOptions) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);
  const ref = useRef<HTMLElement>(null);

  const fetchData = useCallback(async () => {
    if (hasFetched) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const q = query(collection(db, collectionName), ...constraints, limit(1));
      const snapshot = await getDocs(q);
      
      if (!snapshot.empty) {
        const doc = snapshot.docs[0];
        setData({ id: doc.id, ...doc.data() } as T);
      }
      setHasFetched(true);
    } catch (err) {
      console.error(`Error fetching ${collectionName}:`, err);
      setError(err instanceof Error ? err : new Error('Failed to fetch data'));
    } finally {
      setLoading(false);
    }
  }, [collectionName, constraints, hasFetched]);

  useEffect(() => {
    if (!enabled) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { rootMargin, threshold }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [enabled, rootMargin, threshold]);

  useEffect(() => {
    if (isVisible && enabled && !hasFetched) {
      fetchData();
    }
  }, [isVisible, enabled, hasFetched, fetchData]);

  return {
    data,
    loading,
    error,
    isVisible,
    ref: ref as React.RefObject<HTMLElement>,
  };
}
