"use client";

import { useRef } from 'react';
import emptyFunc from '@/util/emptyFunc';

const useLocalStorageRequest = (key, value) => {
  if (typeof window === "undefined") return [emptyFunc, emptyFunc];

  let dataRef = useRef(value);
  const saved = JSON.parse(localStorage.getItem(key));

  if (saved) {
    dataRef.current = saved;
    
  } else {
    localStorage.setItem(key, JSON.stringify(value));
  }

  const updater = (func) => {
    const updated = func(dataRef.current);

    localStorage.setItem(key, JSON.stringify(updated));
    dataRef.current = updated;
  }

  const getter = (domain) => {
    if (domain) {
      return dataRef.current[domain] || [];
    } else {
      return dataRef.current;
    }
  }

  return [getter, updater];
}

export default useLocalStorageRequest;